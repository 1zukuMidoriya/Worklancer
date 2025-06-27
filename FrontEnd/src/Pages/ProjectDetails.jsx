import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Form, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Components/LodingSpinner';
import UserContext from '../UserContext';
import axios from 'axios';

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/Projects/project/${id}`)
            .then(res => {
                setProject(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        
        if (!comment.trim()) return;

        axios.post(`http://localhost:8080/Comments/${id}`, {
            comment: comment,
            user: { id: user?.id }
        })
        .then(res => {
            return axios.get(`http://localhost:8080/Projects/project/${id}`);
        })
        .then(res => {
            setProject(res.data);
            setComment('');
        })
        .catch(err => console.error(err));
    };

    if (loading) return <LoadingSpinner />;
    if (!project) return <Container className="py-4"><h3>Project not found</h3></Container>;

    return (
        <Container className="py-4">
            <Button onClick={() => navigate('/dashboard')} className="mb-3">
                Back
            </Button>

            <Card className="mb-4">
                <Card.Body>
                    <h2>{project.title}</h2>
                    <hr />
                    
                    <p><strong>Price:</strong> ₹{project.price}</p>
                    <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {project.status || 'Open'}</p>
                    
                    {project.dataLink && (
                        <p><strong>Data:</strong> <a href={project.dataLink} target="_blank">{project.dataLink}</a></p>
                    )}
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header>
                    <h5>Add Comment</h5>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleCommentSubmit}>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit" className="mt-2">
                            Post Comment
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header>
                    <h5>Comments</h5>
                </Card.Header>
                <Card.Body>
                    {project.comments && project.comments.length > 0 ? (
                        <ListGroup variant="flush">
                            {project.comments.map((c) => (
                                <ListGroup.Item 
                                    key={c.id}
                                >
                                    <p className="mb-1">{c.comment}</p>
                                    <small className="text-muted">
                                        By: {c.user?.name || 'Client'} 
                                        {c.user?.role === 'Admin' && ' (Admin)'}
                                    </small>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-muted">No comments yet</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProjectDetails; 