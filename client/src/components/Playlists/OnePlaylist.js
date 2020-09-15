import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
    
function OnePlaylist({ getIdSong }) {

    const { id } = useParams()
    const [playList, setPlaylist] = useState([])
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

    return (
        <div className='OnePlayList'>
            <div className='OnePlayListContainer'>
                <img src={playList.playlist_cover} alt={playList.playlist_name} height='300px' />
                <div className='OnePlayListDescription'>
                    <div>Name: {playList.playlist_name}</div>
                    <div>created_at: {new Date(playList.created_at).toDateString()}</div>
                    <div>upload_at{new Date(playList.upload_at).toDateString()}</div>
                </div>
            </div>
            <ListOfSongs query={{ path: "playlist", id: playList.playlist_ID }} className='PlayListSongsList' songList={songList} getIdSong={getIdSong} split={0} />
        </div>
    )

}

export default OnePlaylist;
