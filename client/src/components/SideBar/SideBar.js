import React from 'react';
import './SideBar.css';
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


function SideBar({ menuClass, ToggleMenu }) {

    return (
        <Container className={menuClass} fluid>
            <Row >
                <Col xs={2} >
                    <div className="sidebar-heading">Menu</div>
                    <Nav className="mr-auto" >
                        <Link className="refButton" to='/' onClick={ToggleMenu}>Home</Link>
                        <Link className="refButton" to='/albums' onClick={ToggleMenu}>Albums</Link>
                        <Link className="refButton" to='/Artists' onClick={ToggleMenu}>Artists</Link>
                        <Link className="refButton" to='/Playlists' onClick={ToggleMenu}>Playlists</Link>
                        {Cookies.get('isAdmin') && <Link className="refButton" to='/Admin' onClick={ToggleMenu}>Admin</Link>}
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default SideBar;
