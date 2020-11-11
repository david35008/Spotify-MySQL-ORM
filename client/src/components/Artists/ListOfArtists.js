import React, { useEffect, useState } from 'react';
import './Artist.css';
import { read } from '../Network/Ajax';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Artist from './Artist';

function ListOfArtists() {

    const [artistsInteractions, setAartistsInteractions] = useState([])
    const [artistsList, setArtistsList] = useState([])
    const history = useHistory()
    useEffect(() => {
        read('/api/v1/artists')
            .then(res => setArtistsList(res))
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
        read('/api/v1/interactions/artists/userInteractions')
            .then(res => {
                setAartistsInteractions(res)
            })
            .catch(console.error)
    }, [history]);

    const listToPrint = artistsList.map((artist, index) => {
        return (
            < Artist
                index={index}
                key={artist.name + artist.id}
                artist={artist}
                isLiked={artistsInteractions.map((element) => {
                    if (element.artistId === artist.id) {
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
            <NavBar setArtists={setArtistsList} searchTypeProps='Search Artist' />
            <h1 className='artistTitle' >Artists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfArtists;
