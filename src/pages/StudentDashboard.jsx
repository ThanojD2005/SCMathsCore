import {
    Container,
    Row,
    Col,
    Button,
    Carousel,
    Spinner,
    Form,
    Alert,
} from "react-bootstrap";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import {
    User,
    Video,
    Radio,
    UserCircle,
    LogOut,
    BookOpen,
    Calendar,
    Clock,
    PlayCircle,
    Shield,
    Award,
    Lightbulb,
    FileCheck,
    ShieldAlert,
    Info,
    UserCheck,
    Mail,
    Phone,
    MapPin,
    Edit2,
    Save,
    X,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect, useRef, memo, useMemo } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";

// Fallback Default Banners (Public paths)
const defaultBanner1 = "/uploads/1772882864565-97739747.png";
const defaultBanner2 = "/uploads/1772882857499-981619990.png";
const defaultBanner3 = "/uploads/1772882864565-97739747.png"; // Reusing first as fallback

const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                setHasBeenVisible(true);
            } else {
                setIsIntersecting(false);
            }
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [options]);

    return [elementRef, isIntersecting, hasBeenVisible];
};

const Reveal = memo(
    ({ children, delay = 0, threshold = 0.1, className = "" }) => {
        const [ref, isVisible, hasBeenVisible] = useIntersectionObserver({
            threshold,
        });

        return (
            <div
                ref={ref}
                className={`${hasBeenVisible ? "reveal-animate" : ""} ${className}`}
                style={{
                    opacity: hasBeenVisible ? 1 : 0,
                    transitionDelay: `${delay}ms`,
                }}
            >
                {children}
            </div>
        );
    },
);

const CountUp = memo(({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [containerRef, isVisible, hasBeenVisible] = useIntersectionObserver({
        threshold: 0.1,
    });

    useEffect(() => {
        if (!hasBeenVisible) return;

        let startTime;
        let animationFrame;

        const endStr = end?.toString() || "0";
        const endNumber = parseFloat(endStr.replace(/[^\d.]/g, "")) || 0;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(progress * endNumber);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(endNumber);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasBeenVisible]);

    const endStr = end?.toString() || "0";
    if (endStr.includes("/")) {
        const parts = endStr.split("/");
        return (
            <span ref={containerRef}>
                {count.toFixed(1)}/{parts[1]}
            </span>
        );
    }

    return (
        <span ref={containerRef}>
            {Math.floor(count)}
            {endStr.includes("+") ? "+" : ""}
        </span>
    );
});

const StudentDashboard = ({ user, userData }) => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [latestClasses, setLatestClasses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [banners, setBanners] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [teacherCardRef, isTeacherVisible, hasTeacherBeenVisible] =
        useIntersectionObserver({ threshold: 0.2 });
    const [bannersLoaded, setBannersLoaded] = useState(false);
    const [teacherLoaded, setTeacherLoaded] = useState(false);
    const [assetsReady, setAssetsReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showWarning, setShowWarning] = useState(false);
    const studentName = userData
        ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
        : user
            ? "Student Name"
            : "Guest";

    // Account Details States
    const [isEditing, setIsEditing] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        gender: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                address: userData.address || "",
                gender: userData.gender || "",
            });
        }
    }, [userData]);

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
        setMessage({ type: "", text: "" });
        if (!isEditing && userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                address: userData.address || "",
                gender: userData.gender || "",
            });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const docRef = doc(db, "students", user.uid);
            await updateDoc(docRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                gender: formData.gender,
            });

            setMessage({ type: "success", text: "Profile updated successfully!" });
            setIsEditing(false);
        } catch (error) {
            console.error("Update error:", error);
            setMessage({
                type: "danger",
                text: "Failed to update profile. Please try again.",
            });
        } finally {
            setSaveLoading(false);
        }
    };

    // --- DevTools & Right-Click Restrictions ---
    useEffect(() => {
        let warningTimeout;
        const triggerWarning = () => {
            setShowWarning(true);
            clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => setShowWarning(false), 3000);
        };

        const blockContext = (e) => {
            // Check if clicking on zoom related elements or globally on this sensitive page
            e.preventDefault();
            triggerWarning();
        };

        const blockKeys = (e) => {
            if (
                e.keyCode === 123 ||
                (e.ctrlKey &&
                    e.shiftKey &&
                    (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                (e.metaKey && e.altKey && e.keyCode === 73) ||
                (e.ctrlKey && e.keyCode === 85)
            ) {
                e.preventDefault();
                triggerWarning();
                return false;
            }
        };

        window.addEventListener("contextmenu", blockContext);
        window.addEventListener("keydown", blockKeys);

        return () => {
            window.removeEventListener("contextmenu", blockContext);
            window.removeEventListener("keydown", blockKeys);
            clearTimeout(warningTimeout);
        };
    }, []);
    // ------------------------------------------

    // --- Fetch Banners (Always Priority) ---
    useEffect(() => {
        // Always fetch banners, even for public landing page

        const q = query(collection(db, "banners"), where("isActive", "==", true));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                console.log("Banner snapshot received. Count:", snapshot.docs.length);
                const fetchedBanners = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                fetchedBanners.sort(
                    (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0),
                );
                console.log("Processed Banners:", fetchedBanners);
                setBanners(fetchedBanners);
                setBannersLoaded(true);
            },
            (err) => {
                console.error("Banner fetch error:", err);
                setBannersLoaded(true); // Set to true to show fallbacks on error
            },
        );

        return () => unsubscribe();
    }, [user?.uid]);

    // --- Fetch Content (Dependent on alYear & Verification) ---
    useEffect(() => {
        if (!user?.uid || !userData?.alYear || userData?.status !== "verified") {
            // If guest or waiting for verification, don't set loading false here
            // The sync useEffect handles it based on banners/teacher/userData
            return;
        }

        // Fetch student enrollments
        const qEnroll = query(
            collection(db, "enrollment"),
            where("studentId", "==", user.uid),
        );

        const unsubscribeEnroll = onSnapshot(qEnroll, (snapshot) => {
            const enrolledMonths = snapshot.docs.map(
                (doc) => doc.data().enrolledMonth,
            );
            setEnrollments(enrolledMonths);

            // Fetch Live Classes
            const qLive = query(
                collection(db, "liveClasses"),
                where("status", "==", "active"),
                where("alYear", "==", userData.alYear),
                limit(20),
            );

            // Fetch Recorded Classes
            const qRec = query(
                collection(db, "recordClasses"),
                where("status", "==", "active"),
                where("alYear", "==", userData.alYear),
                limit(20),
            );

            let liveData = [];
            let recData = [];

            const updateLatest = () => {
                const combined = [...liveData, ...recData]
                    .sort(
                        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
                    )
                    .slice(0, 3);
                setLatestClasses(combined);
            };

            const unsubscribeLive = onSnapshot(qLive, (snapshot) => {
                liveData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    type: "live",
                }));
                updateLatest();
            });

            const unsubscribeRec = onSnapshot(qRec, (snapshot) => {
                recData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    type: "record",
                }));
                updateLatest();
            });

            return () => {
                unsubscribeLive();
                unsubscribeRec();
            };
        });

        return () => unsubscribeEnroll();
    }, [user?.uid, userData?.alYear]);

    // --- Asset Pre-loading logic ---
    useEffect(() => {
        const preloadAssets = async () => {
            // Define all image URLs to wait for
            const imgUrls = [];

            // Add ONLY the first banner
            if (banners && banners.length > 0) {
                if (banners[0].imageUrl) imgUrls.push(banners[0].imageUrl);
            } else {
                // Fallbacks if no banners are available yet or error
                imgUrls.push(defaultBanner1);
            }

            // Remove teacher image from preloader to save RAM on initial load

            // Add brand logo if needed (unauthenticated users see Footer.jsx which has it)
            imgUrls.push("/Document.png");

            if (imgUrls.length === 0) {
                setAssetsReady(true);
                return;
            }

            const promiseArray = imgUrls.map((url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // Don't block forever if one fails
                });
            });

            await Promise.all(promiseArray);

            // Give a tiny extra buffer for browser to paint
            setTimeout(() => setAssetsReady(true), 100);
        };

        if (bannersLoaded && teacherLoaded) {
            preloadAssets();
        }
    }, [banners, bannersLoaded, teacherLoaded]);

    // --- Final Loading Sync ---
    useEffect(() => {
        // Condition for dismissing loader:
        // 1. If logged in, must have userData.
        // 2. Must have fetched banners and teacher info.
        // 3. Must have finished pre-loading critical images.
        const isProfileReady = user ? userData !== null : true;

        if (isProfileReady && bannersLoaded && teacherLoaded && assetsReady) {
            // Add a small delay for a smoother reveal
            const timer = setTimeout(() => {
                setLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [userData, bannersLoaded, teacherLoaded, assetsReady, user]);

    // Fetch Teacher Info
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const { getDoc, doc } = await import("firebase/firestore");
                const docRef = doc(db, "settings", "teacher");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTeacher(docSnap.data());
                }
                setTeacherLoaded(true);
            } catch (err) {
                console.error("Error fetching teacher:", err);
                setTeacherLoaded(true);
            }
        };
        fetchTeacher();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return <PageLoader />;
    }

    // --- Verification Pending Check ---
    const isUnverified = user && userData && userData.status === "pending";

    return (
        <Container
            fluid
            className="p-0"
            style={{
                backgroundColor: "var(--bg-primary)",
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Verification Pending Overlay */}
            {isUnverified && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        backdropFilter: "blur(12px)",
                        zIndex: 10000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <Card
                        className="border-0 shadow-lg text-center p-4 p-md-5"
                        style={{
                            maxWidth: "500px",
                            backgroundColor: "rgba(30, 41, 59, 0.9)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "32px",
                        }}
                    >
                        <div className="mb-4 d-inline-flex p-4 rounded-circle bg-warning bg-opacity-10 text-warning mx-auto">
                            <ShieldAlert size={64} />
                        </div>
                        <h2
                            className="fw-bold mb-3 text-white"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            Verification Pending
                        </h2>
                        <p className="text-secondary mb-4">
                            Welcome, <strong>{studentName}</strong>! Your account is currently
                            being reviewed by our administrators.
                        </p>
                        <div className="p-3 rounded-4 bg-dark bg-opacity-25 mb-4 border border-white border-opacity-10 text-start">
                            <div className="d-flex gap-2 align-items-center text-info small mb-2">
                                <Info size={16} />
                                <span className="fw-bold fs-7">Next Steps</span>
                            </div>
                            <ul className="small text-secondary mb-0 ps-3">
                                <li>Admin will verify your details soon.</li>
                                <li>All classes will be unlocked after verification.</li>
                                <li>Process usually takes a few hours.</li>
                            </ul>
                        </div>
                        <Button
                            variant="primary"
                            className="w-100 py-3 rounded-3 fw-bold btn-minimal-primary"
                            onClick={handleLogout}
                        >
                            Log Out
                        </Button>
                    </Card>
                </div>
            )}
            {/* Warning Message */}
            <div
                className={`position-fixed top-0 start-50 translate-middle-x mt-4 p-3 rounded-3 shadow-lg bg-danger text-white transition-all`}
                style={{
                    zIndex: 9999,
                    opacity: showWarning ? 1 : 0,
                    pointerEvents: "none",
                    transform: `translate(-50%, ${showWarning ? "0" : "-20px"})`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "max-content",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        color: "#dc3545",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                    }}
                >
                    !
                </div>
                Security Alert: This action is restricted for security purposes.
            </div>

            {/* Header */}
            <header className="dashboard-header mb-4">
                <h1
                    className="m-0 fw-bold"
                    style={{
                        fontSize: "1.75rem",
                        letterSpacing: "-0.03em",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    SCMathsCore
                </h1>
                <div className="d-flex align-items-center gap-4 position-relative">
                    {user && userData ? (
                        <>
                            <span className="text-secondary fw-medium d-none d-sm-block">
                                {userData.firstName
                                    ? `${userData.firstName} ${userData.lastName || ""}`
                                    : "Student"}
                            </span>
                            <div
                                className="user-profile-circle"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <User size={20} />

                                {showProfileMenu && (
                                    <div className="profile-dropdown shadow-lg">
                                        <button
                                            className="dropdown-item-custom"
                                            onClick={() => navigate("/account")}
                                        >
                                            <UserCircle size={16} /> Account details
                                        </button>
                                        <button
                                            className="dropdown-item-custom text-danger"
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={16} /> Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div
                            className="d-flex gap-1 gap-sm-2"
                            style={{ position: "relative", zIndex: 1005 }}
                        >
                            <Link
                                to="/login"
                                className="btn-minimal btn-minimal-outline border-1 shadow-none text-decoration-none"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="btn-minimal btn-minimal-primary shadow-none text-decoration-none"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <Container fluid className="p-0 mb-5">
                {/* Banner Carousel */}
                <Carousel
                    className="banner-carousel"
                    interval={4000}
                    controls={(banners.length > 0 ? banners.length : 3) > 1}
                    indicators={true}
                    pause="hover"
                >
                    {banners.length > 0 ? (
                        banners.map((banner, idx) => (
                            <Carousel.Item key={banner.id}>
                                {banner.link ? (
                                    <a
                                        href={banner.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="banner-img w-100"
                                            src={banner.imageUrl}
                                            alt={banner.title || "Promotional Banner"}
                                            fetchPriority={idx === 0 ? "high" : "auto"}
                                            loading={idx === 0 ? "eager" : "lazy"}
                                            decoding={idx === 0 ? "sync" : "async"}
                                        />
                                    </a>
                                ) : (
                                    <img
                                        className="banner-img w-100"
                                        src={banner.imageUrl}
                                        alt={banner.title || "Promotional Banner"}
                                        fetchPriority={idx === 0 ? "high" : "auto"}
                                        loading={idx === 0 ? "eager" : "lazy"}
                                        decoding={idx === 0 ? "sync" : "async"}
                                    />
                                )}
                            </Carousel.Item>
                        ))
                    ) : (
                        <>
                            {/* Fallback Default Banners while loading or if database is empty */}
                            <Carousel.Item>
                                <img
                                    className="banner-img w-100"
                                    src={defaultBanner1}
                                    alt="Join SCMathsCore"
                                    fetchPriority="high"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="banner-img w-100"
                                    src={defaultBanner2}
                                    alt="Live Classes"
                                    loading="lazy"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="banner-img w-100"
                                    src={defaultBanner3}
                                    alt="Excellence in Learning"
                                    loading="lazy"
                                />
                            </Carousel.Item>
                        </>
                    )}
                </Carousel>
            </Container>

            {user && (
                <Container className="mb-5 mt-4 px-0">
                    <Reveal>
                        <div
                            className="class-card border-0 overflow-hidden position-relative w-100"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
                                borderRadius: "24px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                            }}
                        >
                            <div
                                className="position-absolute"
                                style={{
                                    top: "-50px",
                                    right: "-50px",
                                    width: "200px",
                                    height: "200px",
                                    background:
                                        "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                                    borderRadius: "50%",
                                }}
                            ></div>
                            <div
                                className="position-absolute"
                                style={{
                                    bottom: "-50px",
                                    left: "-50px",
                                    width: "200px",
                                    height: "200px",
                                    background:
                                        "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
                                    borderRadius: "50%",
                                }}
                            ></div>
                            <div className="p-4 position-relative z-1 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-4 text-center text-sm-start">
                                <div className="d-flex flex-column flex-sm-row align-items-center gap-4">
                                    {/* Profile Image */}
                                    <div className="position-relative">
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                background:
                                                    "linear-gradient(135deg, var(--accent-blue), #8b5cf6)",
                                                padding: "3px",
                                            }}
                                        >
                                            <div
                                                className="w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"
                                                style={{ backgroundColor: "#0f172a" }}
                                            >
                                                <User size={50} color="white" strokeWidth={1.5} />
                                            </div>
                                        </div>
                                        {/* Badge */}
                                        <div
                                            className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                                            style={{
                                                width: "28px",
                                                height: "28px",
                                                backgroundColor: "#10b981",
                                                border: "2px solid #0f172a",
                                            }}
                                        >
                                            <Shield size={14} color="white" />
                                        </div>
                                    </div>

                                    {/* Name and Status */}
                                    <div>
                                        <h3 className="h4 fw-bold text-white mb-1">
                                            {studentName}
                                        </h3>
                                        <p className="text-secondary small fw-medium text-uppercase tracking-wider mb-0 d-flex align-items-center justify-content-center justify-content-sm-start gap-1">
                                            <UserCheck size={14} className="text-success" /> Verified
                                            Student
                                        </p>
                                    </div>
                                </div>

                                {/* QR Code Section */}
                                <div className="d-flex flex-column align-items-center bg-white p-2 rounded-4 shadow-lg">
                                    <QRCodeSVG
                                        value={user?.uid || "unknown-student"}
                                        size={90}
                                        level={"H"}
                                        includeMargin={false}
                                        fgColor={"#0f172a"}
                                    />
                                    <span
                                        className="small mt-1 fw-bold text-dark"
                                        style={{ fontSize: "10px", letterSpacing: "1px" }}
                                    >
                                        STUDENT ID
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            )}

            <Container className="px-4 pb-5">
                {/* Latest Classes Section - Only for logged in users */}
                {user && (
                    <section className="mb-5">
                        <Reveal>
                            <div className="group-header">
                                <h2 className="group-title">Latest Updates</h2>
                            </div>
                        </Reveal>
                        <Row className="g-4">
                            {loading ? (
                                <Col className="text-center py-5">
                                    <p className="text-secondary">Loading latest classes...</p>
                                </Col>
                            ) : latestClasses.length === 0 ? (
                                <Col className="text-center py-5">
                                    <p className="text-secondary">No classes available yet.</p>
                                </Col>
                            ) : (
                                latestClasses.map((cls, idx) => (
                                    <Col md={4} key={cls.id}>
                                        <Reveal delay={idx * 150}>
                                            <div
                                                className={`class-card ${cls.type === "live" ? "live" : "recording"}`}
                                                onContextMenu={(e) => e.preventDefault()}
                                                style={{ position: "relative" }}
                                            >
                                                <div>
                                                    <div className="d-flex align-items-center gap-2 mb-3">
                                                        {cls.type === "live" ? (
                                                            <span
                                                                className="badge bg-danger-subtle text-danger px-2 py-1"
                                                                style={{
                                                                    fontSize: "0.7rem",
                                                                    fontWeight: "700",
                                                                    textTransform: "uppercase",
                                                                }}
                                                            >
                                                                Live
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className="badge bg-success-subtle text-success px-2 py-1"
                                                                style={{
                                                                    fontSize: "0.7rem",
                                                                    fontWeight: "700",
                                                                    textTransform: "uppercase",
                                                                }}
                                                            >
                                                                Recorded
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="h5 mb-2">{cls.name}</h3>
                                                    <p className="text-secondary small d-flex align-items-center gap-2 mb-4">
                                                        <Calendar size={14} />{" "}
                                                        {cls.classDate
                                                            ? new Date(cls.classDate).toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                },
                                                            )
                                                            : "Scheduled"}
                                                    </p>
                                                </div>
                                                <div>
                                                    {cls.type === "live" ? (
                                                        <a
                                                            href={cls.zoomLink || "#"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-decoration-none w-100"
                                                        >
                                                            <button className="btn-minimal btn-minimal-primary w-100 justify-content-center">
                                                                <PlayCircle size={18} /> Join Meeting
                                                            </button>
                                                        </a>
                                                    ) : (
                                                        <button
                                                            className="btn-minimal btn-minimal-outline border-1 w-100 justify-content-center"
                                                            onClick={() =>
                                                                navigate("/recordings/watch", {
                                                                    state: { video: cls },
                                                                })
                                                            }
                                                        >
                                                            <PlayCircle size={18} /> Watch Now
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </Reveal>
                                    </Col>
                                ))
                            )}
                        </Row>
                    </section>
                )}

                {/* Teacher Profile Section */}
                {teacher && (
                    <section className="mb-5 position-relative">
                        <div
                            className="decorative-blob"
                            style={{ top: "-40px", left: "-40px" }}
                        ></div>
                        <div
                            className="decorative-blob"
                            style={{
                                bottom: "-40px",
                                right: "-40px",
                                background: "var(--accent-red)",
                            }}
                        ></div>

                        <div className="group-header">
                            <h2 className="group-title">Meet Your Teacher</h2>
                        </div>

                        <div
                            ref={teacherCardRef}
                            className={`teacher-profile-card ${hasTeacherBeenVisible ? "teacher-card-animate" : ""}`}
                            style={{ opacity: hasTeacherBeenVisible ? 1 : 0 }}
                        >
                            <Row className="g-0">
                                <Col md={5} lg={4}>
                                    <div
                                        className="teacher-image-container h-100"
                                        style={{ minHeight: "400px" }}
                                    >
                                        {teacher.photoUrl ? (
                                            <img
                                                src={teacher.photoUrl}
                                                alt={teacher.name}
                                                className="w-100 h-100 object-fit-cover shadow-lg"
                                                loading="lazy"
                                                decoding="async"
                                                style={{ contentVisibility: "auto" }}
                                            />
                                        ) : (
                                            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
                                                <UserCircle
                                                    size={80}
                                                    className="text-secondary opacity-25"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col md={7} lg={8}>
                                    <div className="p-4 p-lg-5 h-100 d-flex flex-column justify-content-center position-relative">
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center gap-3 mb-2">
                                                <div className="verified-badge pulse-animation">
                                                    <Shield size={14} fill="currentColor" />
                                                    Verified Educator
                                                </div>
                                            </div>
                                            <h3
                                                className="h1 mb-3 teacher-name-gradient"
                                                style={{ letterSpacing: "-0.05em" }}
                                            >
                                                {teacher.name}
                                            </h3>
                                            <div className="d-flex flex-wrap gap-2 mb-4">
                                                {(teacher.subjects?.split(",") || []).map(
                                                    (subject, idx) => (
                                                        <span key={idx} className="teacher-subject-tag">
                                                            <BookOpen size={14} className="me-1" />
                                                            {subject.trim()}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        <div className="position-relative">
                                            <p className="teacher-bio-text mb-0">
                                                {teacher.description}
                                            </p>
                                        </div>

                                        <div className="mt-5 pt-4 border-top border-secondary border-opacity-10 d-flex gap-5">
                                            <div className="text-center">
                                                <div className="h4 fw-bold mb-0 text-white">
                                                    <CountUp end={teacher.studentCount || "500+"} />
                                                </div>
                                                <div className="small text-secondary">
                                                    Students Joining
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="h4 fw-bold mb-0 text-white">
                                                    <CountUp end={teacher.experience || "10+"} />
                                                </div>
                                                <div className="small text-secondary">
                                                    Years of Experience
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </section>
                )}

                {/* "Why Choose Us" Section */}
                <section className="mb-5 position-relative">
                    <Reveal>
                        <div className="group-header">
                            <h2
                                className="group-title"
                                style={{ fontFamily: "Noto Sans Sinhala, sans-serif" }}
                            >
                                ඇයි අපගේ පංතිය ඔබ තෝරා ගත යුත්තේ?
                            </h2>
                        </div>
                    </Reveal>
                    <Row className="g-4">
                        <Col md={4} className="d-flex">
                            <Reveal delay={100} className="w-100">
                                <div
                                    className="class-card w-100 p-4 d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{
                                        minHeight: "340px",
                                        background:
                                            "linear-gradient(145deg, rgba(59, 130, 246, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                        borderTop: "3px solid var(--accent-blue)",
                                        borderRight: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                    }}
                                >
                                    <div
                                        className="mb-4"
                                        style={{
                                            padding: "16px",
                                            borderRadius: "16px",
                                            background: "rgba(59, 130, 246, 0.15)",
                                            color: "var(--accent-blue)",
                                            display: "inline-block",
                                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
                                        }}
                                    >
                                        <Award size={32} />
                                    </div>
                                    <h4 className="h5 fw-bold mb-3 text-white">
                                        විශිෂ්ඨ ප්‍රතිඵල
                                    </h4>
                                    <p
                                        className="mb-0"
                                        style={{
                                            color: "rgba(255, 255, 255, 0.9)",
                                            lineHeight: "1.8",
                                            fontSize: "1rem",
                                            fontFamily: "Noto Sans Sinhala, sans-serif",
                                        }}
                                    >
                                        ගුරුවරයා දිස්ත්‍රික් දෙවන ස්ථානය හිමි කර ගනිමින් මොරටු විශ්ව
                                        විද්‍යාලයට තේරී පත් වී ඇති අතර, එහිදී ද කිහිප දෙනෙකුට පමණක්
                                        අවස්ථාව උදාවන ගුවන් යානා ඉංජිනේරුවරයෙකු වීමට ඉගෙනුම ලබයි.
                                    </p>
                                </div>
                            </Reveal>
                        </Col>
                        <Col md={4} className="d-flex">
                            <Reveal delay={200} className="w-100">
                                <div
                                    className="class-card w-100 p-4 d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{
                                        minHeight: "340px",
                                        background:
                                            "linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                        borderTop: "3px solid #10b981",
                                        borderRight: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                    }}
                                >
                                    <div
                                        className="mb-4"
                                        style={{
                                            padding: "16px",
                                            borderRadius: "16px",
                                            background: "rgba(16, 185, 129, 0.15)",
                                            color: "#10b981",
                                            display: "inline-block",
                                            boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                                        }}
                                    >
                                        <Lightbulb size={32} />
                                    </div>
                                    <h4 className="h5 fw-bold mb-3 text-white">නව චින්තනය</h4>
                                    <p
                                        className="mb-0"
                                        style={{
                                            color: "rgba(255, 255, 255, 0.9)",
                                            lineHeight: "1.8",
                                            fontSize: "1rem",
                                            fontFamily: "Noto Sans Sinhala, sans-serif",
                                        }}
                                    >
                                        විෂයෙන් එහාට ගොස් සිසුන්ගේ චින්තනය වැඩි දියුණු කිරීමට අවශ්‍ය
                                        විශේෂ අභ්‍යාස පංතිය තුළදීම ප්‍රායෝගිකව සිදු කිරීම.
                                    </p>
                                </div>
                            </Reveal>
                        </Col>
                        <Col md={4} className="d-flex">
                            <Reveal delay={300} className="w-100">
                                <div
                                    className="class-card w-100 p-4 d-flex flex-column align-items-center justify-content-center text-center"
                                    style={{
                                        minHeight: "340px",
                                        background:
                                            "linear-gradient(145deg, rgba(245, 158, 11, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                        borderTop: "3px solid #f59e0b",
                                        borderRight: "none",
                                        borderBottom: "none",
                                        borderLeft: "none",
                                    }}
                                >
                                    <div
                                        className="mb-4"
                                        style={{
                                            padding: "16px",
                                            borderRadius: "16px",
                                            background: "rgba(245, 158, 11, 0.15)",
                                            color: "#f59e0b",
                                            display: "inline-block",
                                            boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)",
                                        }}
                                    >
                                        <FileCheck size={32} />
                                    </div>
                                    <h4 className="h5 fw-bold mb-3 text-white">මනා සූදානම</h4>
                                    <p
                                        className="mb-0"
                                        style={{
                                            color: "rgba(255, 255, 255, 0.9)",
                                            lineHeight: "1.8",
                                            fontSize: "1rem",
                                            fontFamily: "Noto Sans Sinhala, sans-serif",
                                        }}
                                    >
                                        උසස් පෙළ විභාගයට මුහුණ දීමට පෙර ඉතා හොඳ අනුමාන ප්‍රශ්න පත්‍ර
                                        ලබා දෙමින් විභාගය සඳහා මනා සූදානමක් ලබා දීම.
                                    </p>
                                </div>
                            </Reveal>
                        </Col>
                    </Row>
                </section>

                {/* Main Navigation Row - Only for logged in users */}
                {user && (
                    <>
                        <Reveal>
                            <div className="group-header">
                                <h2 className="group-title">Explore Portals</h2>
                            </div>
                        </Reveal>
                        <Row className="g-4">
                            <Col md={6}>
                                <Reveal delay={100}>
                                    <div
                                        className="nav-card"
                                        onClick={() => navigate("/recordings")}
                                    >
                                        <div className="nav-card-icon">
                                            <Video size={32} />
                                        </div>
                                        <div>
                                            <h3 className="h4 mb-2">Recorded Library</h3>
                                            <p className="text-secondary small mb-0 px-4">
                                                Access all your course recordings in one place.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </Col>
                            <Col md={6}>
                                <Reveal delay={200}>
                                    <div
                                        className="nav-card"
                                        onClick={() => navigate("/live-classes")}
                                    >
                                        <div
                                            className="nav-card-icon"
                                            style={{ color: "var(--accent-red)" }}
                                        >
                                            <Radio size={32} />
                                        </div>
                                        <div>
                                            <h3 className="h4 mb-2">Live Portal</h3>
                                            <p className="text-secondary small mb-0 px-4">
                                                Join ongoing sessions and interact in real-time.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
            <Footer />
        </Container>
    );
};

export default StudentDashboard;
