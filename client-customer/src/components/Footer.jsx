import "../assets/Footer.css"
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
        <footer class="blog-footer">
            <p>iBox Experience Days</p>
            <p>
                <Nav.Link as={Link} to="/" href="#">Home</Nav.Link> 
            </p>
        </footer>
        </>
    )
}