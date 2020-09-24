import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlayList.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function PlayList({ playlist }) {
    
    return (
        <div className='PlayList'>
            <div className='PlayListContainer'>
                <img src={playlist.coverImg} alt={playlist.name} className='playListImage' />
                <div className='PlayListDescription'>
                    <Link to={`/playlist/${playlist.id}`} className='PlayListName' > {playlist.name}</Link>
                    <div className='PlayListCreatedAt'>Created At: {new Date(playlist.createdAt).toDateString()}</div>
                    <div className='PlayListUploadAt' >Upload At{new Date(playlist.updatedAt).toDateString()}</div>
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "playlist", id: playlist.id }} songList={playlist.PlaylistsSongs.map((song) => song.Song)} />
            </div>
        </div>

    )
}

export default PlayList;
