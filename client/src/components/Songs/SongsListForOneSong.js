import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './ListOfSongs.css';

function SongsListForOneSong({ query, songList, split = 1 ,albumDisplay = 'inline', artistDisplay = 'inline'}) {

    return (
        <ol className='song-list'>
            {songList.length > split && <li key={Math.random()} className='song'>
                <span className='songName'>Name:</span>
                <span style={{display: albumDisplay}} className='albumName'>Album:</span>
                <span style={{display: artistDisplay}} className='artistName'>Artist:</span>
                <span className='songLength'>Length:</span>
                <span className='songDate'>Created At:</span>
            </li>}
            {songList.map((song, index) => (
                <li className='song' key={Math.random()}>
                <Link to={`/song/${song.song_ID}?${query.path}=${query.id}`} className='songName' >{song.name}</Link>
                <Link to={`/album/${song.album_ID}`} style={{ display: albumDisplay }} className='albumName' >{song.album_name}</Link><br />
                <Link to={`/artist/${song.artist_ID}`} style={{ display: artistDisplay }} className='artistName' >{song.artist_name}</Link>
                <div className='songLength' >{song.length} </div>
                {song.created_at ?
                    <div className='songDate' >{new Date(song.created_at).toDateString()}</div>
                    : <div className='songDate' ></div>
                }
            </li>
            )).splice(split, songList.length - split)}
        </ol>
    )
}

export default SongsListForOneSong;
