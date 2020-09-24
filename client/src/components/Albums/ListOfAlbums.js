import React, { useEffect, useState } from 'react';
import './ListOfAlbums.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import Album from './Album';

function ListOfAlbums() {

    const [albumsList, setAlbumsList] = useState([])
    const history = useHistory()
    useEffect(() => {
        read('albums')
            .then(res => setAlbumsList(res))
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
    }, [history]);

    const listToPrint = albumsList.map((album, index) => {
        return (
            < Album key={album.name + album.albumId} index={index} album={album} />
        )
    })


    return (
        <>
            <NavBar setAlbums={setAlbumsList} searchTypeProps='Search Album' />
            <h1 className='albumTitle' >Albums</h1><hr />
            <ol className='ArtistList' >
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfAlbums;
