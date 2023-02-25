import "../assets/Sidebar.css"
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-4">
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/users">User</Nav.Link>
                <Nav.Link as={Link} to="/form-admin">Register Admin</Nav.Link>
            </Nav>
            </div>
        </nav>
    ) 
}