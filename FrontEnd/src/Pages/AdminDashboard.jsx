import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Navbar, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LodingSpinner'

function AdminDashboard() {
  const [users, setUsers] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:8080/Users')
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleLogout = () => {
    navigate('/')
  }

  const handleUserClick = (userId) => {
    navigate(`/user-details/${userId}`)
  }

  const nonAdminUsers = users ? users.filter(u => (u.role !== 'Admin')) : []

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand> <h3>Hello Admin, </h3> </Navbar.Brand>
          <Button
            variant="outline-light"
            size="sm"
            onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container>
        {!users ? (
          <LoadingSpinner/>
        ) : (
          <>
            <h2>All Users</h2>
            <Row>
              {nonAdminUsers.map((user) => (
                <Col md={4} className="mb-3" key={user.id}>
                  <Card 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => handleUserClick(user.id)}
                    className="h-100 shadow-sm"
                  >
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <p>Email: {user.email}</p>
                      <p>Projects: {user.project ? user.project.length : 0}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {nonAdminUsers.length === 0 && (
              <p className="text-center">No users found</p>
            )}
          </>
        )}
      </Container>
    </>
  )
}

export default AdminDashboard