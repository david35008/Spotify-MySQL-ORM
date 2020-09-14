import React, { useEffect, useState } from 'react';
import './OneArtist.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';


function OneArtist() {

    const { id } = useParams()
    const [artist, setArtist] = useState([])
    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/artist/${id}`);
                setArtist(data[0])
                setSongsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [id]);

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <div className='OneArtist'>
            <div className='ArtistContainer'>
            <img src={artist.cover_img} alt={artist.name} height='300px' />
            <div className='OneArtitstDescription'>
            <div>Name: {artist.name}</div>
            <div>Artist: {artist.artist_ID}</div>
            <div>created_at: {new Date(artist.created_at).toDateString()}</div>
            <div>upload_at{new Date(artist.upload_at).toDateString()}</div>
            </div>
            </div>
            <ListOfSongs songList={songList} getIdSong={getIdSong} artistDisplay={"none"} split={0} />
        </div>
    )

}

export default OneArtist;
