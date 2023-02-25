import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import useToggler from "../hooks/useToggler";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, fetchProductById, updateProduct } from '../store/actions/product/actionCreator';

export default function ProdcutModal({ modalTitle, method, text }) {
  const { state, toggler } = useToggler(true)
  const [form, setForm] = useState({
    code: "",
    name: "",
    price: "",
    brand: "",
    image: "",
    info: ""
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (method === "PUT") {
      dispatch(fetchProductById(id)).then(data => {
        setForm({
          code: data.code,
          name: data.name,
          price: data.price,
          brand: data.brand,
          image: data.image,
          info: data.info
        })
      })
    }
  }, [])

  const inputHandler = (e) => {
    const { name, value } = e.target

    const obj = {
      ...form,
      [name]: value,
    };

    setForm(obj)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let sendData = method === "POST" ? createProduct(form) : updateProduct(form, id)
    dispatch(sendData).then(() => {
      navigate("/")
    })
  }

  return (
    <>
      <Modal
      show={state}
      onHide={toggler}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Code</Form.Label>
            <Form.Control
              onChange={inputHandler}
              name="code"
              type="text"
              value={form.code}
              placeholder="Enter code"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={inputHandler}
              name="name"
              type="text"
              value={form.name}
              placeholder="Enter name"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={inputHandler}
              name="price"
              type='number'
              value={form.price}
              placeholder="Enter price"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              onChange={inputHandler}
              name="brand"
              type="text"
              value={form.brand}
              placeholder="Enter brand"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              onChange={inputHandler}
              name="image"
              type="text"
              value={form.image}
              placeholder="Enter Image URL"
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Info</Form.Label>
            <Form.Control
              onChange={inputHandler}
              name="info"
              type="text"
              value={form.info}
              placeholder="Enter info"
              required={true}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant='secondary' onClick={toggler}>Close</Button>
            <Button variant="primary" type="submit">
              {text}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  )
}