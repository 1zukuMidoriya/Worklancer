import React, {useState} from 'react';
import { Button, Card, Container, Form} from 'react-bootstrap';
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

function RegisterPage() {
    const [thisname, setName] = useState('');
    const [thisemail, setEmail] = useState('');
    const [thispassword, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Name:', thisname, 'Email:', thisemail, 'Password:', thispassword);

        axios.post('http://localhost:8080/Users',{
            name: thisname,
            email: thisemail,
            password: thispassword
        }).then(function (response){
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        })
        alert("Registration successful")

    navigate("/");

        
    };

    return (<Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow">
                <h3 className="text-center mb-3">Register</h3>
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={thisname}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={thisemail}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Create password"
                            value={thispassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100">
                        Register
                    </Button>
                </Form><br/>
                <Link className="text-center" to="/">already have a account?</Link>

            </Card>

        </Container>);
}

export default RegisterPage;
