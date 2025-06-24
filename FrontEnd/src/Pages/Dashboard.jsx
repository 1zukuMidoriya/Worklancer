import React, {useContext, useState} from 'react'
import {Container, Navbar, Nav, Form, Button, Row, Col} from "react-bootstrap";
import UserContext from "../UserContext.jsx";
import CreateProject from "./CreateProject.jsx";
import AllProjects from "./AllProjects.jsx";



function Dashboard() {
    const{username} = useContext(UserContext)
    const [projects, setProjects] = useState("AllProjects")
    const { user } = useContext(UserContext)

    function GetAllProjects(){
    setProjects("AllProjects")
    }

    function GetCreateProject() {
        setProjects("CreateProject")
    }

    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand onClick={GetAllProjects}>Hello {user.name}!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={GetAllProjects} >All Projects</Nav.Link>
                            <Nav.Link onClick={GetCreateProject} >Sent Projects</Nav.Link>
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
