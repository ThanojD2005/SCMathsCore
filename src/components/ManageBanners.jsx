import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Table, Badge, Spinner, Alert, Modal } from 'react-bootstrap';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const ManageBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newBanner, setNewBanner] = useState({
        title: '',
        imageUrl: '',
        link: '',
        isActive: true,
        order: 0
    });

    // Edit State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editBanner, setEditBanner] = useState(null);
    const [editSelectedFile, setEditSelectedFile] = useState(null);
    const [savingEdit, setSavingEdit] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'banners'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const bannerData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBanners(bannerData);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching banners:", err);
            setError("Failed to load banners.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!newBanner.imageUrl) {
            setError('Please provide an image URL/path.');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        try {
            // Save banner metadata to Firestore directly without local server upload
            await addDoc(collection(db, 'banners'), {
                title: newBanner.title || 'Untitled Banner',
                imageUrl: newBanner.imageUrl,
                link: newBanner.link || '',
                isActive: newBanner.isActive,
                order: Number(newBanner.order) || banners.length,
                createdAt: new Date().toISOString()
            });

            setSuccess('Banner added successfully!');
            setNewBanner({ title: '', imageUrl: '', link: '', isActive: true, order: banners.length + 1 });

        } catch (err) {
            console.error('Save Error:', err);
            setError(err.message || 'An error occurred while saving.');
        } finally {
            setUploading(false);
        }
    };

    const toggleActive = async (bannerId, currentStatus) => {
        try {
            await updateDoc(doc(db, 'banners', bannerId), {
                isActive: !currentStatus
            });
        } catch (err) {
            console.error("Error toggling status:", err);
            setError("Failed to update status.");
        }
    };

    const deleteBanner = async (bannerId) => {
        if (window.confirm('Are you sure you want to delete this banner? This cannot be undone.')) {
            try {
                await deleteDoc(doc(db, 'banners', bannerId));
                setSuccess('Banner deleted successfully.');
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                console.error("Error deleting banner:", err);
                setError("Failed to delete banner.");
            }
        }
    };

    // --- Edit Handlers ---
    const handleEditClick = (banner) => {
        setEditBanner({ ...banner });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setSavingEdit(true);
        setError('');
        setSuccess('');

        try {
            const imageUrl = editBanner.imageUrl;

            // Update metadata in Firestore
            await updateDoc(doc(db, 'banners', editBanner.id), {
                title: editBanner.title || 'Untitled Banner',
                imageUrl: imageUrl,
                link: editBanner.link || '',
                isActive: editBanner.isActive,
                order: Number(editBanner.order) || 0
            });

            setSuccess('Banner updated successfully!');
            setShowEditModal(false);
            setEditBanner(null);
            setEditSelectedFile(null);

        } catch (err) {
            console.error('Update Error:', err);
            setError(err.message || 'Failed to update banner.');
        } finally {
            setSavingEdit(false);
        }
    };

    return (
        <div>
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <ImageIcon size={24} className="text-primary" /> Manage Promotional Banners
            </h4>

            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

            <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                    <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                        <Plus size={18} className="text-primary" /> Add New Banner
                    </h6>
                    <Form onSubmit={handleUploadSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="small fw-semibold text-secondary">Image URL / Path (Required)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="E.g., /banners/revision-class.jpg"
                                        value={newBanner.imageUrl}
                                        onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                                        required
                                    />
                                    <Form.Text className="text-muted small fw-medium">
                                        Place images in <code>public/banners/</code> and use <code>/banners/your-image.jpg</code>
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group>
                                    <Form.Label className="small fw-semibold text-secondary">Display Title (Optional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="E.g., Special Exam Revision"
                                        value={newBanner.title}
                                        onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-5">
                                <Form.Group>
                                    <Form.Label className="small fw-semibold text-secondary">Target Link (Optional)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="https://scmathscore.com/special-class"
                                        value={newBanner.link}
                                        onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-3">
                                <Form.Group>
                                    <Form.Label className="small fw-semibold text-secondary">Sort Order</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        value={newBanner.order}
                                        onChange={(e) => setNewBanner({ ...newBanner, order: e.target.value })}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4 d-flex align-items-end">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 fw-medium d-flex align-items-center justify-content-center gap-2"
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <><Spinner size="sm" animation="border" /> Saving...</>
                                    ) : (
                                        <><Plus size={18} /> Add Banner</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="px-4 py-3 text-secondary small fw-semibold border-bottom-0">Preview</th>
                                    <th className="py-3 text-secondary small fw-semibold border-bottom-0">Title & Info</th>
                                    <th className="py-3 text-secondary small fw-semibold border-bottom-0 text-center">Order</th>
                                    <th className="py-3 text-secondary small fw-semibold border-bottom-0 text-center">Status</th>
                                    <th className="px-4 py-3 text-secondary small fw-semibold border-bottom-0 text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <Spinner animation="border" variant="primary" size="sm" />
                                            <p className="mt-2 text-secondary small mb-0">Loading banners...</p>
                                        </td>
                                    </tr>
                                ) : banners.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-secondary">
                                            No custom banners found. Default local banners are shown to students.
                                        </td>
                                    </tr>
                                ) : (
                                    banners.map((banner) => (
                                        <tr key={banner.id}>
                                            <td className="px-4 py-3" style={{ width: '150px' }}>
                                                <div
                                                    className="rounded flex-shrink-0"
                                                    style={{
                                                        width: '120px',
                                                        height: '60px',
                                                        backgroundImage: `url(${banner.imageUrl})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        border: '1px solid #dee2e6'
                                                    }}
                                                />
                                            </td>
                                            <td className="py-3">
                                                <div className="fw-medium text-dark">{banner.title}</div>
                                                <div className="text-secondary small text-truncate" style={{ maxWidth: '250px' }}>
                                                    {banner.link ? <a href={banner.link} target="_blank" rel="noreferrer">{banner.link}</a> : 'No link set'}
                                                </div>
                                            </td>
                                            <td className="py-3 text-center">
                                                <span className="badge bg-secondary">{banner.order}</span>
                                            </td>
                                            <td className="py-3 text-center">
                                                {banner.isActive ? (
                                                    <Badge bg="success-subtle" className="text-success border border-success-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                                                        <CheckCircle size={14} /> Active
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="secondary-subtle" className="text-secondary border border-secondary-subtle px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1">
                                                        <XCircle size={14} /> Hidden
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-end">
                                                <div className="d-flex align-items-center justify-content-end gap-2">
                                                    <Button
                                                        variant={banner.isActive ? "outline-secondary" : "outline-success"}
                                                        size="sm"
                                                        onClick={() => toggleActive(banner.id, banner.isActive)}
                                                        title={banner.isActive ? "Hide from dashboard" : "Show on dashboard"}
                                                    >
                                                        {banner.isActive ? 'Hide' : 'Show'}
                                                    </Button>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => handleEditClick(banner)}
                                                        title="Edit details"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"

                                                        onClick={() => deleteBanner(banner.id)}
                                                        title="Delete permanently"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            {/* Edit Banner Modal */}
            <Modal show={showEditModal} onHide={() => !savingEdit && setShowEditModal(false)} centered>
                <Modal.Header closeButton={!savingEdit}>
                    <Modal.Title className="h5 fw-bold d-flex align-items-center gap-2">
                        <Edit2 size={20} className="text-primary" /> Edit Banner
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        {editBanner && (
                            <div className="row g-3">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <p className="small text-secondary mb-1">Current Image</p>
                                        <div
                                            className="rounded border"
                                            style={{
                                                width: '100%',
                                                height: '100px',
                                                backgroundImage: `url(${editBanner.imageUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        />
                                    </div>
                                    <Form.Group>
                                        <Form.Label className="small fw-semibold text-secondary">Image URL / Path</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editBanner.imageUrl}
                                            onChange={(e) => setEditBanner({ ...editBanner, imageUrl: e.target.value })}
                                            required
                                        />
                                        <Form.Text className="text-muted small">Update the path to the image in the public folder.</Form.Text>
                                    </Form.Group>
                                </div>
                                <div className="col-12">
                                    <Form.Group>
                                        <Form.Label className="small fw-semibold text-secondary">Display Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editBanner.title}
                                            onChange={(e) => setEditBanner({ ...editBanner, title: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-12">
                                    <Form.Group>
                                        <Form.Label className="small fw-semibold text-secondary">Target Link</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={editBanner.link}
                                            onChange={(e) => setEditBanner({ ...editBanner, link: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6">
                                    <Form.Group>
                                        <Form.Label className="small fw-semibold text-secondary">Sort Order</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="0"
                                            value={editBanner.order}
                                            onChange={(e) => setEditBanner({ ...editBanner, order: e.target.value })}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-6 d-flex align-items-end">
                                    <Form.Check
                                        type="switch"
                                        id="edit-active-switch"
                                        label={editBanner.isActive ? "Active (Visible)" : "Hidden"}
                                        checked={editBanner.isActive}
                                        onChange={(e) => setEditBanner({ ...editBanner, isActive: e.target.checked })}
                                        className="mb-2"
                                    />
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)} disabled={savingEdit}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={savingEdit}>
                            {savingEdit ? <><Spinner size="sm" animation="border" /> Saving...</> : 'Save Changes'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageBanners;
