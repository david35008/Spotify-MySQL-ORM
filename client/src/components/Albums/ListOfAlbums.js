import React, { useEffect, useState } from 'react';
import './ListOfAlbums.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import Album from './Album';

function ListOfAlbums() {

    const [albumsList, setAlbumsList] = useState([])

    useEffect(() => {
        read('albums')
            .then(res => setAlbumsList(res))
            .catch(console.error)
    }, []);

    const listToPrint = albumsList.map((album, index) => {
        return (
            < Album  key={album.name + album.album_ID} index={index} album={album} />
        )
    })


    return (
        <>
            <NavBar setAlbums={setAlbumsList} searchTypeProps='Search_Album' />
            <h1 className='albumTitle' >Albums</h1><hr />
            <ol className='ArtistList' >
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfAlbums;
