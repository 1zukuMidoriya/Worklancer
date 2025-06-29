import React, { useState, useEffect, useContext } from 'react';
import { Badge, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import QRCode from '../assets/QR.jpeg';

function ProjectCard({ project }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [showPayModal, setShowPayModal] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        const paidProjects = JSON.parse(localStorage.getItem('paidProjects') || '[]');
        setIsPaid(paidProjects.includes(project.id));
    }, [project.id]);

    const getBadgeColor = (status) => {
        if (status === 'Accepted') return 'primary';
        if (status === 'Rejected') return 'danger';
        if (status === 'Completed') return 'success';
        return 'primary';
    };

    const handlePayment = (e) => {
        e.stopPropagation();
        setShowPayModal(true);
    };

    const markAsPaid = () => {
        const paidProjects = JSON.parse(localStorage.getItem('paidProjects') || '[]');
        paidProjects.push(project.id);
        localStorage.setItem('paidProjects', JSON.stringify(paidProjects));
        setIsPaid(true);
        setShowPayModal(false);
    };

    const shouldShowPayButton = project.status === 'Completed' && !isPaid && user?.role !== 'Admin';

    return (
        <>
        <Card 
            onClick={() => navigate(`/project/${project.id}`)}
            style={{ cursor: 'pointer' }}
            className="mb-3"
        >
            <Card.Body>
                <h5>{project.title}</h5>
                {shouldShowPayButton ? (
                    <div>
                        <span className="badge bg-warning mb-2">Payment Pending</span>
                        <Button 
                            variant="success" 
                            size="sm" 
                            onClick={handlePayment}
                            className="d-block"
                        >
                            Pay Now
                        </Button>
                    </div>
                ) : (
                    <span className={`badge bg-${getBadgeColor(project.status)}`}>
                        {project.status === 'Completed' && isPaid ? 'Completed' : project.status}
                    </span>
                )}
                <p>Created: {new Date(project.creationDate).toLocaleDateString()}</p>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                <p>₹{project.price}</p>
            </Card.Body>
        </Card>

        <Modal show={showPayModal} onHide={() => setShowPayModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Payment for {project.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h5 className="mb-3">Scan QR to Pay ₹{project.price}</h5>
                <div style={{ 
                    width: '200px', 
                    height: '200px', 
                    margin: '0 auto', 
                    border: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    overflow: 'hidden'
                }}>
                    <img 
                        src={QRCode} 
                        alt="QR Code for Payment" 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }} 
                    />
                </div>
                <p className="mt-3 text-muted">Scan with any UPI app</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowPayModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={markAsPaid}>
                    Done Payment
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ProjectCard; 