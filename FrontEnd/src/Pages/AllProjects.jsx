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
        if (user) {
            // Agar Admin hai to sabhi projects fetch karo, warna sirf user ke projects
            const url = user.role === 'Admin' 
                ? 'http://localhost:8080/Projects'
                : `http://localhost:8080/Projects/${user.id}`
                
            axios.get(url)
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
                <h2 className="mb-4">
                    {user?.role === 'Admin' ? 'All Projects' : 'My Projects'}
                </h2>
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
