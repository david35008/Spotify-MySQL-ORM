import React, { useEffect, useState } from 'react';
import './Artist.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import Artist from './Artist';

function ListOfArtists({ getIdSong }) {

    const [artistsList, setArtistsList] = useState([])

    useEffect(() => {
        read('artists')
            .then(res => setArtistsList(res))
            .catch(console.error)
    }, []);

    const listToPrint = artistsList.map((artist, index) => {
        return (
            < Artist index={index} key={artist.name + artist.artist_ID} artist_ID={artist.artist_ID} getIdSong={getIdSong} />
        )
    })

    return (
        <>
            <NavBar setArtists={setArtistsList} searchTypeProps='Search_Artist' />
            <h1 className='artistTitle' >Artists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfArtists;
