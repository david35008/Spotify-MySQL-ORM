import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function MyModal({ openModal, setOpenModal }) {

  const [songName, setSongName] = useState('')
  const [songAlbum, setSongAlbum] = useState('')
  const [songArtist, setSongArtist] = useState('')
  const [songLycris, setSongLycris] = useState('')
  const [songLength, setSongLength] = useState('')
  const [songTrackNumber, setSongTrackNumber] = useState('')
  const [songCreated, setSongCreated] = useState('')
  const [songLink, setSongLink] = useState('')


  function pad(num) { return ('00' + num).slice(-2) };

  // Change the date to SQL date format
  function formatDate(date) {
    let dateStr = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate() + 1)
    return dateStr;
};


const sendNewSong = async () => {
  const newSong = {
    name: songName,
    album_ID: Number(songAlbum),
    artist_ID: Number(songArtist),
    lycris: songLycris,
    length: Number(songLength),
    track_number: Number(songTrackNumber),
    created_at: formatDate(new Date(songCreated)),
    upload_at: formatDate(new Date()),
    youtube_link: songLink
  }

 await axios.post('/song', newSong)
}




  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Modal
        show={openModal}
        onHide={handleClose}
        onEscapeKeyDown={handleClose}
        backdrop="static"
        keyboard={false}
        className="addNewSongModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addNewSongForm" >
            <label >Name:</label>
            <input type="text" onChange={(e)=> setSongName(e.target.value)} required/><br />
            <label >Album:</label>
            <input type="text" onChange={(e)=> setSongAlbum(e.target.value)} /><br />
            <label >Artist:</label>
            <input type="text" onChange={(e)=> setSongArtist(e.target.value)} /><br />
            <label >Lyrics:</label>
            <input type="text" onChange={(e)=> setSongLycris(e.target.value)} /><br />
            <label >Length:</label>
            <input type="text" onChange={(e)=> setSongLength(e.target.value)} /><br />
            <label >Track Number:</label>
            <input type="text" onChange={(e)=> setSongTrackNumber(e.target.value)} /><br />
            <label >Created_At:</label>
            <input type="text" onChange={(e)=> setSongCreated(e.target.value)} /><br />
            <label >Youtube Link:</label>
            <input type="text" onChange={(e)=> setSongLink(e.target.value)} /><br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={()=> {sendNewSong(); handleClose()}} >Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



export default MyModal;
