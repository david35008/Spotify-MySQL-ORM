import React from 'react';
import './SideBar.css';
import { Container, Row, Col, Nav } from "react-bootstrap";


function SideBar({ menuClass }) {


    return (
        <Container className={menuClass} fluid>
            <Row >
                <Col xs={2} >
                    <div className="sidebar-heading">Menu</div>
                    <Nav className="mr-auto" >
                        <Nav.Link className="refButton" href="/">Home</Nav.Link>
                        <Nav.Link className="refButton" href="Albums">Albums</Nav.Link>
                        <Nav.Link className="refButton" href="Artists">Artists</Nav.Link>
                        <Nav.Link className="refButton" href="Playlists">Playlists</Nav.Link>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default SideBar;
