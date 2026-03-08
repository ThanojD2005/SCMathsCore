import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, InputGroup, Alert, Table, Badge } from 'react-bootstrap'
import { Search, Plus, User, Calendar, Loader2, Trash2, Save, X } from 'lucide-react'
import { collection, onSnapshot, doc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'

const ManageEnrollments = () => {
    const [enrollments, setEnrollments] = useState([])
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Form States
    const [selectedStudent, setSelectedStudent] = useState('')
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().substring(0, 7))
    const [selectedMonths, setSelectedMonths] = useState([])

    // Filter States
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        // Fetch Enrollment
        const qEnrollments = query(collection(db, 'enrollment'), orderBy('createdAt', 'desc'))
        const unsubscribeEnrollments = onSnapshot(qEnrollments, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setEnrollments(data)
            setLoading(false)
        }, (error) => {
            console.error("Error fetching enrollment:", error)
            setLoading(false)
        })

        // Fetch Students
        const qStudents = query(collection(db, 'students'), orderBy('firstName', 'asc'))
        const unsubscribeStudents = onSnapshot(qStudents, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                fullName: `${doc.data().firstName} ${doc.data().lastName}`,
                ...doc.data()
            }))
            setStudents(data)
        })

        return () => {
            unsubscribeEnrollments()
            unsubscribeStudents()
        }
    }, [])

    const handleAddMonth = () => {
        if (!currentMonth) return
        if (selectedMonths.includes(currentMonth)) {
            setMessage({ type: 'warning', text: 'This month is already added to the list.' })
            return
        }
        setSelectedMonths([...selectedMonths, currentMonth].sort())
        setMessage({ type: '', text: '' })
    }

    const handleRemoveMonth = (month) => {
        setSelectedMonths(selectedMonths.filter(m => m !== month))
    }

    const handleEnroll = async (e) => {
        e.preventDefault()
        if (!selectedStudent || selectedMonths.length === 0) {
            setMessage({ type: 'danger', text: 'Please select a student and at least one month.' })
            return
        }

        setActionLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const student = students.find(s => s.id === selectedStudent)
            let successCount = 0
            let skipCount = 0

            for (const month of selectedMonths) {
                // Check if already enrolled for this month
                const alreadyEnrolled = enrollments.some(e =>
                    e.studentId === selectedStudent &&
                    e.enrolledMonth === month
                )

                if (alreadyEnrolled) {
                    skipCount++
                    continue
                }

                await addDoc(collection(db, 'enrollment'), {
                    studentId: selectedStudent,
                    studentName: student.fullName,
                    alYear: student.alYear || 'N/A',
                    enrolledMonth: month,
                    createdAt: new Date().toISOString()
                })
                successCount++
            }

            let responseMsg = `Enrollment completed. ${successCount} month(s) added.`
            if (skipCount > 0) responseMsg += ` ${skipCount} month(s) were already enrolled and skipped.`

            setMessage({ type: successCount > 0 ? 'success' : 'warning', text: responseMsg })

            if (successCount > 0) {
                setSelectedStudent('')
                setSelectedMonths([])
            }
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to enroll student' })
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteEnrollment = async (id) => {
        if (!window.confirm('Are you sure you want to remove this enrollment?')) return

        try {
            await deleteDoc(doc(db, 'enrollment', id))
            setMessage({ type: 'success', text: 'Enrollment removed successfully!' })
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to remove enrollment' })
        }
    }

    const filteredEnrollments = enrollments.filter(e =>
        e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.alYear && e.alYear.toLowerCase().includes(searchQuery.toLowerCase())) ||
        e.enrolledMonth.includes(searchQuery)
    )

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const formatMonth = (monthStr) => {
        if (!monthStr) return 'N/A'
        const [year, month] = monthStr.split('-')
        return `${months[parseInt(month) - 1]} ${year}`
    }

    return (
        <div className="animate-fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Student Enrollment</h4>
                    <p className="text-secondary mb-0">Enroll students to academic contents by month.</p>
                </div>
            </div>

            {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="shadow-sm border-0 rounded-3 mb-4">
                    {message.text}
                </Alert>
            )}

            <Row className="g-4">
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100">
                        <div className="bg-dark p-3 text-white">
                            <div className="d-flex align-items-center gap-2">
                                <Plus size={20} />
                                <h6 className="mb-0">New Enrollment</h6>
                            </div>
                        </div>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleEnroll}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Select Student</Form.Label>
                                    <Form.Select
                                        value={selectedStudent}
                                        onChange={(e) => setSelectedStudent(e.target.value)}
                                        className="border-0 bg-light py-2 shadow-none"
                                        required
                                    >
                                        <option value="">-- Select Student --</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>{s.fullName} ({s.primaryPhone}) - {s.alYear} A/L</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Select Months</Form.Label>
                                    <div className="d-flex gap-2 mb-2">
                                        <Form.Control
                                            type="month"
                                            value={currentMonth}
                                            onChange={(e) => setCurrentMonth(e.target.value)}
                                            className="border-0 bg-light py-2 shadow-none"
                                        />
                                        <Button variant="outline-dark" onClick={handleAddMonth}>Add</Button>
                                    </div>

                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {selectedMonths.map(month => (
                                            <Badge key={month} bg="primary" className="p-2 d-flex align-items-center gap-2">
                                                {formatMonth(month)}
                                                <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveMonth(month)} />
                                            </Badge>
                                        ))}
                                        {selectedMonths.length === 0 && <small className="text-secondary">No months selected yet.</small>}
                                    </div>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm mt-4"
                                    disabled={actionLoading || selectedMonths.length === 0}
                                >
                                    {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Enroll Student
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100">
                        <div className="bg-white p-3 border-bottom">
                            <Row className="align-items-center g-3">
                                <Col md={6}>
                                    <InputGroup className="bg-light rounded-3 overflow-hidden border-0">
                                        <InputGroup.Text className="bg-transparent border-0 ps-3">
                                            <Search size={18} className="text-secondary" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            placeholder="Search enrollments..."
                                            className="bg-transparent border-0 shadow-none py-2"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col className="text-md-end">
                                    <Badge bg="light" text="dark" className="py-2 px-3 border">
                                        Total: {filteredEnrollments.length} Enrollments
                                    </Badge>
                                </Col>
                            </Row>
                        </div>

                        <div className="table-responsive">
                            <Table hover className="align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Student</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">A/L Year</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Month</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary text-end">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5">
                                                <Loader2 className="animate-spin text-primary mb-2" size={32} />
                                                <p className="text-secondary mb-0">Loading enrollments...</p>
                                            </td>
                                        </tr>
                                    ) : filteredEnrollments.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5 text-secondary">
                                                No enrollments found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredEnrollments.map((enroll) => (
                                            <tr key={enroll.id}>
                                                <td className="px-4 py-3">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <User size={16} className="text-secondary" />
                                                        <div className="fw-semibold">{enroll.studentName}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge bg="light" text="dark" className="border px-2 py-1">
                                                        {enroll.alYear} A/L
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge bg="info-subtle" text="info" className="px-2 py-1 border border-info">
                                                        <Calendar size={12} className="me-1" />
                                                        {formatMonth(enroll.enrolledMonth)}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-end">
                                                    <Button
                                                        variant="light"
                                                        size="sm"
                                                        className="text-danger p-2 rounded-3 border"
                                                        onClick={() => handleDeleteEnrollment(enroll.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ManageEnrollments
