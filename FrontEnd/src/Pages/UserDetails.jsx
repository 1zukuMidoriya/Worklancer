import React, { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../Components/LodingSpinner'
import UserProjects from '../Components/UserProjects'

function UserDetails() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [userId])

  const fetchUserData = async () => {
    try {
      const userRes = await axios.get(`http://localhost:8080/Users/${userId}`)
      setUser(userRes.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleProjectUpdate = () => {
    fetchUserData()
  }

  if (loading) return <LoadingSpinner />

  return (
    <Container className="mt-4">
      <Button 
        variant="secondary" 
        onClick={() => navigate('/AdminDashboard')}
        className="mb-3"
      >
        Back to Dashboard
      </Button>

      <Card className="mb-4">
        <Card.Body>
          <h2>{user?.name}</h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Total Projects:</strong> {user?.project?.length || 0}</p>
        </Card.Body>
      </Card>

      <UserProjects projects={user?.project} onProjectUpdate={handleProjectUpdate} />
    </Container>
  )
}

export default UserDetails 