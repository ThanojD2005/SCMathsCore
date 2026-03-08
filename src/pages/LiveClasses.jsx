import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { User, ChevronLeft, Radio, Calendar, Clock, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const LiveClasses = ({ user, userData }) => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState({});
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const studentName = userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() : 'Student Name';

    // --- DevTools & Right-Click Restrictions ---
    useEffect(() => {
        let warningTimeout;
        const triggerWarning = () => {
            setShowWarning(true);
            clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => setShowWarning(false), 3000);
        };

        const blockContext = (e) => {
            e.preventDefault();
            triggerWarning();
        };

        const blockKeys = (e) => {
            if (
                e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                (e.metaKey && e.altKey && e.keyCode === 73) ||
                (e.ctrlKey && e.keyCode === 85)
            ) {
                e.preventDefault();
                triggerWarning();
                return false;
            }
        };

        window.addEventListener('contextmenu', blockContext);
        window.addEventListener('keydown', blockKeys);

        return () => {
            window.removeEventListener('contextmenu', blockContext);
            window.removeEventListener('keydown', blockKeys);
            clearTimeout(warningTimeout);
        };
    }, []);
    // ------------------------------------------

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

            const qClasses = query(
                collection(db, 'liveClasses'),
                where('status', '==', 'active'),
                where('alYear', '==', userData.alYear)
            );

            const unsubscribeClasses = onSnapshot(qClasses, (classSnapshot) => {
                const fetchedClasses = classSnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    .filter(cls => {
                        const dateStr = cls.classDate || cls.createdAt;
                        if (!dateStr) return false;
                        const classMonth = dateStr.substring(0, 7); // "YYYY-MM"
                        return enrolledMonths.includes(classMonth);
                    })
                    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

                // Group by Month Year
                const grouped = fetchedClasses.reduce((acc, cls) => {
                    const date = new Date(cls.classDate);
                    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                    if (!acc[monthYear]) acc[monthYear] = [];
                    acc[monthYear].push(cls);
                    return acc;
                }, {});

                setClasses(grouped);
                setLoading(false);
            }, (error) => {
                console.error("Error fetching live classes:", error);
                setLoading(false);
            });

            return () => unsubscribeClasses();
        });

        return () => unsubscribeEnroll();
    }, [user?.uid, userData?.alYear]);

    if (loading) {
        return <PageLoader />;
    }

    return (
        <Container fluid className="p-0" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {/* Warning Message */}
            <div
                className={`position-fixed top-0 start-50 translate-middle-x mt-4 p-3 rounded-3 shadow-lg bg-danger text-white transition-all`}
                style={{
                    zIndex: 9999,
                    opacity: showWarning ? 1 : 0,
                    pointerEvents: 'none',
                    transform: `translate(-50%, ${showWarning ? '0' : '-20px'})`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: 'max-content',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <div style={{ backgroundColor: 'white', color: '#dc3545', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>!</div>
                Security Alert: This action is restricted for security purposes.
            </div>

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
                    <h2 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>Live Classrooms</h2>
                    <p className="text-secondary">Join ongoing and upcoming live sessions.</p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" size="sm" />
                        <p className="mt-3 text-secondary small">Syncing live sessions...</p>
                    </div>
                ) : Object.keys(classes).length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="text-secondary fw-normal">No active live sessions at the moment.</h5>
                    </div>
                ) : (
                    Object.keys(classes).map((month) => (
                        <div key={month} className="mb-5">
                            <div className="group-header">
                                <h3 className="group-title">{month}</h3>
                                <span className="badge bg-danger-subtle text-danger px-2 py-1" style={{ fontSize: '0.7rem' }}>Live Schedule</span>
                            </div>
                            <Row className="g-4">
                                {classes[month].map((live) => (
                                    <Col md={4} key={live.id}>
                                        <div className="class-card live" onContextMenu={(e) => e.preventDefault()}>
                                            <div>
                                                <div className="d-flex align-items-center gap-2 mb-3">
                                                    <span className="badge bg-danger-subtle text-danger px-2 py-1" style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase' }}>Live Now</span>
                                                </div>
                                                <h3 className="h6 mb-2">{live.name}</h3>
                                                <div className="text-secondary small d-flex flex-column gap-1 mb-4">
                                                    <span className="d-flex align-items-center gap-2">
                                                        <Calendar size={13} /> {live.classDate ? new Date(live.classDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Scheduled'}
                                                    </span>
                                                    <span className="opacity-75">Instructor: {live.teacherName}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <a
                                                    href={live.zoomLink || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="d-inline-block w-100 text-decoration-none"
                                                >
                                                    <button className="btn-minimal btn-minimal-primary w-100 justify-content-center">
                                                        <PlayCircle size={16} /> Enter Classroom
                                                    </button>
                                                </a>
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

export default LiveClasses;
