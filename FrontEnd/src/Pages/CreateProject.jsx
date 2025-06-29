import React, {useState, useContext} from 'react'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from 'axios'
import UserContext from "../UserContext.jsx";

function CreateProject({ onProjectSent }) {
    const { user } = useContext(UserContext)
    const [projectData, setProjectData] = useState({
        title: '',
        dataLink: '',
        deadline: '',
        price: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        
        
        if (name === 'deadline') {
            const selectedDate = new Date(value)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            
            if (selectedDate < today) {
                alert('Deadline cannot be in the past!')
                return
            }
        }
        
        setProjectData({
            ...projectData,
            [name]: value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!user || !user.id) {
            alert('Please login first!')
            return
        }
        
        axios.post(`http://localhost:8080/Projects/${user.id}`, {
            ...projectData,
            price: parseInt(projectData.price),
            status: 'Pending'
        })
        .then(() => {
            alert('Project sent successfully!')
            setProjectData({
                title: '',
                dataLink: '',
                deadline: '',
                price: ''
            })
            if (onProjectSent) {
                onProjectSent()
            }
        })
        .catch(error => {
            alert('Something went wrong!')
            console.error(error)
        })
    }
    
    return (
    <Container className="py-4">
        <Row>
            <Col md={8} className="mx-auto">
                <h2 className="mb-4">Create New Project</h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={projectData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description / Links</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="dataLink"
                            value={projectData.dataLink}
                            onChange={handleChange}
                            placeholder="Add description or any relevant links"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control
                            type="date"
                            name="deadline"
                            value={projectData.deadline}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price (₹)</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={projectData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Send Project
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

export default CreateProject
