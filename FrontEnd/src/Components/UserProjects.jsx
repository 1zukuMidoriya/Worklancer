import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserProjects({ projects, onProjectUpdate }) {
  const navigate = useNavigate()
  
  const updateStatus = async (projectId, status) => {
    try {
      await axios.put(`http://localhost:8080/Projects/${projectId}/status/${status}`)
      onProjectUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h4 className="mb-3">User Projects</h4>
      {projects && projects.length > 0 ? (
        <Row>
          {projects.map((project) => (
            <Col md={6} key={project.id} className="mb-3">
              <Card 
                style={{ 
                  cursor: 'pointer',
                  minHeight: '150px' 
                }} 
                onClick={() => navigate(`/admin/project/${project.id}`)}
              >
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start flex-grow-1">
                    <div>
                      <h6>{project.title}</h6>
                      <small className="text-muted d-block">Created: {new Date(project.creationDate).toLocaleDateString('en-IN')}</small>
                      <small className="text-muted">Price: ₹{project.price}</small>
                    </div>
                    <span className={`badge ${project.status === 'Accepted' ? 'bg-success' : project.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-auto">
                    {project.status === 'Pending' && (
                      <div className="mt-3">
                        <Button size="sm" variant="success" className="me-2" onClick={(e) => {
                          e.stopPropagation()
                          updateStatus(project.id, 'Accepted')
                        }}>
                          Accept
                        </Button>
                        <Button size="sm" variant="danger" onClick={(e) => {
                          e.stopPropagation()
                          updateStatus(project.id, 'Rejected')
                        }}>
                          Reject
                        </Button>
                      </div>
                    )}
                    {project.status === 'Accepted' && (
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="primary" 
                          onClick={(e) => {
                            e.stopPropagation()
                            updateStatus(project.id, 'Completed')
                          }}
                        >
                          Mark as Complete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted">No projects assigned</p>
      )}
    </div>
  )
}

export default UserProjects 