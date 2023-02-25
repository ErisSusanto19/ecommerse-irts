import ibox from "../assets/ibox-logo.svg"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

function Header() {
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
            navigate("/")
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {localStorage.access_token && (
                <Nav.Link as={Link} to="/favorite">Favorite</Nav.Link>
            )}
          </Nav>
          <Nav className="me-auto"></Nav>
          <Nav>
            {localStorage.access_token? (
                <>
                    <Nav.Link onClick={logout} as={Link} to="/">Logout</Nav.Link>
                </>
            ) : (
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
            )
            }
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;