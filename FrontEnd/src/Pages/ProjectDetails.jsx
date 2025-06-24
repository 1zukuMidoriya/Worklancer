import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Components/LodingSpinner';
import axios from 'axios';

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
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
            comment: comment
        })
        .then(res => {
            // refresh project data to show new comment
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

            <Card>
                <Card.Body>
                    <h2>{project.title}</h2>
                    <hr />
                    
                    <p><strong>Price:</strong> ₹{project.price}</p>
                    <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {project.status || 'Open'}</p>
                    
                    {project.dataLink && (
                        <p><strong>Data:</strong> <a href={project.dataLink} target="_blank">{project.dataLink}</a></p>
                    )}

                    <hr />
                    <h4>Comments</h4>
                    {project.comments && project.comments.length > 0 ? (
                        project.comments.map((comment, index) => (
                            <div key={index} className="mb-2">
                                <p>{comment.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet</p>
                    )}

                    <Form onSubmit={handleCommentSubmit} className="mt-3">
                        <Form.Control
                            type="text"
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
        </Container>
    );
}

export default ProjectDetails; 