import ibox from "../assets/ibox-logo.svg"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Header() {
  const navigate = useNavigate()
  
  const logout = () => {
    Swal.fire({
      title: 'Are you sure want to quit?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, quit now!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        navigate("/login")
      }
    })
  }

  return (
    <Navbar bg="light" className="sticky-top px-3 shadow" expand="lg">
        <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={ibox}
              width="80"
              height="30"
              className="d-inline-block align-top"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="sidebarMenu" />
        <Nav className="me-auto"></Nav>
        <Nav>
        <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item>Hai, { localStorage.email? localStorage.email : "" }</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout} as={Link} to="/login">
            Logout
            </NavDropdown.Item>
        </NavDropdown>
        </Nav>
    </Navbar>
  );
}