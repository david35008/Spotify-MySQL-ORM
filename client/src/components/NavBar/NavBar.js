import React from 'react';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function NavBar(params) {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand bg="light" >My Spotify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="Albums">Albums</Nav.Link>
                    <Nav.Link href="Artists">Artists</Nav.Link>
                    <Nav.Link href="Playlists">Playlists</Nav.Link>
                </Nav>
                <NavDropdown title="Search By" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Name</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Album</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Artist</NavDropdown.Item>                      
                    </NavDropdown>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;



