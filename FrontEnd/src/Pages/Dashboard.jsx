import React, {useContext, useState} from 'react'
import {Container, Navbar, Nav, Form, Button, Row, Col} from "react-bootstrap";
import UserContext from "../UserContext.jsx";
import CreateProject from "./CreateProject.jsx";
import AllProjects from "./AllProjects.jsx";
import {useNavigate} from "react-router-dom";



function Dashboard() {
    const{username, setUser} = useContext(UserContext)
    const [projects, setProjects] = useState("AllProjects")
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    function GetAllProjects(){
    setProjects("AllProjects")
    }

    function GetCreateProject() {
        setProjects("CreateProject")
    }

    function handleLogout() {
        // Clear user data and redirect to login
        setUser(null)
        navigate("/")
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#" onClick={GetAllProjects}>Hello {user.name}!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={GetAllProjects} >All Projects</Nav.Link>
                            <Nav.Link onClick={GetCreateProject} >Sent Projects</Nav.Link>
                            <Button 
                                variant="outline-light" 
                                size="sm" 
                                onClick={handleLogout}
                                className="ms-2"
                            >
                                Logout
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <>
                {
                    projects === "AllProjects" ? <AllProjects/> : <CreateProject onProjectSent={GetAllProjects}/>
                }
            </>

        </>
    )
}

export default Dashboard
