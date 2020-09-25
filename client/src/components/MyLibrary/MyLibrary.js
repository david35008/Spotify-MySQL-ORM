import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';

const MyLibrary = () => {

    const location = useHistory()

    return (
        <>
            <NavBar />
            <h3>this is your personal page {Cookies.get('name')}</h3>

        </>
    )
}

export default MyLibrary;