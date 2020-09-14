import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import './Song.css';
import playbutton from '../../images/playbutton.png';

function Song({ song, index, getIdSong, albumDisplay, artistDisplay }) {
    
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false);

    return (
        <li className='song' key={song.title + index + Math.random()}>
            <Modal animation={true} show={openModal} onHide={handleClose} >
                <iframe className="PlaySongModal" width="500vh" height="370vh" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}`} title={song.title} />
                <ReadMore color={'black'} content={song.lyrics} maxChar="65" />
            </Modal>
            <div className='songName' >{song.title}</div>
            <Link to={`/albums/${song.album_ID}`} style={{ display: albumDisplay }} className='albumName' >{song.album_name}</Link><br />
            <Link to={`/artists/${song.artist_ID}`} style={{ display: artistDisplay }} className='artistName' >{song.artist_name}</Link>
            <div className='songLength' >{song.length} </div>
            <div className='songDate' >{new Date(song.created_at).toDateString()}</div>
            <img className='playButton' src={playbutton} alt={''} onClick={() => setOpenModal(true)} />
        </li>
    )
}

export default Song;