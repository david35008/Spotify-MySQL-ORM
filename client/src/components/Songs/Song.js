import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListOfSongs.css';
import SongIcon from '../../images/SongIcon.png';

function Song({ query, song, albumDisplay, artistDisplay }) {

    return (
        <li className='songNameGlobal'>
            <Link to={`/song/${song.song_ID}?${query.path}=${query.id}`} style={{ color: 'black' }} >
            <img height='120px' width='120px' src={SongIcon} alt=' '/><br/>
            {song.name}</Link><br/>
            <Link to={`/album/${song.album_ID}`} style={{ display: albumDisplay, color: 'black' }}  >{song.album_name}</Link><br />
            <Link to={`/artist/${song.artist_ID}`} style={{ display: artistDisplay }}  >{song.artist_name}</Link>
            <div  >{song.length} </div>
            {song.created_at ?
                <div  >{new Date(song.created_at).toDateString()}</div>
                : <div ></div>
            }
        </li>
    );
};

export default Song;
