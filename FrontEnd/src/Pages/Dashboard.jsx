import React, {useContext, useState} from 'react'
import {Container, Navbar, Nav, Form, Button, Row, Col} from "react-bootstrap";
import UserContext from "../UserContext.jsx";
import CreateProject from "./CreateProject.jsx";
import AllProjects from "./AllProjects.jsx";
import { Navigate, useNavigate } from 'react-router-dom';



function Dashboard() {
    const{username} = useContext(UserContext)
    const [projects, setProjects] = useState("AllProjects")
    const { user } = useContext(UserContext)
    const navigate = useNavigate();


    function GetAllProjects(){
    setProjects("AllProjects")
    }

    function GetCreateProject() {
        setProjects("CreateProject")
    }

    function Logout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#" onClick={GetAllProjects} style={{cursor: 'pointer'}}>
                        Hello {user?.name || 'User'}!
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={GetAllProjects}>All Projects</Nav.Link>
                            <Nav.Link onClick={GetCreateProject}>Sent Projects</Nav.Link>
                            <Button variant="outline-light" size="sm" onClick={Logout} className="ms-2">
                                Logout
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <>
                {
                    projects === "AllProjects" ? <AllProjects/> : <CreateProject/>
                }
            </>

        </>
    )
}

export default Dashboard
