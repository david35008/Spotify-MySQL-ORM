import React, { useEffect, useState } from 'react';
import './ListOfAlbums.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import { useHistory } from 'react-router-dom';
import Album from './Album';

function ListOfAlbums() {

    const [albumsInteractions, setAlbumsInteractions] = useState([])
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
        read('interactions/albums/byUser')
            .then(res => {
                setAlbumsInteractions(res)
            })
            .catch(console.error)
    }, [history]);

    const listToPrint = albumsList.map((album, index) => {
        return (
            < Album
                key={album.name + album.id}
                index={index}
                album={album}
                isLiked={albumsInteractions.map((element) => {
                    if (element.albumId === album.id) {
                        return element.isLiked
                    } else return null;
                }).filter(function (el) {
                    return el !== null;
                })[0]}
            />
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
