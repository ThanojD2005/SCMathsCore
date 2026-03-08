import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { User, ChevronLeft, Video, Calendar, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const RecordingClasses = ({ user, userData }) => {
    const navigate = useNavigate();
    const [recordings, setRecordings] = useState({});
    const [loading, setLoading] = useState(true);
    const studentName = userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() : 'Student Name';

    useEffect(() => {
        if (!user?.uid || !userData?.alYear || userData?.status !== 'verified') {
            setLoading(false);
            return;
        }

        // Fetch student enrollments
        const qEnroll = query(
            collection(db, 'enrollment'),
            where('studentId', '==', user.uid)
        );

        const unsubscribeEnroll = onSnapshot(qEnroll, (snapshot) => {
            const enrolledMonths = snapshot.docs.map(doc => doc.data().enrolledMonth);

            const qRecordings = query(
                collection(db, 'recordClasses'),
                where('status', '==', 'active'),
                where('alYear', '==', userData.alYear)
            );

            const unsubscribeRecordings = onSnapshot(qRecordings, (recSnapshot) => {
                const fetchedRecordings = recSnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    .filter(rec => {
                        const dateStr = rec.classDate || rec.createdAt;
                        if (!dateStr) return false;
                        const classMonth = dateStr.substring(0, 7); // "YYYY-MM"
                        return enrolledMonths.includes(classMonth);
                    })
                    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

                // Group by Month Year
                const grouped = fetchedRecordings.reduce((acc, rec) => {
                    const date = new Date(rec.classDate);
                    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                    if (!acc[monthYear]) acc[monthYear] = [];
                    acc[monthYear].push(rec);
                    return acc;
                }, {});

                setRecordings(grouped);
                setLoading(false);
            }, (error) => {
                console.error("Error fetching recording classes:", error);
                setLoading(false);
            });

            return () => unsubscribeRecordings();
        });

        return () => unsubscribeEnroll();
    }, [user?.uid, userData?.alYear]);

    const handleWatchClick = (rec) => {
        if (!rec.videoLink) return;
        navigate('/recordings/watch', { state: { video: rec } });
    };

    if (loading) {
        return <PageLoader />;
    }

    return (
        <Container fluid className="p-0" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header className="dashboard-header mb-5">
                <div className="d-flex align-items-center gap-3">
                    <Button
                        variant="link"
                        className="p-0 text-white opacity-75"
                        onClick={() => navigate('/')}
                    >
                        <ChevronLeft size={24} />
                    </Button>
                    <h1
                        className="m-0 fw-bold"
                        style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        SCMathsCore
                    </h1>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-secondary small fw-medium d-none d-sm-block">{studentName}</span>
                    <div className="user-profile-circle">
                        <User size={18} />
                    </div>
                </div>
            </header>

            <Container className="px-4">
                <div className="mb-5">
                    <h2 className="fw-bold mb-2 text-white" style={{ fontSize: '2rem' }}>Recorded Library</h2>
                    <p className="text-secondary">Browse and watch your previous class recordings.</p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" size="sm" />
                        <p className="mt-3 text-secondary small">Accessing recordings...</p>
                    </div>
                ) : Object.keys(recordings).length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-secondary fw-normal">No recordings available for your enrolled sessions.</h5>
                    </div>
                ) : (
                    Object.keys(recordings).map((month) => (
                        <div key={month} className="mb-5">
                            <div className="group-header">
                                <h3 className="group-title">{month}</h3>
                                <span className="badge bg-secondary-subtle text-secondary px-2 py-1" style={{ fontSize: '0.7rem' }}>{recordings[month].length} Sessions</span>
                            </div>
                            <Row className="g-4">
                                {recordings[month].map((rec) => (
                                    <Col md={4} key={rec.id}>
                                        <div className="class-card">
                                            <div>
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <span className="badge bg-success-subtle text-success px-2 py-1" style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase' }}>Available</span>
                                                </div>
                                                <h3 className="h6 mb-2">{rec.name}</h3>
                                                <div className="text-secondary small d-flex flex-column gap-1 mb-4">
                                                    <span className="d-flex align-items-center gap-2">
                                                        <Calendar size={13} /> {rec.classDate ? new Date(rec.classDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'No Date'}
                                                    </span>
                                                    <span className="opacity-75">Instructor: {rec.teacherName}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    className="btn-minimal btn-minimal-outline border-1 w-100 justify-content-center"
                                                    onClick={() => handleWatchClick(rec)}
                                                >
                                                    <PlayCircle size={16} /> Watch Session
                                                </button>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))
                )}
            </Container>
            <Footer />
        </Container>
    );
};

export default RecordingClasses;
