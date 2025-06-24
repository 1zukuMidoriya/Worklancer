import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Badge, Navbar, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        axios.get('http://localhost:8080/Users')
            .then(res => {
                setUsers(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Admin Panel</Navbar.Brand>
                    <Button variant="outline-light" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </Container>
            </Navbar>

            <Container>
                <h2 className="mb-4">All Users</h2>
                
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Row>
                        {users
                            .filter(user => user.role !== 'Admin')
                            .map(user => (
                            <Col md={4} className="mb-3" key={user.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Email:</strong> {user.email}<br/>
    
                                            <Badge bg={user.role === 'Admin' ? 'danger' : 'primary'}>
                                                {user.role}
                                            </Badge>
                                        </Card.Text>
                                        <small className="text-muted">
                                            Projects: {user.project ? user.project.length : 0}
                                        </small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                
                {users.filter(user => user.role !== 'Admin').length === 0 && !loading && (
                    <p className="text-center">No users found</p>
                )}
            </Container>
        </>
    )
}

export default AdminDashboard
