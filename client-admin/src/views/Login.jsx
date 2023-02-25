import "../assets/Login.css"
import ibox from '../assets/ibox-logo.svg'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { login } from "../store/actions/admin/actionCreator";


export default function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    })

    const changeField = (e) => {
        const { name, value } = e.target;
        setFormLogin({ ...formLogin, [name]: value });
    }

    const loginHandler = (e) => {
        e.preventDefault()

        dispatch(login(formLogin)).then(() => navigate('/'))
    }

    return(
        <Container id="login-form">
            <div className="text-center mb-3">
                <img
                alt=""
                src={ibox}
                width="80"
                height="50"
                className="d-inline-block align-top"
                />
                <h3 className="mt-2">Sign in to your account</h3>
            </div>
            <div className='col-md-4'>
                <Form onSubmit={loginHandler} className='border rounded shadow p-5'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={formLogin.email} onChange={changeField} name="email" type="email" placeholder="" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={formLogin.password} onChange={changeField} name="password" type="password" placeholder="" required/>
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" type="submit" className="w-50">Sign in</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}