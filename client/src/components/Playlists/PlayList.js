import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { read } from '../Network/Ajax';
import './PlayList.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function PlayList({ playList_ID, getIdSong }) {

    const [songList, setSongsList] = useState([])
    const [playList, setPlayList] = useState([])

    useEffect(() => {
        read(`playLists/byId/${playList_ID}`)
            .then(res => {
                setPlayList(res[0])
                setSongsList(res)
            })
            .catch(console.error)
    }, [playList_ID]);

    return (
        <div className='PlayList'>
            <div className='PlayListContainer'>
                <img src={playList.playlist_cover} alt={playList.playlist_name} className='playListImage' />
                <div className='PlayListDescription'>
                    <Link to={`/playlist/${playList.playlist_ID}`} className='PlayListName' > {playList.playlist_name}</Link>
                    {/* <Link to={`/artists/${playList.artist_ID}`} className='AlbumArtist' > {playList.artist_name}</Link> */}
                    <div className='PlayListCreated_at'>Created_at: {new Date(playList.playlist_create).toDateString()}</div>
                    <div className='PlayListUpload_at' >Upload_at{new Date(playList.playlist_upload).toDateString()}</div>
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "playlist", id: playList.playlist_ID }} songList={songList} getIdSong={getIdSong} split={0} />
            </div>
        </div>

    )
}

export default PlayList;
