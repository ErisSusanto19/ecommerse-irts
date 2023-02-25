import Button from "react-bootstrap/esm/Button"
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/actions/admin/actionCreator";

export default function FormAdmin(){
    const dispatch = useDispatch()

    const [formReg, setFormReg] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    })

    const changeField = (e) => {
        const { name, value } = e.target;
        setFormReg({ ...formReg, [name]: value });
    }

    const submitReg = (e) => {
        e.preventDefault()

        dispatch(register(formReg))
        clearField()
    }

    const clearField = () => {
        setFormReg({
            email: '',
            password: ''
        })
    }

    return (
        <>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-2">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Register New Admin</h1>
            </div>
            <Form onSubmit={submitReg}>

                <div className="d-flex flex-row flex-wrap mb-3" controlId="formBasicEmail">
                    <div className="col-md-3">
                        <Form.Label>Email address</Form.Label>
                    </div>
                    <div className="col-md-9">
                        <Form.Control value={formReg.email} onChange={changeField} type="email" name="email" placeholder="" required/>
                    </div>
                </div>

                <div className="d-flex flex-row flex-wrap mb-3" controlId="formBasicPassword">
                    <div className="col-md-3">
                        <Form.Label>Password</Form.Label>
                    </div>
                    <div className="col-md-9">
                        <Form.Control value={formReg.password} onChange={changeField} type="password" name="password" placeholder="" required/>
                    </div>
                </div>
                
                <div className="d-flex justify-content-end">
                    <Button onClick={clearField} variant="secondary" className="mx-2">Cancel</Button>
                    <Button variant="primary" type="submit" >Save</Button>
                </div>
            </Form>
        </div>
        </>
    )
}