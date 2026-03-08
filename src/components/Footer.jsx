import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Globe, Shield, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <Container>
                <div className="footer-content">
                    <Row className="align-items-center g-4">
                        <Col md={4} className="text-center text-md-start">
                            <div className="footer-logo-section">
                                <img
                                    src="/Document.png"
                                    alt="Tresons Technologies Logo"
                                    className="footer-logo"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <div className="footer-brand">
                                    <span className="fw-bold text-white">SCMathsCore</span>
                                    <p className="small text-secondary mb-0">Elevating Education Through Technology</p>
                                </div>
                            </div>
                        </Col>

                        <Col md={4} className="text-center">
                            <div className="footer-powered">
                                <span className="text-secondary small">Powered by</span>
                                <div className="fw-bold text-primary mt-1">Tresons Technologies</div>
                            </div>
                        </Col>

                        <Col md={4} className="text-center text-md-end">
                            <div className="footer-rights">
                                <p className="small text-secondary mb-1">
                                    &copy; {currentYear} SCMathsCore. All rights reserved.
                                </p>
                                <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-2">
                                    <Shield size={14} className="text-secondary opacity-50" />
                                    <Globe size={14} className="text-secondary opacity-50" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

            <div className="footer-bottom-bar"></div>
        </footer>
    );
};

export default Footer;
