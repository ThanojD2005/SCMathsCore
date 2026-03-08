import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, InputGroup, Alert, Table, Modal, Badge } from 'react-bootstrap'
import { Search, Plus, BookOpen, User, Calendar, Loader2, Trash2, Edit2, X, Save, CheckCircle2, XCircle, Video, Radio, Link as LinkIcon, Clock } from 'lucide-react'
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const ManageClasses = () => {
    const [liveData, setLiveData] = useState([])
    const [recordData, setRecordData] = useState([])
    const [alYears, setAlYears] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Modal States
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState('add') // 'add' or 'edit'
    const [selectedClass, setSelectedClass] = useState(null)

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        alYear: '',
        teacherName: '',
        classType: 'live',
        videoLink: '',
        zoomLink: '',
        classDate: '',
        status: 'active'
    })

    useEffect(() => {
        // Fetch Live Classes
        const qLive = query(collection(db, 'liveClasses'), orderBy('createdAt', 'desc'))
        const unsubscribeLive = onSnapshot(qLive, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                _source: 'live'
            }))
            setLiveData(data)
            setLoading(false)
        }, (error) => {
            console.error("Error fetching live classes:", error)
            setLoading(false)
        })

        // Fetch Record Classes
        const qRecord = query(collection(db, 'recordClasses'), orderBy('createdAt', 'desc'))
        const unsubscribeRecord = onSnapshot(qRecord, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                _source: 'record'
            }))
            setRecordData(data)
            setLoading(false)
        }, (error) => {
            console.error("Error fetching record classes:", error)
            setLoading(false)
        })

        // Fetch AL years for dropdown
        const qYears = collection(db, 'alYears')
        const unsubscribeYears = onSnapshot(qYears, (snapshot) => {
            const yearsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => {
                // Manual sort for reliability if index is missing
                return (b.year || '').toString().localeCompare((a.year || '').toString(), undefined, { numeric: true, sensitivity: 'base' })
            })
            setAlYears(yearsData)
        }, (error) => {
            console.error("Error fetching AL years:", error)
        })

        return () => {
            unsubscribeLive()
            unsubscribeRecord()
            unsubscribeYears()
        }
    }, [])

    // Combine both collections and sort
    const classes = [...liveData, ...recordData].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const resetForm = () => {
        setFormData({
            name: '',
            alYear: '',
            teacherName: '',
            classType: 'live',
            videoLink: '',
            zoomLink: '',
            classDate: '',
            status: 'active'
        })
        setSelectedClass(null)
    }

    const handleOpenModal = (mode, classData = null) => {
        setModalMode(mode)
        if (classData) {
            setSelectedClass(classData)
            setFormData({
                name: classData.name || '',
                alYear: classData.alYear || '',
                teacherName: classData.teacherName || '',
                classType: classData.classType || 'live',
                videoLink: classData.videoLink || '',
                zoomLink: classData.zoomLink || '',
                classDate: classData.classDate || '',
                status: classData.status || 'active'
            })
        } else {
            resetForm()
        }
        setShowModal(true)
    }

    const handleAddClass = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        setMessage({ type: '', text: '' })

        // Target collection based on type
        const collectionName = formData.classType === 'live' ? 'liveClasses' : 'recordClasses'

        try {
            await addDoc(collection(db, collectionName), {
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })

            setMessage({ type: 'success', text: `New ${formData.classType} class added successfully!` })
            setShowModal(false)
            resetForm()
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to add class' })
        } finally {
            setActionLoading(false)
        }
    }

    const handleUpdateClass = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const oldType = selectedClass.classType
            const newType = formData.classType
            const oldCollection = oldType === 'live' ? 'liveClasses' : 'recordClasses'
            const newCollection = newType === 'live' ? 'liveClasses' : 'recordClasses'

            if (oldType !== newType) {
                // Moved between collections: Delete from old, Add to new
                await deleteDoc(doc(db, oldCollection, selectedClass.id))
                await addDoc(collection(db, newCollection), {
                    ...formData,
                    createdAt: selectedClass.createdAt, // Preserve original creation date
                    updatedAt: new Date().toISOString()
                })
                setMessage({ type: 'success', text: `Class updated and moved to ${newType} collection!` })
            } else {
                // Same collection: Just update
                const classRef = doc(db, newCollection, selectedClass.id)
                await updateDoc(classRef, {
                    ...formData,
                    updatedAt: new Date().toISOString()
                })
                setMessage({ type: 'success', text: 'Class updated successfully!' })
            }

            setShowModal(false)
            resetForm()
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to update class' })
        } finally {
            setActionLoading(false)
        }
    }

    const handleDeleteClass = async (id, name, type) => {
        if (!window.confirm(`Are you sure you want to delete the class "${name}"?`)) return

        setActionLoading(true)
        const collectionName = type === 'live' ? 'liveClasses' : 'recordClasses'
        try {
            await deleteDoc(doc(db, collectionName, id))
            setMessage({ type: 'success', text: 'Class deleted successfully!' })
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to delete class' })
        } finally {
            setActionLoading(false)
        }
    }

    const toggleStatus = async (id, currentStatus, type) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
        const collectionName = type === 'live' ? 'liveClasses' : 'recordClasses'
        try {
            await updateDoc(doc(db, collectionName, id), {
                status: newStatus,
                updatedAt: new Date().toISOString()
            })
        } catch (err) {
            console.error(err)
        }
    }

    const filteredClasses = classes.filter(cls =>
        (cls.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (cls.teacherName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (cls.alYear || '').includes(searchQuery)
    )

    return (
        <div className="animate-fade-in">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h4 className="fw-bold mb-1">Manage Classes</h4>
                    <p className="text-secondary mb-0">Create and oversee all academic classes.</p>
                </div>
                <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm"
                    onClick={() => handleOpenModal('add')}
                >
                    <Plus size={18} /> Add New Class
                </Button>
            </div>

            {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })} className="shadow-sm border-0 rounded-3 mb-4">
                    {message.text}
                </Alert>
            )}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="bg-white p-3 border-bottom">
                    <Row className="align-items-center g-3">
                        <Col md={6} lg={4}>
                            <InputGroup className="bg-light rounded-3 overflow-hidden border-0">
                                <InputGroup.Text className="bg-transparent border-0 ps-3">
                                    <Search size={18} className="text-secondary" />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search classes..."
                                    className="bg-transparent border-0 shadow-none py-2"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col className="text-md-end">
                            <Badge bg="light" text="dark" className="py-2 px-3 border">
                                Total: {filteredClasses.length} Classes
                            </Badge>
                        </Col>
                    </Row>
                </div>

                <div className="table-responsive">
                    <Table hover className="align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Class Details</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">A/L Year</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Type</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Status</th>
                                <th className="border-0 px-4 py-3 small text-uppercase text-secondary text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && classes.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5">
                                        <Loader2 className="animate-spin text-primary mb-2" size={32} />
                                        <p className="text-secondary mb-0">Loading classes...</p>
                                    </td>
                                </tr>
                            ) : filteredClasses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-secondary">
                                        No classes found.
                                    </td>
                                </tr>
                            ) : (
                                filteredClasses.map((cls) => (
                                    <tr key={`${cls._source}-${cls.id}`}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="p-2 bg-primary bg-opacity-10 rounded-3 text-primary">
                                                    <BookOpen size={20} />
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{cls.name}</div>
                                                    <div className="small text-secondary d-flex align-items-center gap-1">
                                                        <User size={12} /> {cls.teacherName} • <Calendar size={12} /> {cls.classDate ? new Date(cls.classDate).toLocaleDateString() : 'No Date'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge bg="light" text="dark" className="border px-2 py-1 font-monospace">
                                                {cls.alYear} A/L
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            {cls.classType === 'live' ? (
                                                <div className="d-flex align-items-center gap-1 text-danger small fw-bold">
                                                    <Radio size={14} /> LIVE
                                                </div>
                                            ) : (
                                                <div className="d-flex align-items-center gap-1 text-primary small fw-bold">
                                                    <Video size={14} /> RECORD
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="link"
                                                className="p-0 text-decoration-none shadow-none"
                                                onClick={() => toggleStatus(cls.id, cls.status, cls.classType)}
                                            >
                                                {cls.status === 'active' ? (
                                                    <Badge bg="success-subtle" text="success" className="px-2 py-1 d-flex align-items-center gap-1 border border-success">
                                                        <CheckCircle2 size={12} /> Active
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="danger-subtle" text="danger" className="px-2 py-1 d-flex align-items-center gap-1 border border-danger">
                                                        <XCircle size={12} /> Inactive
                                                    </Badge>
                                                )}
                                            </Button>
                                        </td>
                                        <td className="px-4 py-3 text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="p-2 rounded-3 border"
                                                    onClick={() => handleOpenModal('edit', cls)}
                                                >
                                                    <Edit2 size={16} className="text-info" />
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    className="p-2 rounded-3 border"
                                                    onClick={() => handleDeleteClass(cls.id, cls.name, cls.classType)}
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

            {/* Class Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
                contentClassName="border-0 shadow-lg rounded-4"
            >
                <Modal.Header className="bg-dark text-white border-0 p-4 rounded-top-4">
                    <Modal.Title className="fw-bold">
                        {modalMode === 'add' ? 'Add New Class' : 'Edit Class Details'}
                    </Modal.Title>
                    <Button variant="link" className="p-0 text-white shadow-none" onClick={() => setShowModal(false)}>
                        <X size={24} />
                    </Button>
                </Modal.Header>
                <Modal.Body className="p-4 bg-light">
                    <Form onSubmit={modalMode === 'add' ? handleAddClass : handleUpdateClass}>
                        <Row className="g-4">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Class Type</Form.Label>
                                    <div className="d-flex gap-3">
                                        <Form.Check
                                            type="radio"
                                            label="Live Class"
                                            name="classType"
                                            id="typeLive"
                                            value="live"
                                            checked={formData.classType === 'live'}
                                            onChange={handleInputChange}
                                            className="fw-semibold text-danger"
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Record Class"
                                            name="classType"
                                            id="typeRecord"
                                            value="record"
                                            checked={formData.classType === 'record'}
                                            onChange={handleInputChange}
                                            className="fw-semibold text-primary"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Class Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 2027 Theory"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">A/L Year</Form.Label>
                                    <Form.Select
                                        name="alYear"
                                        value={formData.alYear}
                                        onChange={handleInputChange}
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                    >
                                        <option value="">Select Year</option>
                                        {alYears.map(year => (
                                            <option key={year.id} value={year.year}>{year.year}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Teacher Name</Form.Label>
                                    <Form.Control
                                        name="teacherName"
                                        value={formData.teacherName}
                                        onChange={handleInputChange}
                                        placeholder="Enter teacher's name"
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Class Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="classDate"
                                        value={formData.classDate}
                                        onChange={handleInputChange}
                                        className="border-0 shadow-sm py-2 px-3"
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            {formData.classType === 'record' && (
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold text-uppercase text-primary d-flex align-items-center gap-2">
                                            <LinkIcon size={14} /> YouTube Unlisted Link
                                        </Form.Label>
                                        <Form.Control
                                            name="videoLink"
                                            value={formData.videoLink}
                                            onChange={handleInputChange}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="border-0 shadow-sm py-2 px-3"
                                            required={formData.classType === 'record'}
                                        />
                                    </Form.Group>
                                </Col>
                            )}

                            {formData.classType === 'live' && (
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="small fw-bold text-uppercase text-danger d-flex align-items-center gap-2">
                                            <LinkIcon size={14} /> Zoom Meeting Link
                                        </Form.Label>
                                        <Form.Control
                                            name="zoomLink"
                                            value={formData.zoomLink}
                                            onChange={handleInputChange}
                                            placeholder="https://zoom.us/j/..."
                                            className="border-0 shadow-sm py-2 px-3"
                                            required={formData.classType === 'live'}
                                        />
                                    </Form.Group>
                                </Col>
                            )}

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="small fw-bold text-uppercase text-secondary">Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="border-0 shadow-sm py-2 px-3"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2 mt-5">
                            <Button
                                variant="light"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-3 border"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="dark"
                                type="submit"
                                className="px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2"
                                disabled={actionLoading}
                            >
                                {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                {modalMode === 'add' ? 'Create Class' : 'Save Changes'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ManageClasses
