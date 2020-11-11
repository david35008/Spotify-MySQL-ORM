import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListOfSongs.css';
import { GetYTId } from '../Services/globalVariables';

function Song({ query, song, albumDisplay, artistDisplay }) {
    return (
        <li className='songNameGlobal'>
            <Link to={`/song/${song.id}?${query.path}=${query.id}`} style={{ color: 'black' }} >
                <img height='90px' width='120px' src={`https://img.youtube.com/vi/${GetYTId(song.youtubeLink)}/0.jpg`} alt=' ' /><br />
                {song.name}</Link><br />
            <Link to={`/album/${song.albumId}`} style={{ display: albumDisplay, color: 'black' }}  >{song.Album.name}</Link><br />
            <Link to={`/artist/${song.artistId}`} style={{ display: artistDisplay }}  >{song.Artist.name}</Link>
            <div  >{song.length} </div>
            {song.createdAt ?
                <div  >{new Date(song.createdAt).toDateString()}</div>
                : <div ></div>
            }
        </li>
    );
};

export default Song;
