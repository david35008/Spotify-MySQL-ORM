import React from 'react';
import './SideBar.css';
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';


function SideBar({ menuClass }) {


    return (
        <Container className={menuClass} fluid>
            <Row >
                <Col xs={2} >
                    <div className="sidebar-heading">Menu</div>
                    <Nav className="mr-auto" >
                        <Link className="refButton" to='/' >Home</Link>
                        <Link className="refButton" to='/albums' >Albums</Link>
                        <Link className="refButton" to='/Artists'>Artists</Link>
                        <Link className="refButton" to='/Playlists'>Playlists</Link>
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default SideBar;
