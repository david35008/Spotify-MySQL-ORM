import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './OneSong.css';
import { GetYTId } from '../Services/globalVariables';

function SongsListForOneSong({ query, songList, split = 1, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    return (
        <ol className='song-list'>
            {songList.map((song) => (
                <li className='song' key={song.name+ song.id}>
                    <Link to={`/song/${song.id}?${query.path}=${query.id}`} className='songName' >
                        <span>  <img className='imgList' height='70px' width='100px' src={`https://img.youtube.com/vi/${GetYTId(song.youtube_link)}/0.jpg`} alt={''} /></span>

                        <span className='nameAlbumArtist'>
                            <div> {song.name} </div>
                            <span style={{ display: albumDisplay }} className='albumName' >{song.Album.name}</span><br />
                            <span style={{ display: artistDisplay }} className='artistName' >{song.Artist.name}</span>
                        </span>
                    </Link>
                </li>
            )).splice(split, songList.length - split)}
        </ol>
    )
}

export default SongsListForOneSong;
