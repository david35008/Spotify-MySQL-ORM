import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { read } from '../Network/Ajax';
import './Artist.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Artist({ artist_ID, getIdSong }) {

    const [songList, setSongsList] = useState([])
    const [artist, setArtist] = useState([])

    useEffect(() => {
        read(`artist/${artist_ID}`)
        .then(res => {
            setArtist(res[0])
            setSongsList(res)
        })
        .catch(console.error)
    }, [artist_ID]);

    return (
        <div className='Artist'>
            <div className='ArtistContainer'>
                <img src={artist.cover_img} alt={artist.name} height='200' width='300' />
                <div className='ArtistDescription'>
                    <Link to={`/artist/${artist.artist_ID}`} className='ArtistName' > {artist.artist_name}</Link>
                    {artist.created_at && <div className='ArtistCreated_at'>Created_at: {new Date(artist.created_at).toDateString()}</div>}
                    {artist.upload_at && <div className='ArtistUpload_at' >Upload_at{new Date(artist.upload_at).toDateString()}</div>}
                </div>
            </div>
            <div className='ArtistSongsList' >
                <ListOfSongs query={{ path: "artist", id: artist.artist_ID }} songList={songList} getIdSong={getIdSong} split={0} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Artist;