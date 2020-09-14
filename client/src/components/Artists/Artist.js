import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Artist.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Artist({ artist_ID, index }) {

    const [songList, setSongsList] = useState([])
    const [artist, setArtist] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/artist/${artist_ID}`);
                setArtist(data[0])
                setSongsList(data.concat())
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [artist_ID]);

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <div className='Artist'>
            <div className='ArtistContainer'>
                <img src={artist.cover_img} alt={artist.name} height='200' width='300' />
                <div className='ArtistDescription'>
                    <Link to={`/artists/${artist.artist_ID}`} className='ArtistName' > {artist.name}</Link>
                    <div className='ArtistCreated_at'>Created_at: {new Date(artist.created_at).toDateString()}</div>
                    <div className='ArtistUpload_at' >Upload_at{new Date(artist.upload_at).toDateString()}</div>
                </div>
            </div>
            <div className='ArtistSongsList' >
                <ListOfSongs songList={songList} getIdSong={getIdSong} split={0} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Artist;