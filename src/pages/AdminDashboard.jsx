import { useState, lazy, Suspense } from 'react'
import { Container, Row, Col, Card, Nav, Navbar, Offcanvas, Button, Badge } from 'react-bootstrap'
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Menu, ShieldCheck, GraduationCap, Briefcase, UserPlus, Image as ImageIcon } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect } from 'react'

const ManageAdmins = lazy(() => import('../components/ManageAdmins'))
const ManageStudents = lazy(() => import('../components/ManageStudents'))
const ManageClasses = lazy(() => import('../components/ManageClasses'))
const ManageSettings = lazy(() => import('../components/ManageSettings'))
const ManageEnrollments = lazy(() => import('../components/ManageEnrollments'))
const ManageBanners = lazy(() => import('../components/ManageBanners'))

const AdminDashboard = ({ user, userData }) => {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false)
    const [activeView, setActiveView] = useState('overview') // 'overview', 'admins', 'students', 'classes', 'enrollment', or 'settings'
    const [stats, setStats] = useState({ students: 0, activeClasses: 0 })
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch Students Count
        const unsubscribeStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
            setStats(prev => ({ ...prev, students: snapshot.size }))
        })

        // Fetch Active Live Classes
        const qLive = query(collection(db, 'liveClasses'), where('status', '==', 'active'))
        const unsubscribeLive = onSnapshot(qLive, (snapshot) => {
            setStats(prev => {
                const liveCount = snapshot.size
                // We'll calculate total active classes later by combining with recorded
                return { ...prev, liveCount }
            })
        })

        // Fetch Active Recorded Classes
        const qRecord = query(collection(db, 'recordClasses'), where('status', '==', 'active'))
        const unsubscribeRecord = onSnapshot(qRecord, (snapshot) => {
            setStats(prev => {
                const recordCount = snapshot.size
                return { ...prev, recordCount }
            })
        })

        return () => {
            unsubscribeStudents()
            unsubscribeLive()
            unsubscribeRecord()
        }
    }, [])

    const totalActiveClasses = (stats.liveCount || 0) + (stats.recordCount || 0)

    const handleLogout = async () => {
        await signOut(auth)
        navigate('/admin')
    }

    const roleData = {
        superadmin: { label: 'Super Admin', icon: <ShieldCheck size={20} className="text-warning" />, color: 'warning' },
        super_admin: { label: 'Super Admin', icon: <ShieldCheck size={20} className="text-warning" />, color: 'warning' },
        teacher: { label: 'Teacher', icon: <GraduationCap size={20} className="text-info" />, color: 'info' },
        instructor: { label: 'Instructor', icon: <Briefcase size={20} className="text-success" />, color: 'success' }
    }

    const currentRole = roleData[userData?.role] || { label: 'Admin', icon: <Users size={20} />, color: 'secondary' }

    // Helper to check for super admin privileges
    // Helper to check for super admin privileges
    const isSuperAdmin = userData?.role?.toLowerCase().includes('admin') || false

    const SidebarContent = () => (
        <>
            <div className="p-4 border-bottom border-secondary mb-4">
                <h4
                    className="text-white fw-bold mb-1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    SCMathsCore
                </h4>
                <div className="d-flex align-items-center gap-2 mt-2">
                    {currentRole.icon}
                    <small className="text-secondary fw-semibold text-uppercase">{currentRole.label}</small>
                </div>
            </div>
            <Nav className="flex-column px-3">
                <Nav.Link
                    onClick={() => { setActiveView('overview'); setShowMobileSidebar(false); }}
                    className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'overview' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                    style={{ cursor: 'pointer' }}
                >
                    <LayoutDashboard size={20} /> Dashboard
                </Nav.Link>

                {(userData?.role?.includes('admin') || userData?.role === 'teacher') && (
                    <Nav.Link
                        onClick={() => { setActiveView('students'); setShowMobileSidebar(false); }}
                        className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'students' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                        style={{ cursor: 'pointer' }}
                    >
                        <Users size={20} /> Students
                    </Nav.Link>
                )}

                <Nav.Link
                    onClick={() => { setActiveView('enrollment'); setShowMobileSidebar(false); }}
                    className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'enrollment' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                    style={{ cursor: 'pointer' }}
                >
                    <UserPlus size={20} /> Enrollment
                </Nav.Link>

                <Nav.Link
                    onClick={() => { setActiveView('classes'); setShowMobileSidebar(false); }}
                    className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'classes' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                    style={{ cursor: 'pointer' }}
                >
                    <BookOpen size={20} /> Classes
                </Nav.Link>

                {isSuperAdmin && (
                    <Nav.Link
                        onClick={() => { setActiveView('banners'); setShowMobileSidebar(false); }}
                        className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'banners' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                        style={{ cursor: 'pointer' }}
                    >
                        <ImageIcon size={20} /> Manage Banners
                    </Nav.Link>
                )}

                {isSuperAdmin && (
                    <Nav.Link
                        onClick={() => { setActiveView('admins'); setShowMobileSidebar(false); }}
                        className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'admins' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                        style={{ cursor: 'pointer' }}
                    >
                        <ShieldCheck size={20} /> Manage Staff
                    </Nav.Link>
                )}

                {userData?.role?.includes('admin') && (
                    <Nav.Link
                        onClick={() => { setActiveView('settings'); setShowMobileSidebar(false); }}
                        className={`mb-2 p-3 rounded d-flex align-items-center gap-3 border-0 text-start w-100 ${activeView === 'settings' ? 'bg-primary text-white' : 'text-secondary bg-transparent'}`}
                        style={{ cursor: 'pointer' }}
                    >
                        <Settings size={20} /> Settings
                    </Nav.Link>
                )}

                <hr className="bg-secondary" style={{ opacity: 0.2 }} />

                <Nav.Link
                    onClick={handleLogout}
                    className="text-danger p-3 rounded d-flex align-items-center gap-3 border-0 bg-transparent text-start w-100"
                    style={{ cursor: 'pointer' }}
                >
                    <LogOut size={20} /> Logout
                </Nav.Link>
            </Nav>
        </>
    )

    return (
        <div className="min-vh-100 bg-light d-flex">
            {/* Desktop Sidebar */}
            <div className="d-none d-lg-block bg-dark border-end" style={{ width: '280px', minHeight: '100vh', position: 'sticky', top: 0 }}>
                <SidebarContent />
            </div>

            {/* Mobile Sidebar (Offcanvas) */}
            <Offcanvas
                show={showMobileSidebar}
                onHide={() => setShowMobileSidebar(false)}
                className="bg-dark text-white"
                style={{ width: '280px' }}
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <SidebarContent />
                </Offcanvas.Body>
            </Offcanvas>

            {/* Main Content */}
            <div className="flex-grow-1 min-vw-0 overflow-auto">
                <Navbar bg="white" className="shadow-sm px-3 px-md-4 py-3 sticky-top">
                    <div className="w-100 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <Button
                                variant="link"
                                className="d-lg-none p-0 text-dark"
                                onClick={() => setShowMobileSidebar(true)}
                            >
                                <Menu size={24} />
                            </Button>
                            <h5 className="mb-0 fw-bold">
                                {activeView === 'overview' ? 'Overview' :
                                    activeView === 'admins' ? 'Manage Staff' :
                                        activeView === 'students' ? 'Manage Students' :
                                            activeView === 'classes' ? 'Manage Classes' :
                                                activeView === 'enrollment' ? 'Student Enrollment' : 'Settings'}
                            </h5>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <Badge bg={currentRole.color} className="py-2 px-3 rounded-pill text-uppercase">
                                {currentRole.label} {userData?.role && `(${userData.role})`}
                            </Badge>
                            <div className="d-none d-sm-block ms-2 text-end">
                                <div className="small fw-bold">{user.email}</div>
                            </div>
                        </div>
                    </div>
                </Navbar>

                <Container className="py-4">
                    {activeView === 'overview' ? (
                        <>
                            <Row className="g-4">
                                <Col xs={12} sm={6} md={4}>
                                    <Card className="border-0 shadow-sm p-3 h-100">
                                        <Card.Body>
                                            <h6 className="text-secondary small fw-bold text-uppercase">Total Students</h6>
                                            <h2 className="fw-bold mb-0 text-primary">{stats.students.toLocaleString()}</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {userData?.role?.includes('admin') && (
                                    <Col xs={12} sm={6} md={4}>
                                        <Card className="border-0 shadow-sm p-3 h-100">
                                            <Card.Body>
                                                <h6 className="text-secondary small fw-bold text-uppercase">Revenue (LKR)</h6>
                                                <h2 className="fw-bold mb-0 text-info">2.4M</h2>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                                <Col xs={12} sm={userData?.role?.includes('admin') ? 6 : 12} md={userData?.role?.includes('admin') ? 4 : 6}>
                                    <Card className="border-0 shadow-sm p-3 h-100">
                                        <Card.Body>
                                            <h6 className="text-secondary small fw-bold text-uppercase">Active Classes</h6>
                                            <h2 className="fw-bold mb-0 text-success">{totalActiveClasses}</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Card className="border-0 shadow-sm mt-4 p-4">
                                <h5 className="fw-bold mb-4">Role-Based Dashboard</h5>
                                <p className="text-secondary">
                                    Welcome, <strong>{user.email}</strong>. You are currently logged in as a <strong>{currentRole.label}</strong>.
                                    Your view is customized to show only the tools and data relevant to your role.
                                </p>
                            </Card>
                        </>
                    ) : (
                        <Suspense fallback={<div className="text-center py-5 text-secondary">Loading component...</div>}>
                            {activeView === 'admins' && isSuperAdmin ? (
                                <ManageAdmins />
                            ) : activeView === 'banners' && isSuperAdmin ? (
                                <ManageBanners />
                            ) : activeView === 'students' ? (
                                <ManageStudents />
                            ) : activeView === 'classes' ? (
                                <ManageClasses />
                            ) : activeView === 'enrollment' ? (
                                <ManageEnrollments />
                            ) : (
                                <ManageSettings />
                            )}
                        </Suspense>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default AdminDashboard
