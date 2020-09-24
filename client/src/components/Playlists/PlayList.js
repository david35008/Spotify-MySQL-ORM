import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlayList.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function PlayList({ playlist }) {
    
    return (
        <div className='PlayList'>
            <div className='PlayListContainer'>
                <img src={playlist.cover_img} alt={playlist.name} className='playListImage' />
                <div className='PlayListDescription'>
                    <Link to={`/playlist/${playlist.id}`} className='PlayListName' > {playlist.name}</Link>
                    <div className='PlayListCreated_at'>Created_at: {new Date(playlist.createdAt).toDateString()}</div>
                    <div className='PlayListUpload_at' >Upload_at{new Date(playlist.updatedAt).toDateString()}</div>
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "playlist", id: playlist.id }} songList={playlist.Playlists_Songs.map((song) => song.Song)} />
            </div>
        </div>

    )
}

export default PlayList;
