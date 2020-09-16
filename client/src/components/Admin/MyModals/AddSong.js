import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AddSong({ openModal, setOpenModal,formatDate }) {

  const [songName, setSongName] = useState('');
  const [songAlbum, setSongAlbum] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songLycris, setSongLycris] = useState('');
  const [songLength, setSongLength] = useState('');
  const [songTrackNumber, setSongTrackNumber] = useState('');
  const [songCreated, setSongCreated] = useState('');
  const [songLink, setSongLink] = useState('');

  const sendNewSong = async () => {
    const newSong = {
      name: songName,
      album_ID: songAlbum,
      artist_ID: songArtist,
      lyrics: songLycris,
      length: songLength,
      track_number: songTrackNumber,
      created_at: songCreated,
      upload_at: formatDate(new Date()),
      youtube_link: songLink
    };
    await axios.post('/song', newSong);
  };

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Modal
        show={openModal}
        onHide={handleClose}
        onEscapeKeyDown={handleClose}
        backdrop="static"
        keyboard={false}
        className="addNewModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addNewForm" >
            <label >Name:</label>
            <input type="text" onChange={(e) => setSongName(e.target.value)} required/><br />
            <label >Album:</label>
            <input type="number" onChange={(e) => setSongAlbum(e.target.value)} required/><br />
            <label >Artist:</label>
            <input type="number" onChange={(e) => setSongArtist(e.target.value)} required/><br />
            <label >Lyrics:</label>
            <input type="text" onChange={(e) => setSongLycris(e.target.value)} required/><br />
            <label >Length:</label>
            <input type="time" onChange={(e) => setSongLength(e.target.value)} required/><br />
            <label >Track Number:</label>
            <input type="number" onChange={(e) => setSongTrackNumber(e.target.value)} required/><br />
            <label >Created_At:</label>
            <input type="date" onChange={(e) => setSongCreated(e.target.value)} required/><br />
            <label >Youtube Link:</label>
            <input type="text" onChange={(e) => setSongLink(e.target.value)} required/><br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={sendNewSong} >Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSong;
