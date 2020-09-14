import React, { useEffect, useState } from 'react';
import './ListOfArtists.css';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Artist from './Artist';

function ListOfArtists(params) {

    const [artistsList, setArtistsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/artists');
                setArtistsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    const listToPrint = artistsList.map((artist, index) => {
        return (
            <li key={artist.name + index}>
                < Artist index={index} artist_ID={artist.artist_ID} />
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
