import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import './Song.css';
import playbutton from '../../images/playbutton.png';

function Song({ query, song, getIdSong, albumDisplay, artistDisplay }) {

    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false);

    return (
        <li className='song' key={Math.random()}>
            <Modal animation={true} show={openModal} onHide={handleClose} >
                <iframe className="PlaySongModal" width="500vh" height="370vh" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}`} title={song.name} />
                <ReadMore color={'black'} content={song.lyrics} maxChar="65" />
            </Modal>
            <Link to={`/song/${song.song_ID}?${query.path}=${query.id}`} className='songName' >{song.name}</Link>
            <Link to={`/album/${song.album_ID}`} style={{ display: albumDisplay }} className='albumName' >{song.album_name}</Link><br />
            <Link to={`/artist/${song.artist_ID}`} style={{ display: artistDisplay }} className='artistName' >{song.artist_name}</Link>
            <div className='songLength' >{song.length} </div>
            {song.created_at ?
                <div className='songDate' >{new Date(song.created_at).toDateString()}</div>
                : <div className='songDate' ></div>
            }
            <img className='playButton' src={playbutton} alt={''} onClick={() => setOpenModal(true)} />
        </li>
    )
}

export default Song;