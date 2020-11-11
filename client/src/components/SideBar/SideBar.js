import React from 'react';
import './SideBar.css';
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import home from '../../images/home.png';
import album from '../../images/album.png';
import artist from '../../images/artist.png';
import playlist from '../../images/playlist.png';
import myLibrary from '../../images/myLibrary.png';
import admin from '../../images/admin.png';

function SideBar({ menuClass, ToggleMenu }) {

    return (
        <Container className={menuClass} fluid>
            <Row >
                <Col xs={2} >
                    <div className="sidebar-heading">Menu</div>
                    <Nav className="mr-auto" >
                        <Link className="refButton" to='/' onClick={ToggleMenu}>Home
                        <img src={home} className='homeSection' height='30px' alt={'home'} /></Link>
                        <Link className="refButton" to='/albums' onClick={ToggleMenu}>Albums
                        <img src={album} className='negetiveColor' height='30px' alt={'Albums'} /></Link>
                        <Link className="refButton" to='/Artists' onClick={ToggleMenu}>Artists
                        <img src={artist} className='artistSection' height='30px' alt={'artist'} /></Link>
                        <Link className="refButton" to='/Playlists' onClick={ToggleMenu}>Playlists
                        <img src={playlist} className='negetiveColor' height='30px' alt={'playlists'} /></Link>
                        <Link className="refButton" to='/MyLibrary' onClick={ToggleMenu}>My Library
                        <img src={myLibrary} className='artistSection' height='30px' alt={'Library'} /></Link>
                        {Cookies.get('isAdmin') === "true" && <Link className="refButton" to='/Admin' onClick={ToggleMenu}>Admin
                        <img src={admin} className='artistSection' height='30px' alt={'admin'} /></Link>}
                    </Nav>
                </Col>
            </Row>
        </Container>
    )
}

export default SideBar;
