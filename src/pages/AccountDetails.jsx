import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { User, ChevronLeft, Mail, Phone, MapPin, UserCheck, Edit2, Save, X, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const AccountDetails = ({ user, userData }) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        address: userData?.address || '',
        gender: userData?.gender || '',
    });

    const studentName = `${formData.firstName} ${formData.lastName}`.trim() || 'Student Name';

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
        setMessage({ type: '', text: '' });
        if (!isEditing) {
            setFormData({
                firstName: userData?.firstName || '',
                lastName: userData?.lastName || '',
                address: userData?.address || '',
                gender: userData?.gender || '',
            });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const docRef = doc(db, 'students', user.uid);
            await updateDoc(docRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                gender: formData.gender,
            });

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
            // Note: In a real app, you might want to trigger a data refresh in the parent component
            // For now, we update the local state which handles the display
        } catch (error) {
            console.error('Update error:', error);
            setMessage({ type: 'danger', text: 'Failed to update profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <PageLoader />;
    }

    return (
        <Container fluid className="p-4" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="dashboard-header-gradient mb-4">
                <div className="d-flex align-items-center gap-3">
                    <Button
                        variant="link"
                        className="p-0 text-white"
                        onClick={() => navigate('/')}
                    >
                        <ChevronLeft size={32} />
                    </Button>
                    <h1
                        className="m-0 fw-bold"
                        style={{ fontSize: '2.5rem', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        SCMathsCore
                    </h1>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <span className="fs-4 fw-semibold text-white">{studentName}</span>
                    <div className="user-profile-circle">
                        <User size={28} />
                    </div>
                </div>
            </div>

            <div className="max-width-container mx-auto" style={{ maxWidth: '800px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0 text-white" style={{ fontSize: '2.5rem' }}>Account Details</h2>
                    {!isEditing && (
                        <Button
                            variant="primary"
                            className="rounded-pill px-4 py-2 fw-bold d-flex align-items-center gap-2"
                            style={{ backgroundColor: 'var(--accent-blue)', border: 'none' }}
                            onClick={handleToggleEdit}
                        >
                            <Edit2 size={18} /> Edit Profile
                        </Button>
                    )}
                </div>

                {message.text && (
                    <Alert variant={message.type} className="rounded-4 mb-4 fw-semibold">
                        {message.text}
                    </Alert>
                )}

                <div className="class-card p-5 border-0">
                    <Form onSubmit={handleSave}>
                        <Row className="g-4">
                            <Col md={6}>
                                <div className="info-item">
                                    <div className="info-label d-flex align-items-center gap-2 mb-2 text-secondary fw-semibold small text-uppercase">
                                        <UserCheck size={18} className="text-primary" /> First Name
                                    </div>
                                    {isEditing ? (
                                        <Form.Control
                                            type="text"
                                            className="custom-form-control rounded-3"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    ) : (
                                        <div className="info-value text-white fs-5">{formData.firstName || 'Not provided'}</div>
                                    )}
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="info-item">
                                    <div className="info-label d-flex align-items-center gap-2 mb-2 text-secondary fw-semibold small text-uppercase">
                                        <UserCheck size={18} className="text-primary" /> Last Name
                                    </div>
                                    {isEditing ? (
                                        <Form.Control
                                            type="text"
                                            className="custom-form-control rounded-3"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    ) : (
                                        <div className="info-value text-white fs-5">{formData.lastName || 'Not provided'}</div>
                                    )}
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="info-item">
                                    <div className="info-label d-flex align-items-center gap-2 mb-2 text-secondary fw-semibold small text-uppercase">
                                        <Mail size={18} className="text-primary" /> Email Address (Primary)
                                    </div>
                                    <div className="info-value text-white fs-5">{user?.email}</div>
                                    {isEditing && <small className="text-secondary opacity-75">Email cannot be changed here.</small>}
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="info-item pt-3 border-top border-secondary border-opacity-25">
                                    <div className="info-label d-flex align-items-center gap-2 mb-2 text-secondary fw-semibold small text-uppercase">
                                        <Phone size={18} className="text-primary" /> Primary Phone
                                    </div>
                                    <div className="info-value text-white fs-5">{userData?.primaryPhone || 'Not provided'}</div>
                                    {isEditing && <small className="text-danger fw-bold">Primary phone number cannot be changed.</small>}
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="info-item pt-3 border-top border-secondary border-opacity-25">
                                    <div className="info-label d-flex align-items-center gap-2 mb-2 text-secondary fw-semibold small text-uppercase">
                                        <User size={18} className="text-primary" /> Gender
                                    </div>
                                    {isEditing ? (
                                        <Form.Select
                                            className="custom-form-control rounded-3"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            required
                                        >
                                            <option value="" className="text-dark">Select Gender</option>
                                            <option value="Male" className="text-dark">Male</option>
                                            <option value="Female" className="text-dark">Female</option>
                                        </Form.Select>
                                    ) : (
                                        <div className="info-value text-white fs-5">{formData.gender || 'Not specified'}</div>
                                    )}
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="info-item pt-3 border-top border-secondary border-opacity-25">
                                    <div className="info-label d-flex align-items-center gap-2 mb-2 text-secondary fw-semibold small text-uppercase">
                                        <MapPin size={18} className="text-primary" /> Address
                                    </div>
                                    {isEditing ? (
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            className="custom-form-control rounded-3"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    ) : (
                                        <div className="info-value text-white fs-5">{formData.address || 'Not provided'}</div>
                                    )}
                                </div>
                            </Col>
                        </Row>

                        {isEditing && (
                            <div className="d-flex gap-3 mt-4">
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner size="sm" /> : <Save size={18} />} Save Changes
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center gap-2"
                                    onClick={handleToggleEdit}
                                    disabled={loading}
                                >
                                    <X size={18} /> Cancel
                                </Button>
                            </div>
                        )}
                    </Form>
                </div>

                {!isEditing && (
                    <div className="mt-5 text-center">
                        <Button
                            className="btn-minimal btn-minimal-outline border-1 px-5 py-3 fw-bold"
                            style={{ color: 'white', width: 'auto' }}
                            onClick={() => navigate('/')}
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                )}
            </div>
            <Footer />
        </Container>
    );
};

export default AccountDetails;
