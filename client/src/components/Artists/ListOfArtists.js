import React, { useEffect, useState } from 'react';
import './Artist.css';
import { read } from '../Network/Ajax';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Artist from './Artist';

function ListOfArtists() {

    const [artistsList, setArtistsList] = useState([])
    const history = useHistory()
    useEffect(() => {
        read('artists')
            .then(res => setArtistsList(res))
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
    }, []);

    const listToPrint = artistsList.map((artist, index) => {
        return (
            < Artist index={index} key={artist.name + artist.artist_ID} artist={artist} />
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
