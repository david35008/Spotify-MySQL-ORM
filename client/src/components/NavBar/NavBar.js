import React, { useState, useRef, useContext } from 'react';
import { Logged } from '../Services/Aouthorizetion';
import './NavBar.css';
import { read } from '../Network/Ajax';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar/SideBar.js';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { removeTokents } from '../Services/globalVariables';

function NavBar({ songList, albums, artists, playlists, setSongsList, setAlbums, setArtists, setPlaylists, searchTypeProps = 'not work here' }) {

    const [searchType, setSearchType] = useState(`${searchTypeProps}`)
    const [placeHolder, setPlaceHolder] = useState(`Search ${searchTypeProps}...`)
    const [inputValue, setInputValue] = useState('')
    const [prevList, setPrevList] = useState();
    const [prevType, setPrevType] = useState();

    const inputRef = useRef();

    const [menuClass, setMenuClass] = useState("sidebar-wrapper")

    const value = useContext(Logged);

    const ToggleMenu = () => {
        if (menuClass === "sidebar-wrapper") {
            setMenuClass("sidebar-wrapper-toggeled")
        } else {
            setMenuClass("sidebar-wrapper")
        }
    }

    const changeSearchType = (event) => {
        setPlaceHolder(`Search ${event.target.innerText}...`)
        setSearchType(`${event.target.innerText}`);
    }

    const handleChange = (input) => {
        setInputValue(input.target.value)
    }

    const search = () => {
        const searchValue = inputValue.toLowerCase().trim()
        if (searchValue !== "") {
            read(`${searchType}/byName/${searchValue}`)
                .then(res => {
                    if (prevList) {
                        if (prevType !== searchType) {
                            switch (prevType) {
                                case 'Songs':
                                    setSongsList(prevList)
                                    break;
                                case 'Albums':
                                    setAlbums(prevList)
                                    break;
                                case 'Artists':
                                    setArtists(prevList)
                                    break;
                                case 'Playlists':
                                    setPlaylists(prevList)
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    switch (searchType) {
                        case 'Songs':
                            setPrevType(searchType);
                            setPrevList(songList);
                            setSongsList(res)
                            break;
                        case 'Albums':
                            setPrevType(searchType);
                            setPrevList(albums);
                            setAlbums(res)
                            break;
                        case 'Artists':
                            setPrevType(searchType);
                            setPrevList(artists);
                            setArtists(res)
                            break;
                        case 'Playlists':
                            setPrevType(searchType);
                            setPrevList(playlists);
                            setPlaylists(res)
                            break;
                        default:
                            break;
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert(`No Match Found on ${searchTypeProps}`)
                    if (prevList) {
                        switch (prevType.split(' ')[1]) {
                            case 'Songs':
                                setSongsList(prevList)
                                break;
                            case 'Albums':
                                setAlbums(prevList)
                                break;
                            case 'Artists':
                                setArtists(prevList)
                                break;
                            case 'Playlists':
                                setPlaylists(prevList)
                                break;
                            default:
                                break;
                        }
                    }
                })
        }
        setInputValue('')
        inputRef.current.value = ""
    }

const handleLogOut = () => {
    removeTokents()
    value.setIsLogged(false);
}

    return (
        <>
            <SideBar menuClass={menuClass} ToggleMenu={ToggleMenu} />
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Button onClick={ToggleMenu} bg="dark" variant="dark" aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigtion" >
                    <span className="navbar-toggler-icon">  </span>
                </Button>
                <Navbar.Brand variant="success"><Link to='/' >My Spotify, hello {Cookies.get('name')}</Link></Navbar.Brand>
                <Button onClick={handleLogOut} >log out </Button>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {searchTypeProps !== 'not work here' && <>
                        {searchTypeProps === 'Songs' && <NavDropdown title="Search By" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={changeSearchType}>Songs</NavDropdown.Item>
                            <NavDropdown.Item onClick={changeSearchType}>Albums</NavDropdown.Item>
                            <NavDropdown.Item onClick={changeSearchType}>Artists</NavDropdown.Item>
                            <NavDropdown.Item onClick={changeSearchType}>Playlists</NavDropdown.Item>
                        </NavDropdown>}
                        <Form inline>
                            <FormControl ref={inputRef} type="text" placeholder={placeHolder} onChange={handleChange} className="mr-sm-2" />
                            <Button variant="dark" onClick={() => {
                                if (searchTypeProps !== 'not work here') {
                                    search();
                                }
                            }} >Search</Button>
                        </Form></>}
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar;
