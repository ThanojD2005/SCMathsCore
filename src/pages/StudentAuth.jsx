import { useState, useEffect } from 'react'
import { Container, Card, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap'
import { Phone, Lock, User, Mail, MapPin, Loader2 } from 'lucide-react'
import { auth, db } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc, collection, query, orderBy, onSnapshot, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../components/PageLoader'

const StudentAuth = ({ initialMode }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [alYears, setAlYears] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (initialMode === 'signup') {
            setIsLogin(false)
        } else if (initialMode === 'login') {
            setIsLogin(true)
        }
    }, [initialMode])

    // Form States
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        primaryPhone: '',
        email: '',
        address: '',
        secondaryPhone: '',
        alYear: '',
        gender: '',
        password: ''
    })

    useEffect(() => {
        const q = collection(db, 'alYears')
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const yearsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => {
                // Manual sort to avoid index issues
                return (b.year || '').toString().localeCompare((a.year || '').toString(), undefined, { numeric: true, sensitivity: 'base' })
            })
            setAlYears(yearsData)
        }, (error) => {
            console.error("Error fetching AL years:", error)
        })

        return () => unsubscribe()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Map phone to a consistent email for Firebase Auth
        const authEmail = `${formData.primaryPhone.replace(/\s+/g, '')}@lms.local`

        try {
            if (isLogin) {
                // Clear any leftover local session ID to prevent a race condition 
                // that mistakenly triggers the multi-device logout listener in App.jsx
                localStorage.removeItem('scmathscore_session_id')

                // Login Logic
                const userCredential = await signInWithEmailAndPassword(auth, authEmail, formData.password)
                const user = userCredential.user

                // Generate a unique session ID
                const sessionId = Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9)

                // Store in Firestore and LocalStorage
                await updateDoc(doc(db, 'students', user.uid), {
                    sessionId: sessionId,
                    lastLogin: new Date().toISOString()
                })
                localStorage.setItem('scmathscore_session_id', sessionId)
                localStorage.setItem('scmathscore_logged_in', 'true')

                // Redirect to dashboard (or home for now)
                navigate('/')
            } else {
                // Signup Logic
                const userCredential = await createUserWithEmailAndPassword(auth, authEmail, formData.password)
                const user = userCredential.user

                // Store details in Firestore
                await setDoc(doc(db, 'students', user.uid), {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    primaryPhone: formData.primaryPhone,
                    email: formData.email,
                    address: formData.address,
                    secondaryPhone: formData.secondaryPhone || '',
                    alYear: formData.alYear,
                    gender: formData.gender,
                    role: 'student',
                    status: 'pending',
                    isVerified: false,
                    createdAt: new Date().toISOString()
                })

                // Sign out the automatically authenticated user so they officially log in 
                // and generate a valid session ID
                await auth.signOut()

                setIsLogin(true)
                alert('Account created successfully! Please log in.')
            }
        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <PageLoader />
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{
            background: 'var(--bg-primary)'
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={isLogin ? 7 : 10} lg={isLogin ? 5 : 8} xl={isLogin ? 4 : 7}>
                        <Card className="class-card overflow-hidden p-0 border-0" style={{ borderRadius: '24px' }}>
                            <div className="p-4 text-center" style={{ background: 'rgba(59, 130, 246, 0.1)', borderBottom: '1px solid var(--glass-border)' }}>
                                <h2 className="fw-bold mb-1" style={{ color: 'white' }}>{isLogin ? 'Student Login' : 'Student Sign Up'}</h2>
                                <p className="small mb-0 text-secondary">
                                    {isLogin ? 'Access your learning dashboard' : 'Join SCMathsCore to start learning'}
                                </p>
                            </div>
                            <Card.Body className="p-4 p-md-5">
                                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    {!isLogin && (
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="small fw-semibold text-secondary">First Name</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Text className="custom-input-group-text"><User size={18} /></InputGroup.Text>
                                                        <Form.Control
                                                            name="firstName"
                                                            onChange={handleChange}
                                                            className="custom-form-control"
                                                            type="text"
                                                            placeholder="John"
                                                            required
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="small fw-semibold text-secondary">Last Name</Form.Label>
                                                    <InputGroup>
                                                        <InputGroup.Text className="custom-input-group-text"><User size={18} /></InputGroup.Text>
                                                        <Form.Control
                                                            name="lastName"
                                                            onChange={handleChange}
                                                            className="custom-form-control"
                                                            type="text"
                                                            placeholder="Doe"
                                                            required
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )}

                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-semibold text-secondary">Primary Phone Number</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="custom-input-group-text"><Phone size={18} /></InputGroup.Text>
                                            <Form.Control
                                                name="primaryPhone"
                                                onChange={handleChange}
                                                className="custom-form-control"
                                                type="tel"
                                                placeholder="07XXXXXXXX"
                                                required
                                            />
                                        </InputGroup>
                                        {!isLogin && <Form.Text className="text-secondary small mt-2 opacity-75">This will be your login ID.</Form.Text>}
                                    </Form.Group>

                                    {!isLogin && (
                                        <>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold text-secondary">Email Address</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="custom-input-group-text"><Mail size={18} /></InputGroup.Text>
                                                    <Form.Control
                                                        name="email"
                                                        onChange={handleChange}
                                                        className="custom-form-control"
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold text-secondary">Address</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="custom-input-group-text"><MapPin size={18} /></InputGroup.Text>
                                                    <Form.Control
                                                        name="address"
                                                        onChange={handleChange}
                                                        className="custom-form-control"
                                                        as="textarea"
                                                        rows={2}
                                                        placeholder="Enter your full address"
                                                        required
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold text-secondary">A/L Year</Form.Label>
                                                <Form.Select
                                                    name="alYear"
                                                    onChange={handleChange}
                                                    className="custom-form-control"
                                                    required
                                                >
                                                    <option value="" className="text-dark">Select A/L Year</option>
                                                    {alYears.map(year => (
                                                        <option key={year.id} value={year.year} className="text-dark">{year.year}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold text-secondary">Gender</Form.Label>
                                                <Form.Select
                                                    name="gender"
                                                    onChange={handleChange}
                                                    className="custom-form-control"
                                                    required
                                                >
                                                    <option value="" className="text-dark">Select Gender</option>
                                                    <option value="Male" className="text-dark">Male</option>
                                                    <option value="Female" className="text-dark">Female</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-semibold text-secondary">Secondary Phone (Optional)</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text className="custom-input-group-text"><Phone size={18} /></InputGroup.Text>
                                                    <Form.Control
                                                        name="secondaryPhone"
                                                        onChange={handleChange}
                                                        className="custom-form-control"
                                                        type="tel"
                                                        placeholder="07XXXXXXXX"
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                        </>
                                    )}

                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-semibold text-secondary">Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="custom-input-group-text"><Lock size={18} /></InputGroup.Text>
                                            <Form.Control
                                                name="password"
                                                onChange={handleChange}
                                                className="custom-form-control"
                                                type="password"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Button
                                        className="btn-minimal-primary w-100 py-3 mb-4"
                                        type="submit"
                                        disabled={loading}
                                        style={{ fontSize: '1.05rem' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Processing...
                                            </>
                                        ) : (
                                            isLogin ? 'Sign In' : 'Create Account'
                                        )}
                                    </Button>

                                    <div className="text-center mt-3">
                                        <span className="text-secondary small">
                                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                                        </span>
                                        <Button
                                            variant="link"
                                            type="button"
                                            className="p-0 ms-1 small fw-bold text-decoration-none shadow-none"
                                            style={{ color: 'var(--accent-blue)', verticalAlign: 'baseline' }}
                                            onClick={() => setIsLogin(!isLogin)}
                                        >
                                            {isLogin ? 'Sign Up' : 'Log In'}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .custom-form-control {
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid var(--glass-border) !important;
                    color: white !important;
                }
                .custom-form-control:focus {
                    background-color: rgba(255, 255, 255, 0.08) !important;
                    border-color: var(--accent-blue) !important;
                    box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25) !important;
                }
                .custom-form-control::placeholder {
                    color: rgba(255, 255, 255, 0.4) !important;
                }
                .custom-input-group-text {
                    background-color: rgba(255, 255, 255, 0.03) !important;
                    border: 1px solid var(--glass-border) !important;
                    border-right: none !important;
                    color: var(--text-secondary) !important;
                }
            `}</style>
        </div>
    )
}

export default StudentAuth
