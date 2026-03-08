
import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import PageLoader from '../components/PageLoader';

const WatchRecording = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { video } = location.state || {};
    const [showWarning, setShowWarning] = React.useState(false);

    // --- DevTools Restrictions ---
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
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U (View Source)
            if (
                e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                (e.metaKey && e.altKey && e.keyCode === 73) || // Mac: Cmd+Opt+I
                (e.ctrlKey && e.keyCode === 85) // Ctrl+U
            ) {
                e.preventDefault();
                triggerWarning();
                return false;
            }
        };

        // Debugger trap: Pauses the script if DevTools is opened
        const devtoolsTrap = setInterval(() => {
            const startTime = performance.now();
            debugger;
            const endTime = performance.now();
            if (endTime - startTime > 100) {
                triggerWarning();
            }
        }, 1000);

        window.addEventListener('contextmenu', blockContext);
        window.addEventListener('keydown', blockKeys);

        return () => {
            window.removeEventListener('contextmenu', blockContext);
            window.removeEventListener('keydown', blockKeys);
            clearInterval(devtoolsTrap);
            clearTimeout(warningTimeout);
        };
    }, []);
    // ----------------------------

    useEffect(() => {
        if (!video) {
            navigate('/recordings');
        }
    }, [video, navigate]);

    if (!video) return <PageLoader />;

    return (
        <Container fluid className="p-0" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
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
                    gap: '10px'
                }}
            >
                <div style={{ backgroundColor: 'white', color: '#dc3545', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>!</div>
                Security Alert: This action is restricted for security purposes.
            </div>

            {/* Premium Header/Top Bar */}
            <header className="dashboard-header mb-4">
                <Button
                    variant="link"
                    className="p-0 text-secondary d-flex align-items-center gap-2 text-decoration-none hover-white"
                    onClick={() => navigate('/recordings')}
                    style={{ fontWeight: '500', transition: 'color 0.2s' }}
                >
                    <ChevronLeft size={20} /> Back to Recordings
                </Button>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-secondary small fw-medium">Learning Management System</span>
                </div>
            </header>

            <div className="container pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                        {/* Main Content Card */}
                        <div className="class-card overflow-hidden p-0 border-0" style={{ borderRadius: '24px' }}>
                            {/* Video Title Area */}
                            <div className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--glass-border)' }}>
                                <h1 className="h3 fw-bold mb-3" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                                    {video.name}
                                </h1>
                                <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
                                    <span className="teacher-subject-tag d-flex align-items-center gap-2">
                                        <Calendar size={14} />
                                        {video.classDate ? new Date(video.classDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'No Date'}
                                    </span>
                                    <span className="teacher-subject-tag d-flex align-items-center gap-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                                        <User size={14} />
                                        Taught by {video.teacherName}
                                    </span>
                                </div>
                            </div>

                            {/* Player Wrapper with Cinema Background */}
                            <div className="p-0 position-relative" style={{ backgroundColor: '#000', borderBottom: '1px solid var(--glass-border)' }}>
                                <div className="w-100 h-100">
                                    <CustomVideoPlayer url={video.videoLink} title={video.name} />
                                </div>
                            </div>

                            {/* Bottom Info/Description (Optional/Placeholder for space) */}
                            <div className="p-4">
                                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <div style={{ width: '4px', height: '18px', backgroundColor: 'var(--accent-blue)', borderRadius: '2px' }}></div>
                                    About this session
                                </h5>
                                <p className="text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                                    This recording covers the essential topics discussed during the live session on {video.classDate ? new Date(video.classDate).toLocaleDateString() : 'the scheduled date'}.
                                    Please ensure you take notes and complete any associated assignments.
                                </p>
                            </div>
                        </div>

                        {/* Additional Footer info */}
                        <div className="text-center mt-5 mb-3 text-secondary small opacity-75">
                            If you encounter any issues with playback, please contact technical support.
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hover-white:hover {
                    color: white !important;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
            `}</style>
        </Container>
    );
};

export default WatchRecording;
