import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './OneSong.css';

function SongsListForOneSong({ query, songList, split = 1, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id
    }

    return (
        <ol className='song-list'>
            {songList.map((song, index) => (
                <li className='song' key={Math.random()}>
                    <Link to={`/song/${song.song_ID}?${query.path}=${query.id}`} className='songName' >
                        <span>  <img className='imgList' height='70px' width='100px' src={`https://img.youtube.com/vi/${getIdSong(song.youtube_link)}/0.jpg`} alt={''} /></span>

                        <span className='nameAlbumArtist'>
                            <div> {song.name} </div>
                            <span style={{ display: albumDisplay }} className='albumName' >{song.album_name}</span><br />
                            <span style={{ display: artistDisplay }} className='artistName' >{song.artist_name}</span>
                        </span>
                    </Link>
                </li>
            )).splice(split, songList.length - split)}
        </ol>
    )
}

export default SongsListForOneSong;
