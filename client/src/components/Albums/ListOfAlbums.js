import React, { useEffect, useState } from 'react';
import './ListOfAlbums.css';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Album from './Album';


function ListOfAlbums({ getIdSong }) {

    const [albumsList, setAlbumsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/albums');
                setAlbumsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    const listToPrint = albumsList.map((album, index) => {
        return (
            <li key={album.name + index}>
                < Album index={index} album_ID={album.album_ID} getIdSong={getIdSong} />
            </li>
        )
    })


    return (
        <>
            <NavBar setList={setAlbumsList} serchType='album' />
            <h1>Top Albums</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfAlbums;
