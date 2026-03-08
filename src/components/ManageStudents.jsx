import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, InputGroup, Alert, Table, Modal, Badge } from 'react-bootstrap'
import { Search, UserPlus, Mail, Phone, MapPin, Loader2, Trash2, Edit2, Eye, X, Save, Download, ShieldCheck, ShieldAlert, CheckCircle } from 'lucide-react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { db, firebaseConfig } from '../config/firebase'

const ManageStudents = () => {
    const [students, setStudents] = useState([])
    const [alYears, setAlYears] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filterYear, setFilterYear] = useState('')
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [pdfGenerating, setPdfGenerating] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Modal States
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState('add') // 'add', 'edit', 'view'
    const [selectedStudent, setSelectedStudent] = useState(null)

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        primaryPhone: '',
        email: '',
        address: '',
        secondaryPhone: '',
        alYear: '',
        password: ''
    })

    useEffect(() => {
        // Fetch students
        const qStudents = query(collection(db, 'students'), orderBy('createdAt', 'desc'))
        const unsubscribeStudents = onSnapshot(qStudents, (snapshot) => {
            const studentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setStudents(studentsData)
            setLoading(false)
        }, (error) => {
            console.error("Error fetching students:", error)
            setMessage({ type: 'danger', text: 'Failed to load students data.' })
            setLoading(false)
        })

        // Fetch AL years
        const qYears = query(collection(db, 'alYears'), orderBy('year', 'desc'))
        const unsubscribeYears = onSnapshot(qYears, (snapshot) => {
            const yearsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setAlYears(yearsData)
        }, (error) => {
            console.error("Error fetching AL years:", error)
        })

        return () => {
            unsubscribeStudents()
            unsubscribeYears()
        }
    }, [])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            primaryPhone: '',
            email: '',
            address: '',
            secondaryPhone: '',
            alYear: '',
            password: ''
        })
        setSelectedStudent(null)
    }

    const handleOpenModal = (mode, student = null) => {
        setModalMode(mode)
        if (student) {
            setSelectedStudent(student)
            setFormData({
                firstName: student.firstName || '',
                lastName: student.lastName || '',
                primaryPhone: student.primaryPhone || '',
                email: student.email || '',
                address: student.address || '',
                secondaryPhone: student.secondaryPhone || '',
                alYear: student.alYear || '',
                password: '' // Don't show password
            })
        } else {
            resetForm()
        }
        setShowModal(true)
    }

    const handleAddStudent = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        setMessage({ type: '', text: '' })

        const secondaryApp = initializeApp(firebaseConfig, 'SecondaryStudent')
        const secondaryAuth = getAuth(secondaryApp)
        const authEmail = `${formData.primaryPhone.replace(/\s+/g, '')}@lms.local`

        try {
            // Create Auth Account
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, authEmail, formData.password)
            const user = userCredential.user

            // Create Firestore Document
            await setDoc(doc(db, 'students', user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                primaryPhone: formData.primaryPhone,
                email: formData.email,
                address: formData.address,
                secondaryPhone: formData.secondaryPhone || '',
                alYear: formData.alYear,
                role: 'student',
                createdAt: new Date().toISOString()
            })

            setMessage({ type: 'success', text: 'Student account created successfully!' })
            setShowModal(false)
            resetForm()
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: err.message || 'Failed to create student account' })
        } finally {
            await secondaryApp.delete()
            setActionLoading(false)
        }
    }

    const handleUpdateStudent = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const studentRef = doc(db, 'students', selectedStudent.id)
            await updateDoc(studentRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                primaryPhone: formData.primaryPhone,
                email: formData.email,
                address: formData.address,
                secondaryPhone: formData.secondaryPhone || '',
                alYear: formData.alYear,
                updatedAt: new Date().toISOString()
            })

            setMessage({ type: 'success', text: 'Student details updated successfully!' })
            setShowModal(false)
            resetForm()
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to update student details' })
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteStudent = async (studentId) => {
        if (!window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) return

        setActionLoading(true)
        try {
            await deleteDoc(doc(db, 'students', studentId))
            setMessage({ type: 'success', text: 'Student deleted successfully!' })
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to delete student record' })
        } finally {
            setActionLoading(false)
        }
    }

    const handleVerifyStudent = async (studentId, currentStatus) => {
        const newStatus = currentStatus === 'verified' ? 'pending' : 'verified'
        const isVerified = newStatus === 'verified'

        setActionLoading(true)
        try {
            await updateDoc(doc(db, 'students', studentId), {
                status: newStatus,
                isVerified: isVerified,
                verifiedAt: isVerified ? new Date().toISOString() : null
            })
            setMessage({ type: 'success', text: `Student ${newStatus === 'verified' ? 'verified' : 'set to pending'} successfully!` })
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to update verification status' })
        } finally {
            setActionLoading(false)
        }
    }

    const filteredStudents = students.filter(student => {
        const matchesSearch = (student.firstName + ' ' + student.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.primaryPhone?.includes(searchQuery)

        const matchesFilter = !filterYear || student.alYear === filterYear

        return matchesSearch && matchesFilter
    })

    const handleDownloadPDF = () => {
        try {
            setPdfGenerating(true)
            const doc = new jsPDF()

            // Add Header
            doc.setFontSize(20)
            doc.setTextColor(33, 37, 41)
            doc.text('SCMathsCore - Students Enrollment Report', 14, 20)

            doc.setFontSize(10)
            doc.setTextColor(110)
            doc.text(`Report generated on: ${new Date().toLocaleString()}`, 14, 28)

            if (filterYear) {
                doc.text(`Filtering by Year: ${filterYear}`, 14, 34)
            } else {
                doc.text('Showing all A/L Years', 14, 34)
            }

            const tableColumn = ["Full Name", "Email Address", "Primary Phone", "A/L Year", "Enrollment Date"]
            const tableRows = filteredStudents.map(student => [
                `${student.firstName} ${student.lastName}`,
                student.email || 'N/A',
                student.primaryPhone || 'N/A',
                student.alYear ? `${student.alYear} A/L` : 'N/A',
                student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'
            ])

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 40,
                styles: { fontSize: 9, cellPadding: 3 },
                headStyles: { fillColor: [33, 37, 41], textColor: [255, 255, 255], fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [248, 249, 250] },
                margin: { top: 40 },
                didDrawPage: (data) => {
                    // Footer
                    const str = "Page " + doc.internal.getNumberOfPages()
                    doc.setFontSize(8)
                    const pageSize = doc.internal.pageSize
                    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                    doc.text(str, data.settings.margin.left, pageHeight - 10)
                }
            })

            doc.save(`SCMathsCore_Report_${new Date().toISOString().split('T')[0]}.pdf`)
            setMessage({ type: 'success', text: 'PDF report downloaded successfully!' })
        } catch (error) {
            console.error("PDF Generation Error:", error)
            setMessage({ type: 'danger', text: 'Failed to generate PDF. Please try again.' })
        } finally {
            setPdfGenerating(false)
        }
    }

    return (
        <div className="animate-fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Manage Students</h4>
                    <p className="text-secondary mb-0">View, add, edit and manage all student accounts.</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Button
                        variant="dark"
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
                        onClick={handleDownloadPDF}
                        disabled={loading || pdfGenerating || filteredStudents.length === 0}
                    >
                        {pdfGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        Export Report
                    </Button>
                    <Button
                        variant="primary"
                        className="d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm"
                        onClick={() => handleOpenModal('add')}
                    >
                        <UserPlus size={18} /> Add New Student
                    </Button>
                </div>
            </div>

            {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="shadow-sm border-0 rounded-3 mb-4">
                    {message.text}
                </Alert>
            )}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="bg-white p-3 border-bottom">
                    <Row className="align-items-center g-3">
                        <Col md={4} lg={4}>
                            <InputGroup className="bg-light rounded-3 overflow-hidden border-0">
                                <InputGroup.Text className="bg-transparent border-0 ps-3">
                                    <Search size={18} className="text-secondary" />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search student..."
                                    className="bg-transparent border-0 shadow-none py-2"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={3} lg={2}>
                            <Form.Select
                                className="bg-light border-0 rounded-3 py-2 shadow-none"
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                            >
                                <option value="">All Years</option>
                                {alYears.map(year => (
                                    <option key={year.id} value={year.year}>{year.year} A/L</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col className="text-md-end">
                            <Badge bg="light" text="dark" className="py-2 px-3 border">
                                Total: {filteredStudents.length} Students
                            </Badge>
                        </Col>
                    </Row>
                </div>

                <div className="table-responsive">
                    <Table hover className="align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Student Name</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Contact Info</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Status</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Joined Date</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <Loader2 className="animate-spin text-primary mb-2" size={32} />
                                        <p className="text-secondary mb-0">Loading students...</p>
                                    </td>
                                </tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-secondary">
                                        No students found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-4 py-3">
                                            <div className="fw-bold">{student.firstName} {student.lastName}</div>
                                            <div className="d-flex align-items-center gap-2">
                                                <small className="text-secondary">{student.id.substring(0, 8)}...</small>
                                                {student.alYear && <Badge bg="light" text="dark" className="border small px-2 py-1">{student.alYear} A/L</Badge>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="d-flex flex-column gap-1">
                                                <div className="d-flex align-items-center gap-2 small">
                                                    <Mail size={14} className="text-secondary" /> {student.email}
                                                </div>
                                                <div className="d-flex align-items-center gap-2 small">
                                                    <Phone size={14} className="text-secondary" /> {student.primaryPhone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {student.status === 'verified' ? (
                                                <Badge bg="success-subtle" className="text-success border border-success-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                                                    <ShieldCheck size={14} /> Verified
                                                </Badge>
                                            ) : (
                                                <Badge bg="warning-subtle" className="text-warning border border-warning-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                                                    <ShieldAlert size={14} /> Pending
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 small text-secondary">
                                            {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Button
                                                    variant={student.status === 'verified' ? "light" : "success"}
                                                    size="sm"
                                                    className={`p-2 rounded-3 border ${student.status !== 'verified' ? 'text-white' : ''}`}
                                                    onClick={() => handleVerifyStudent(student.id, student.status)}
                                                    title={student.status === 'verified' ? "Unverify Student" : "Verify Student"}
                                                    disabled={actionLoading}
                                                >
                                                    {student.status === 'verified' ? <ShieldAlert size={16} /> : <CheckCircle size={16} />}
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="p-2 rounded-3 border"
                                                    onClick={() => handleOpenModal('view', student)}
                                                    title="View Details"
                                                >
                                                    <Eye size={16} className="text-primary" />
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="p-2 rounded-3 border"
                                                    onClick={() => handleOpenModal('edit', student)}
                                                    title="Edit Details"
                                                >
                                                    <Edit2 size={16} className="text-info" />
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="p-2 rounded-3 border"
                                                    onClick={() => handleDeleteStudent(student.id)}
                                                    title="Delete Student"
                                                >
                                                    <Trash2 size={16} className="text-danger" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {/* Add/Edit/View Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
                contentClassName="border-0 shadow-lg rounded-4"
            >
                <Modal.Header className="bg-dark text-white border-0 p-4 rounded-top-4">
                    <Modal.Title className="fw-bold">
                        {modalMode === 'add' ? 'Add New Student' : modalMode === 'edit' ? 'Edit Student Details' : 'Student Information'}
                    </Modal.Title>
                    <Button variant="link" className="p-0 text-white shadow-none" onClick={() => setShowModal(false)}>
                        <X size={24} />
                    </Button>
                </Modal.Header>
                <Modal.Body className="p-4 bg-light">
                    <Form onSubmit={modalMode === 'add' ? handleAddStudent : handleUpdateStudent}>
                        <Row className="g-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">First Name</Form.Label>
                                    <Form.Control
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                        disabled={modalMode === 'view'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Last Name</Form.Label>
                                    <Form.Control
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                        disabled={modalMode === 'view'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Primary Phone</Form.Label>
                                    <Form.Control
                                        name="primaryPhone"
                                        value={formData.primaryPhone}
                                        onChange={handleInputChange}
                                        placeholder="07XXXXXXXX"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                        disabled={modalMode === 'view'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Secondary Phone (Optional)</Form.Label>
                                    <Form.Control
                                        name="secondaryPhone"
                                        value={formData.secondaryPhone}
                                        onChange={handleInputChange}
                                        placeholder="07XXXXXXXX"
                                        className="border-0 shadow-sm py-2 px-3"
                                        disabled={modalMode === 'view'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Email Address</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="student@example.com"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                        disabled={modalMode === 'view'}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">A/L Year</Form.Label>
                                    <Form.Select
                                        name="alYear"
                                        value={formData.alYear}
                                        onChange={handleInputChange}
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                        disabled={modalMode === 'view'}
                                    >
                                        <option value="">Select A/L Year</option>
                                        {alYears.map(year => (
                                            <option key={year.id} value={year.year}>{year.year}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        as="textarea"
                                        rows={3}
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter full address"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                        disabled={modalMode === 'view'}
                                    />
                                </Form.Group>
                            </Col>
                            {modalMode === 'add' && (
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold text-uppercase text-secondary">Login Password</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className="border-0 shadow-sm py-2 px-3"
                                            required
                                        />
                                        <Form.Text className="text-muted small">This will be the student's initial password.</Form.Text>
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-5">
                            <Button
                                variant="light"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-3 border"
                            >
                                {modalMode === 'view' ? 'Close' : 'Cancel'}
                            </Button>
                            {modalMode !== 'view' && (
                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2"
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    {modalMode === 'add' ? 'Create Student' : 'Save Changes'}
                                </Button>
                            )}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ManageStudents
