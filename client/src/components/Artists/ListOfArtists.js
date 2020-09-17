import React, { useEffect, useState } from 'react';
import './ListOfArtists.css';
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
            <li key={artist.name + index}>
                < Artist index={index} artist_ID={artist.artist_ID} getIdSong={getIdSong} />
            </li>
        )
    })

    return (
        <>
            <NavBar setList={setArtistsList} serchType='artist' />
            <h1>Top Artists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfArtists;
