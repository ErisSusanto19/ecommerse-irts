
import "../assets/Login.css"
import ibox from '../assets/ibox-logo.svg'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { registerCustomer } from "../store/actions/customer/actionCreator";

export default function Register(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formReg, setFormReg] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    })

    const changeField = (e) => {
        const { name, value } = e.target;
        setFormReg({ ...formReg, [name]: value });
    }

    const regHandler = (e) => {
        e.preventDefault()

        dispatch(registerCustomer(formReg)).then(() => navigate("/login"))
    }

    return(
        <Container id="reg-form">
            <div className="text-center mb-3">
                <img
                as={Link} to="/"
                alt=""
                src={ibox}
                width="80"
                height="50"
                className="d-inline-block align-top"
                />
                <h3 className="mt-2">Sign up now</h3>
            </div>
            <div className='col-md-4'>
                <Form id="input-form" onSubmit={regHandler} className='border rounded shadow p-5'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={formReg.username} onChange={changeField} name="username" type="text" placeholder="" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={formReg.email} onChange={changeField} name="email" type="email" placeholder="" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={formReg.password} onChange={changeField} name="password" type="password" placeholder="" required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control value={formReg.phone} onChange={changeField} name="phone" type="number" placeholder=""/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={formReg.address} onChange={changeField} name="address" as="textarea" rows={3} placeholder=""/>
                    </Form.Group>

                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" type="submit" className="w-50">Sign up</Button>
                    </div>

                    <div className="d-flex justify-content-center my-3">
                        <label className="me-2">Already have account?</label>
                        <Link to="/login"> Sign in </Link>
                    </div>
                </Form>
            </div>
        </Container>
    )
}