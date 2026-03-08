import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { auth, db } from './config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

const StudentAuth = lazy(() => import('./pages/StudentAuth'))
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'))
const RecordingClasses = lazy(() => import('./pages/RecordingClasses'))
const WatchRecording = lazy(() => import('./pages/WatchRecording'))
const LiveClasses = lazy(() => import('./pages/LiveClasses'))
const AccountDetails = lazy(() => import('./pages/AccountDetails'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

import { Container, Button, Navbar } from 'react-bootstrap'
import PageLoader from './components/PageLoader'

import { LogOut } from 'lucide-react'
import './App.css'



function App() {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let unsubscribeSession = null;

        // Check if there was a previous session to avoid flash of login page
        const persistedLoggedIn = localStorage.getItem('scmathscore_logged_in') === 'true';
        if (persistedLoggedIn) {
            setLoading(true);
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                localStorage.setItem('scmathscore_logged_in', 'true');

                // Try fetching from 'students'
                let docRef = doc(db, 'students', currentUser.uid)
                let docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const studentData = docSnap.data();
                    setUserData({ ...studentData, role: 'student' })

                    // Multi-Device Restriction: Listen for session changes
                    if (unsubscribeSession) unsubscribeSession();
                    unsubscribeSession = onSnapshot(docRef, (snapshot) => {
                        if (snapshot.exists()) {
                            const currentData = snapshot.data();
                            const localSessionId = localStorage.getItem('scmathscore_session_id');

                            // If there's a sessionId in DB and it doesn't match local one
                            if (currentData.sessionId && localSessionId && currentData.sessionId !== localSessionId) {
                                alert("Your account has been logged in from another device. You will be logged out.");
                                signOut(auth);
                                localStorage.removeItem('scmathscore_session_id');
                                localStorage.removeItem('scmathscore_logged_in');
                            }
                        }
                    });
                } else {
                    // Try fetching from 'admins'
                    docRef = doc(db, 'admins', currentUser.uid)
                    docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        setUserData({ ...data, role: data.role || 'admin' })
                    } else {
                        // User exists in Auth but not in any collection
                        setUserData(null)
                    }
                }
            } else {
                setUser(null)
                setUserData(null)
                localStorage.removeItem('scmathscore_logged_in');
                if (unsubscribeSession) {
                    unsubscribeSession();
                    unsubscribeSession = null;
                }
            }
            setLoading(false)
        })

        return () => {
            unsubscribe();
            if (unsubscribeSession) unsubscribeSession();
        }
    }, [])

    if (loading) {
        return <PageLoader />
    }

    return (
        <Router>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Student Portal */}
                    <Route
                        path="/"
                        element={<StudentDashboard user={user} userData={userData} />}
                    />
                    <Route
                        path="/login"
                        element={<StudentAuth initialMode="login" />}
                    />
                    <Route
                        path="/signup"
                        element={<StudentAuth initialMode="signup" />}
                    />
                    <Route
                        path="/recordings"
                        element={user ? <RecordingClasses user={user} userData={userData} /> : <StudentAuth />}
                    />
                    <Route
                        path="/recordings/watch"
                        element={user ? <WatchRecording /> : <StudentAuth />}
                    />
                    <Route
                        path="/live-classes"
                        element={user ? <LiveClasses user={user} userData={userData} /> : <StudentAuth />}
                    />
                    <Route
                        path="/account"
                        element={user ? <AccountDetails user={user} userData={userData} /> : <StudentAuth />}
                    />

                    {/* Admin Portal */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={user && userData?.role !== 'student' ? <AdminDashboard user={user} userData={userData} /> : <Navigate to="/admin" />}
                    />

                    {/* Fallback */}
                    <Route path="*" element={<div className="p-5 text-center"><h1>404</h1><p>Page Not Found</p><a href="/">Back to Home</a></div>} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App
