import { useState } from 'react'
import { Container, Card, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap'
import { Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react'
import { auth, db } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../components/PageLoader'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Multi-role verification
            const adminDoc = await getDoc(doc(db, 'admins', user.uid))

            if (adminDoc.exists()) {
                const role = adminDoc.data().role
                if (['superadmin', 'super_admin', 'admin', 'teacher', 'instructor'].includes(role)) {
                    localStorage.setItem('scmathscore_logged_in', 'true')
                    navigate('/admin/dashboard')
                } else {
                    setError('Access denied. Invalid admin role.')
                    await auth.signOut()
                }
            } else {
                setError('Access denied. Admin privileges required.')
                await auth.signOut()
            }
        } catch (err) {
            console.error(err)
            setError('Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <PageLoader />
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark p-4" style={{
            background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)'
        }}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={11} sm={10} md={6} lg={4}>
                        <Card className="shadow-lg border-0 rounded-4 overflow-hidden bg-white">
                            <div className="bg-dark p-4 text-center text-white border-bottom border-secondary">
                                <ShieldCheck size={48} className="text-warning mb-3" />
                                <h2 className="fw-bold mb-0">Admin Portal</h2>
                                <p className="small text-secondary mb-0">Restricted access for authorized personnel</p>
                            </div>
                            <Card.Body className="p-4 p-md-5">
                                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="small fw-semibold text-dark">Email Address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-light border-0"><Mail size={18} /></InputGroup.Text>
                                            <Form.Control
                                                className="bg-light border-0 shadow-none"
                                                type="email"
                                                placeholder="admin@scmathscore.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="small fw-semibold text-dark">Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-light border-0"><Lock size={18} /></InputGroup.Text>
                                            <Form.Control
                                                className="bg-light border-0 shadow-none"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Button
                                        variant="dark"
                                        className="w-100 py-3 fw-bold rounded-3 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Verifying...
                                            </>
                                        ) : (
                                            'Authorized Entry'
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <a href="/" className="small text-secondary text-decoration-none">Back to Student Portal</a>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdminLogin
