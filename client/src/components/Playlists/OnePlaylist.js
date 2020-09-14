import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';


function OnePlaylist(params) {

    const { id } = useParams()
    const [playlist, setPlaylist] = useState([])
    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/playlist/${id}`);
                setPlaylist(data[0])
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
        <div className='OnePlayList'>
            <div className='OnePlayListContainer'>
            <img src={playlist.playlist_cover} alt={playlist.playlist_name} height='300px' />
            <div className='OnePlayListDescription'>
            <div>Name: {playlist.playlist_name}</div>
            <div>created_at: {new Date(playlist.created_at).toDateString()}</div>
            <div>upload_at{new Date(playlist.upload_at).toDateString()}</div>
            </div>
            </div>
            <ListOfSongs className='PlayListSongsList' songList={songList} getIdSong={getIdSong} split={0}/>
        </div>
    )

}

export default OnePlaylist;
