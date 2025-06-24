import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import LoadingSpinner from "../Components/LodingSpinner.jsx";
import ProjectCard from "../Components/ProjectCard.jsx";
import axios from 'axios'
import UserContext from "../UserContext.jsx";

function AllProjects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user && user.id) {
            axios.get(`http://localhost:8080/Projects/${user.id}`)
                .then(response => {
                    setProjects(response.data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [user])


    if (loading) {
        return <LoadingSpinner/>
    } else {

        return (
            <Container className="py-4">
                <h2 className="mb-4">All Projects</h2>
                <Row>
                    {projects.map(project => (
                        <Col md={6} lg={4} key={project.id} className="mb-3">
                            <ProjectCard project={project}/>
                        </Col>
                    ))}
                </Row>

                {projects.length === 0 && (
                    <p className="text-center text-muted">No projects yet</p>
                )}
            </Container>
        )
    }
}

export default AllProjects
