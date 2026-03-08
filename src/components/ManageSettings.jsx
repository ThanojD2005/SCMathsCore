import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, InputGroup, Alert, Table, Badge, Spinner } from 'react-bootstrap'
import { Calendar, Plus, Trash2, Loader2, Save, User, Image, Upload, Settings } from 'lucide-react'
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'



const ManageSettings = () => {
    // A/L Years State
    const [alYears, setAlYears] = useState([])
    const [newYear, setNewYear] = useState('')

    // Teacher Profile State
    const [teacherInfo, setTeacherInfo] = useState({
        name: '',
        subjects: '',
        description: '',
        photoUrl: '',
        studentCount: '500+',
        experience: '10+'
    })
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    useEffect(() => {
        // Fetch AL Years
        const q = query(collection(db, 'alYears'), orderBy('year', 'desc'))
        const unsubscribeYears = onSnapshot(q, (snapshot) => {
            const yearsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setAlYears(yearsData)
        }, (error) => {
            console.error("Error fetching AL years:", error)
            setMessage({ type: 'danger', text: 'Failed to load AL years data.' })
        })

        // Fetch Teacher Info
        const fetchTeacher = async () => {
            try {
                const docRef = doc(db, 'settings', 'teacher')
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTeacherInfo(data)
                }
            } catch (err) {
                console.error("Error fetching teacher info:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchTeacher()
        return () => unsubscribeYears()
    }, [])

    const handleAddYear = async (e) => {
        e.preventDefault()
        if (!newYear.trim()) return

        setActionLoading(true)
        setMessage({ type: '', text: '' })

        try {
            await addDoc(collection(db, 'alYears'), {
                year: newYear.trim(),
                createdAt: new Date().toISOString()
            })
            setMessage({ type: 'success', text: `A/L Year ${newYear.trim()} added successfully!` })
            setNewYear('')
        } catch (err) {
            console.error("Error adding AL year:", err)
            setMessage({ type: 'danger', text: `Failed to add: ${err.message}` })
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteYear = async (yearId) => {
        if (!window.confirm(`Are you sure you want to delete A/L Year ${yearId}?`)) return
        setActionLoading(true)
        try {
            await deleteDoc(doc(db, 'alYears', yearId))
            setMessage({ type: 'success', text: `A/L Year ${yearId} deleted successfully!` })
        } catch (err) {
            console.error("Error deleting AL year:", err)
            setMessage({ type: 'danger', text: `Failed to delete: ${err.message}` })
        } finally {
            setActionLoading(false)
        }
    }

    const handleFileChange = (e) => {
        // Obsolete
    }

    const handleSaveTeacher = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const finalPhotoUrl = teacherInfo.photoUrl

            // Save to Firestore
            await setDoc(doc(db, 'settings', 'teacher'), {
                ...teacherInfo,
                photoUrl: finalPhotoUrl,
                updatedAt: new Date().toISOString()
            })

            // Update local state is already done via onChange
            setMessage({ type: 'success', text: 'Teacher profile updated successfully!' })
        } catch (err) {
            console.error("Error saving teacher info:", err)
            setMessage({ type: 'danger', text: `Failed to update: ${err.message}` })
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete the teacher profile? This will clear all data and the photo.')) return

        setActionLoading(true)
        setMessage({ type: '', text: '' })

        try {
            await deleteDoc(doc(db, 'settings', 'teacher'))
            setTeacherInfo({
                name: '',
                subjects: '',
                description: '',
                photoUrl: '',
                studentCount: '0',
                experience: '0'
            })
            setMessage({ type: 'success', text: 'Teacher profile deleted successfully!' })
        } catch (err) {
            console.error("Error deleting teacher profile:", err)
            setMessage({ type: 'danger', text: `Failed to delete: ${err.message}` })
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    return (
        <div className="animate-fade-in pb-5">
            <div className="mb-4">
                <h4 className="fw-bold mb-1">System Settings</h4>
                <p className="text-secondary mb-0">Manage system-wide configurations and teacher profile.</p>
            </div>

            {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="shadow-sm border-0 rounded-3 mb-4">
                    {message.text}
                </Alert>
            )}

            <Row className="g-4">
                {/* Teacher Profile Section */}
                <Col lg={12}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                        <div className="bg-dark p-3 text-white d-flex align-items-center gap-2">
                            <User size={20} />
                            <h6 className="mb-0">Teacher Profile Management</h6>
                        </div>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSaveTeacher}>
                                <Row className="g-4">
                                    <Col md={3} className="text-center">
                                        <div
                                            className="mb-3 mx-auto rounded-4 overflow-hidden bg-light d-flex align-items-center justify-content-center shadow-sm"
                                            style={{ width: '180px', height: '180px', border: '2px dashed #dee2e6' }}
                                        >
                                            {teacherInfo.photoUrl ? (
                                                <img src={teacherInfo.photoUrl} alt="Preview" className="w-100 h-100 object-fit-cover" />
                                            ) : (
                                                <div className="text-secondary d-flex flex-column align-items-center">
                                                    <Image size={40} className="mb-2 opacity-50" />
                                                    <small>No Photo</small>
                                                </div>
                                            )}
                                        </div>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-secondary">Photo URL / Path</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="e.g. /teacher.jpg"
                                                className="rounded-3"
                                                value={teacherInfo.photoUrl}
                                                onChange={(e) => setTeacherInfo({ ...teacherInfo, photoUrl: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={9}>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-secondary">Teacher Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Full Name"
                                                        className="rounded-3"
                                                        value={teacherInfo.name}
                                                        onChange={(e) => setTeacherInfo({ ...teacherInfo, name: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-secondary">Subjects / Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="e.g. Mathematics, Physics"
                                                        className="rounded-3"
                                                        value={teacherInfo.subjects}
                                                        onChange={(e) => setTeacherInfo({ ...teacherInfo, subjects: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-secondary">Description / Bio</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        placeholder="Short introduction about the teacher..."
                                                        className="rounded-3"
                                                        value={teacherInfo.description}
                                                        onChange={(e) => setTeacherInfo({ ...teacherInfo, description: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-secondary">Student Count</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="e.g. 500+"
                                                        className="rounded-3"
                                                        value={teacherInfo.studentCount}
                                                        onChange={(e) => setTeacherInfo({ ...teacherInfo, studentCount: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-bold text-secondary">Years Exp.</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="e.g. 10+"
                                                        className="rounded-3"
                                                        value={teacherInfo.experience}
                                                        onChange={(e) => setTeacherInfo({ ...teacherInfo, experience: e.target.value })}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="mt-4 d-flex justify-content-end gap-2">
                                            <Button
                                                variant="outline-danger"
                                                type="button"
                                                className="px-4 rounded-pill fw-bold"
                                                disabled={actionLoading || !teacherInfo.name}
                                                onClick={handleDeleteProfile}
                                            >
                                                <Trash2 size={18} className="me-2" />
                                                Delete Profile
                                            </Button>
                                            <Button
                                                variant="dark"
                                                type="submit"
                                                className="px-5 rounded-pill fw-bold"
                                                disabled={actionLoading}
                                            >
                                                {actionLoading ? <Spinner size="sm" className="me-2" /> : <Save size={18} className="me-2" />}
                                                Save Profile changes
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* A/L Years Section */}
                <Col lg={6}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                        <div className="bg-dark p-3 text-white d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <Calendar size={20} />
                                <h6 className="mb-0">A/L Years Management</h6>
                            </div>
                            <Badge bg="primary" className="rounded-pill">
                                {alYears.length} Total
                            </Badge>
                        </div>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleAddYear} className="mb-4">
                                <Form.Label className="small fw-bold text-uppercase text-secondary mb-2">Add New Year</Form.Label>
                                <InputGroup className="bg-light rounded-3 overflow-hidden border-0">
                                    <Form.Control
                                        placeholder="e.g. 2025"
                                        className="bg-transparent border-0 shadow-none py-2 px-3"
                                        value={newYear}
                                        onChange={(e) => setNewYear(e.target.value)}
                                        disabled={actionLoading}
                                    />
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="px-4 d-flex align-items-center gap-2"
                                        disabled={actionLoading || !newYear.trim()}
                                    >
                                        {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                        Add
                                    </Button>
                                </InputGroup>
                            </Form>

                            <div className="table-responsive" style={{ maxHeight: '300px' }}>
                                <Table hover className="align-middle mb-0 text-dark">
                                    <thead className="bg-light sticky-top" style={{ zIndex: 1 }}>
                                        <tr>
                                            <th className="border-0 px-3 py-2 small text-uppercase text-secondary">A/L Year</th>
                                            <th className="border-0 px-3 py-2 small text-uppercase text-secondary text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alYears.length === 0 ? (
                                            <tr>
                                                <td colSpan="2" className="text-center py-4 text-secondary italic">
                                                    No years added yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            alYears.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-3 py-2 fw-semibold">{item.year}</td>
                                                    <td className="px-3 py-2 text-end">
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            className="text-danger p-0 shadow-none"
                                                            onClick={() => handleDeleteYear(item.id)}
                                                            disabled={actionLoading}
                                                        >
                                                            <Trash2 size={18} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-light h-100 d-flex flex-column align-items-center justify-content-center opacity-75">
                        <div className="p-4 text-center ">
                            <Settings size={40} className="mb-3 text-secondary" />
                            <h6 className="fw-bold text-dark">Additional Settings</h6>
                            <p className="mb-0 text-secondary small">More system controls will appear here as they are developed.</p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ManageSettings;
