import React, { useState, useRef } from 'react';
import './NavBar.css';
import { read } from '../Network/Ajax';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar/SideBar.js';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar({ songList, albums, artists, playlists, setSongsList, setAlbums, setArtists, setPlaylists, searchTypeProps = 'not work here' }) {

    const [searchType, setSearchType] = useState(`${searchTypeProps}`)
    const [placeHolder, setPlaceHolder] = useState(`${searchTypeProps.replace('_', ' ')}...`)
    const [inputValue, setInputValue] = useState('')
    const [prevList, setPrevList] = useState();
    const [prevType, setPrevType] = useState();

    const inputRef = useRef();

    const [menuClass, setMenuClass] = useState("sidebar-wrapper")

    const ToggleMenu = () => {
        if (menuClass === "sidebar-wrapper") {
            setMenuClass("sidebar-wrapper-toggeled")
        } else {
            setMenuClass("sidebar-wrapper")
        }
    }

    const changeSearchType = (placeHolderName) => {
        setPlaceHolder(`Search ${placeHolderName.target.innerText}...`)
        setSearchType(`Search_${placeHolderName.target.innerText}`);
    }

    const handleChange = (input) => {
        setInputValue(input.target.value)
    }

    const search = () => {
        console.log(prevType);
        console.log(searchType);
        const searchValue = inputValue.toLowerCase().trim()
        if (searchValue !== "") {
            read(`${searchType}/${searchValue}`)
                .then(res => {
                    if (prevList) {
                        if (prevType !== searchType) {
                            switch (prevType.split('_')[1]) {
                                case 'Song':
                                    setSongsList(prevList)
                                    break;
                                case 'Album':
                                    setAlbums(prevList)
                                    break;
                                case 'Artist':
                                    setArtists(prevList)
                                    break;
                                case 'Playlist':
                                    setPlaylists(prevList)
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    switch (searchType.split('_')[1]) {
                        case 'Song':
                            setPrevType(searchType);
                            setPrevList(songList);
                            setSongsList(res)
                            break;
                        case 'Album':
                            setPrevType(searchType);
                            setPrevList(albums);
                            setAlbums(res)
                            break;
                        case 'Artist':
                            setPrevType(searchType);
                            setPrevList(artists);
                            setArtists(res)
                            break;
                        case 'Playlist':
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
                    alert(`No Match Found on ${searchTypeProps.replace('_', ' ')}`)
                    if (prevList) {
                        switch (prevType.split('_')[1]) {
                            case 'Song':
                                setSongsList(prevList)
                                break;
                            case 'Album':
                                setAlbums(prevList)
                                break;
                            case 'Artist':
                                setArtists(prevList)
                                break;
                            case 'Playlist':
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

    return (
        <>
            <SideBar menuClass={menuClass} ToggleMenu={ToggleMenu} />
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Button onClick={ToggleMenu} bg="dark" variant="dark" aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigtion" >
                    <span className="navbar-toggler-icon">  </span>
                </Button>
                <Navbar.Brand variant="success"><Link to='/' >My Spotify</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {searchTypeProps !== 'not work here' && <>
                        {searchTypeProps === 'Search_Song' && <NavDropdown title="Search By" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={changeSearchType}>Song</NavDropdown.Item>
                            <NavDropdown.Item onClick={changeSearchType}>Album</NavDropdown.Item>
                            <NavDropdown.Item onClick={changeSearchType}>Artist</NavDropdown.Item>
                            <NavDropdown.Item onClick={changeSearchType}>Playlist</NavDropdown.Item>
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
