import { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Col, InputGroup, Alert, Table, Badge, Modal } from 'react-bootstrap'
import { Mail, Lock, UserPlus, Shield, GraduationCap, Briefcase, Loader2, Trash2, Edit2, X, Save } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, updateDoc, deleteDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db, firebaseConfig } from '../config/firebase'

const ManageAdmins = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('teacher')
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [message, setMessage] = useState({ type: '', text: '' })

    // Edit Modal States
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [editForm, setEditForm] = useState({ email: '', role: 'teacher' })

    useEffect(() => {
        const q = query(collection(db, 'admins'), orderBy('createdAt', 'desc'))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const adminData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setAdmins(adminData)
            setFetching(false)
        }, (error) => {
            console.error("Error fetching admins:", error)
            setFetching(false)
        })

        return () => unsubscribe()
    }, [])

    const handleCreateAdmin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })

        // Initialize a secondary Firebase app to create the user without logging out the current admin
        const secondaryApp = initializeApp(firebaseConfig, 'Secondary')
        const secondaryAuth = getAuth(secondaryApp)

        try {
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password)
            const newUser = userCredential.user

            // Save to 'admins' collection
            await setDoc(doc(db, 'admins', newUser.uid), {
                email,
                role,
                createdAt: new Date().toISOString()
            })

            setMessage({ type: 'success', text: `Successfully created ${role} account for ${email}` })
            setEmail('')
            setPassword('')
            setRole('teacher')
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: err.message || 'Failed to create admin account' })
        } finally {
            // Clean up the secondary app
            await secondaryApp.delete()
            setLoading(false)
        }
    }

    const handleOpenEdit = (admin) => {
        setSelectedAdmin(admin)
        setEditForm({
            email: admin.email || '',
            role: admin.role || 'teacher'
        })
        setShowEditModal(true)
    }

    const handleUpdateAdmin = async (e) => {
        e.preventDefault()
        if (!selectedAdmin) return

        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            const adminRef = doc(db, 'admins', selectedAdmin.id)
            await updateDoc(adminRef, {
                email: editForm.email,
                role: editForm.role,
                updatedAt: new Date().toISOString()
            })

            setMessage({ type: 'success', text: `Successfully updated ${editForm.email}'s details` })
            setShowEditModal(false)
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to update admin account' })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteAdmin = async (adminId, adminEmail) => {
        if (!window.confirm(`Are you sure you want to remove ${adminEmail}? This will only delete their record from the database; authentication must be revoked separately if needed.`)) return

        try {
            await deleteDoc(doc(db, 'admins', adminId))
            setMessage({ type: 'success', text: `Successfully removed staff record for ${adminEmail}` })
        } catch (err) {
            console.error(err)
            setMessage({ type: 'danger', text: 'Failed to remove staff record' })
        }
    }

    return (
        <div>
            <div className="mb-4">
                <h4 className="fw-bold">Manage Staff Accounts</h4>
                <p className="text-secondary">Create and manage accounts for Teachers, Instructors, and other Admins.</p>
            </div>

            <Row>
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                        <div className="bg-dark p-3 text-white d-flex align-items-center gap-2">
                            <UserPlus size={20} />
                            <h6 className="mb-0">Add New Staff</h6>
                        </div>
                        <Card.Body className="p-4">
                            {message.text && message.type !== 'success' && <Alert variant={message.type} className="py-2 small">{message.text}</Alert>}
                            <Form onSubmit={handleCreateAdmin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold">Email Address</Form.Label>
                                    <InputGroup size="sm">
                                        <InputGroup.Text className="bg-light border-0"><Mail size={16} /></InputGroup.Text>
                                        <Form.Control
                                            className="bg-light border-0 shadow-none text-dark"
                                            type="email"
                                            placeholder="staff@scmathscore.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-semibold">Temporary Password</Form.Label>
                                    <InputGroup size="sm">
                                        <InputGroup.Text className="bg-light border-0"><Lock size={16} /></InputGroup.Text>
                                        <Form.Control
                                            className="bg-light border-0 shadow-none text-dark"
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-semibold">Access Level / Role</Form.Label>
                                    <Form.Select
                                        size="sm"
                                        className="bg-light border-0 shadow-none"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="teacher">Teacher</option>
                                        <option value="instructor">Instructor</option>
                                        <option value="super_admin">Super Admin</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button
                                    variant="dark"
                                    className="w-100 py-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    {message.text && message.type === 'success' && (
                        <Alert variant="success" dismissible onClose={() => setMessage({ type: '', text: '' })} className="shadow-sm border-0 rounded-3 mb-4">
                            {message.text}
                        </Alert>
                    )}
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                        <div className="bg-white border-bottom p-3 d-flex align-items-center justify-content-between">
                            <h6 className="mb-0 fw-bold">Active Staff Accounts</h6>
                            <Badge bg="dark" className="rounded-pill px-3">{admins.length} Total</Badge>
                        </div>
                        <div className="table-responsive">
                            <Table hover className="align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Staff Member</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Role</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Joined</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetching ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5">
                                                <Loader2 className="animate-spin text-primary" size={32} />
                                                <p className="text-secondary mt-2 mb-0 small">Loading staff accounts...</p>
                                            </td>
                                        </tr>
                                    ) : admins.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center py-5 text-secondary">
                                                No staff accounts found.
                                            </td>
                                        </tr>
                                    ) : (
                                        admins.map((admin) => (
                                            <tr key={admin.id}>
                                                <td className="px-4 py-3">
                                                    <div className="fw-bold">{admin.email}</div>
                                                    <small className="text-secondary">ID: {admin.id.substring(0, 8)}</small>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge bg={admin.role === 'super_admin' ? 'warning' : admin.role === 'teacher' ? 'info' : 'success'} className="text-uppercase py-1 px-2">
                                                        {(admin.role || '').replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 small text-secondary">
                                                    {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 text-end">
                                                    <div className="d-flex justify-content-end gap-2">
                                                        <Button
                                                            variant="link"
                                                            className="text-info p-0 shadow-none"
                                                            onClick={() => handleOpenEdit(admin)}
                                                            title="Edit Details"
                                                        >
                                                            <Edit2 size={18} />
                                                        </Button>
                                                        <Button
                                                            variant="link"
                                                            className="text-danger p-0 shadow-none"
                                                            onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                                                            title="Delete Account"
                                                        >
                                                            <Trash2 size={18} />
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

                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="bg-white border-bottom p-3">
                            <h6 className="mb-0 fw-bold">Admin Roles Reference</h6>
                        </div>
                        <Card.Body className="p-0">
                            <Table responsive hover className="mb-0 overflow-hidden">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Role</th>
                                        <th className="border-0 px-4 py-3 small text-uppercase text-secondary">Permissions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3 align-middle">
                                            <div className="d-flex align-items-center gap-2">
                                                <Shield size={18} className="text-warning" />
                                                <span className="fw-semibold">Super Admin</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 small text-secondary">Full system access, manage staff, view revenue.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 align-middle">
                                            <div className="d-flex align-items-center gap-2">
                                                <GraduationCap size={18} className="text-info" />
                                                <span className="fw-semibold">Teacher</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 small text-secondary">Manage students, create and edit courses.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 align-middle">
                                            <div className="d-flex align-items-center gap-2">
                                                <Briefcase size={18} className="text-success" />
                                                <span className="fw-semibold">Instructor</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 small text-secondary">View students, manage assigned courses.</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Edit Modal */}
            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                centered
                contentClassName="border-0 shadow-lg rounded-4"
            >
                <Modal.Header className="bg-dark text-white border-0 p-4 rounded-top-4">
                    <Modal.Title className="fw-bold">Edit Staff Member</Modal.Title>
                    <Button variant="link" className="p-0 text-white shadow-none" onClick={() => setShowEditModal(false)}>
                        <X size={24} />
                    </Button>
                </Modal.Header>
                <Modal.Body className="p-4 bg-light">
                    <Form onSubmit={handleUpdateAdmin}>
                        <Form.Group className="mb-3">
                            <Form.Label className="small fw-bold text-uppercase text-secondary">Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className="border-0 shadow-sm py-2 px-3"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="small fw-bold text-uppercase text-secondary">Access Level / Role</Form.Label>
                            <Form.Select
                                value={editForm.role}
                                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                className="border-0 shadow-sm py-2 px-3"
                                required
                            >
                                <option value="teacher">Teacher</option>
                                <option value="instructor">Instructor</option>
                                <option value="super_admin">Super Admin</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <Button
                                variant="light"
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 rounded-3 border"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="dark"
                                type="submit"
                                className="px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ManageAdmins
