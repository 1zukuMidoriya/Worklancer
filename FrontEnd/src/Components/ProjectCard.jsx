import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ project }) {
    const navigate = useNavigate();

    return (
        <Card 
            onClick={() => navigate(`/project/${project.id}`)}
            style={{ cursor: 'pointer' }}
            className="mb-3"
        >
            <Card.Body>
                <h5>{project.title}</h5>
                <span class="badge bg-primary">{project.status}</span>
                <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                <p>₹{project.price}</p>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard; 