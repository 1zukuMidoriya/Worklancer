import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Form, ListGroup } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../Components/LodingSpinner'

function AdminProjectView() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/Projects/project/${projectId}`)
      setProject(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      const commentData = {
        comment: comment,
        user: { id: 1 } 
      }
      await axios.post(`http://localhost:8080/Comments/${projectId}`, commentData)
      setComment('')
      fetchProject()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <Container className="mt-4">
      <Button 
        variant="secondary" 
        onClick={() => navigate(-1)}
        className="mb-3"
      >
        Back
      </Button>

      <Card className="mb-4">
        <Card.Body>
          <h2>{project?.title}</h2>
          <p><strong>Price:</strong> ₹{project?.price}</p>
          <p><strong>Status:</strong> {project?.status}</p>
          <p><strong>Deadline:</strong> {new Date(project?.deadline).toLocaleDateString()}</p>
          <p><strong>Data Link:</strong> {project?.dataLink}</p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h5>Add Comment</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={addComment}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Comment
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h5>Comments</h5>
        </Card.Header>
        <Card.Body>
          {project?.comments && project.comments.length > 0 ? (
            <ListGroup variant="flush">
              {project.comments.map((c) => (
                <ListGroup.Item 
                  key={c.id} 
                  className={c.user?.role === 'Admin' ? 'bg-light-red' : ''}
                  style={c.user?.role === 'Admin' ? { backgroundColor: '#ffe6e6' } : {}}
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
  )
}

export default AdminProjectView 