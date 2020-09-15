import React, { useState, useRef } from 'react';
import './NavBar.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../SideBar/SideBar.js';
import { Navbar, Nav,
    //  NavDropdown,
      Form, FormControl, Button } from 'react-bootstrap';
import MyModal from '../MyModal/MyModal'
import { Link } from 'react-router-dom';

function NavBar({ setList, serchType = 'not work here' }) {

    let serachType = `search_${serchType}`;
    let placeHolder = `Search ${serchType}...`;
    // const [serachType, setSearchType] = useState(`search_${serchType}`)
    // const [placeHolder, setPlaceHolder] = useState(`Search ${serchType}...`)
    const [inputValue, setInputValue] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const inputRef = useRef();

    const [menuClass, setMenuClass] = useState("sidebar-wrapper")

    const ToggleMenu = () => {
        if (menuClass === "sidebar-wrapper") {
            setMenuClass("sidebar-wrapper-toggeled")
        } else {
            setMenuClass("sidebar-wrapper")
        }
    }

    // const changeSearchType = (placeHolderName) => {
    //     setPlaceHolder(`Search ${placeHolderName.target.innerText}...`)
    //     setSearchType(`search_${placeHolderName.target.innerText}`);
    // }

    const handleChange = (input) => {
        setInputValue(input.target.value)
    }

    const search = async () => {
        const searchValue = inputValue.toLowerCase().trim()
        if (searchValue !== "") {
            try {
                const { data } = await axios.get(`/${serachType}/${searchValue}`)
                setList(data)
            } catch {
                setList([{ name: "not found a match", youtube_link: "" }])
            }
        }
        setInputValue('')
        inputRef.current.value = ""
    }

    return (
        <>
            <SideBar menuClass={menuClass} ToggleMenu={ToggleMenu} />
            {openModal && <MyModal openModal={openModal} setOpenModal={setOpenModal} />}
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Button onClick={ToggleMenu} bg="dark" variant="dark" aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigtion" >
                    <span className="navbar-toggler-icon">  </span>
                </Button>
                <Navbar.Brand variant="success"><Link  to='/' >My Spotify</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Button bg="dark" variant="dark" onClick={() => setOpenModal((state) => !state)}    >Add New</Button>
                    {/* <NavDropdown title="Search By" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={changeSearchType}>Song</NavDropdown.Item>
                        <NavDropdown.Item onClick={changeSearchType}>Album</NavDropdown.Item>
                        <NavDropdown.Item onClick={changeSearchType}>Artist</NavDropdown.Item>
                    </NavDropdown> */}
                    <Form inline>
                        <FormControl ref={inputRef} type="text" placeholder={placeHolder} onChange={handleChange} className="mr-sm-2" />
                        <Button variant="dark" onClick={() => {
                            if (serchType !== 'not work here') {
                                search();
                            }
                        }} >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar;



