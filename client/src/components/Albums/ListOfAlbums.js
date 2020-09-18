import React, { useEffect, useState } from 'react';
import './ListOfAlbums.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import Album from './Album';


function ListOfAlbums({ getIdSong }) {

    const [albumsList, setAlbumsList] = useState([])

    useEffect(() => {
        read('albums')
            .then(res => setAlbumsList(res))
            .catch(console.error)
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
            <NavBar setAlbums={setAlbumsList} searchTypeProps='Search_Album' />
            <h1>Albums</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfAlbums;
