import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { read, create } from '../../Network/Ajax';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function AddSong({ openModal, setOpenModal, formatDate }) {

  const [artistList, setArtistList] = useState([])
  const [albumsList, setAlbumsList] = useState([])

  const [songName, setSongName] = useState('');
  const [songArtist, setSongArtist] = useState();
  const [songAlbum, setSongAlbum] = useState('');
  const [songTrackNumber, setSongTrackNumber] = useState('');
  const [songLength, setSongLength] = useState('');
  const [songLycris, setSongLycris] = useState('');
  const [songCreated, setSongCreated] = useState('');
  const [songLink, setSongLink] = useState('');

  const getArtistsList = () => {
    read('/api/v1/artists')
      .then(setArtistList)
      .catch(console.error);
  }

  const getAlbumsList = (artistID) => {
    read(`/api/v1/artists/byId/${artistID}`)
      .then((res) => {
        setAlbumsList(res.Albums)
        setSongArtist(artistID)
      })
      .catch(console.error);
  }

  const getTrackNumber = (albumID) => {
    setSongAlbum(albumID)
    read(`/api/v1/albums/byId/${albumID}`)
      .then((res) => {
        setSongTrackNumber(Math.max(...res.Songs.map((album) => album.trackNumber)) + 1)
        console.log(Math.max(...res.Songs.map((album) => album.trackNumber)) + 1);
      })
      .catch(console.error);
  }

  const sendNewSong = () => {
    const newSong = {
      name: songName,
      artistId: songArtist,
      albumId: songAlbum,
      trackNumber: songTrackNumber,
      length: songLength,
      lyrics: songLycris,
      createdAt: songCreated,
      uploadAt: formatDate(new Date()),
      youtubeLink: songLink
    };
    create('/api/v1/songs', newSong)
      .then(handleClose)
      .catch(console.error);
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
            <input type="text" onChange={(e) => setSongName(e.target.value)} required /><br />
            <label >Artist:</label>
            <DropdownButton id="dropdown-basic-button" title="Artists" onToggle={getArtistsList} onSelect={setSongArtist} >
              {artistList.map((option) =>
                <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
              )}
            </DropdownButton>
            {songArtist &&
              <DropdownButton id="dropdown-basic-button" title="Albums" onToggle={() => getAlbumsList(songArtist)} onSelect={getTrackNumber} >
                {albumsList.map((option) =>
                  <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
                )}
              </DropdownButton>}
            <label >Length:</label>
            <input type="time" step="2" onChange={(e) => setSongLength(e.target.value)} required /><br />
            <label >Lyrics:</label>
            <input type="text" onChange={(e) => setSongLycris(e.target.value)} required /><br />
            <label >Created At:</label>
            <input type="date" onChange={(e) => setSongCreated(e.target.value)} required /><br />
            <label >Youtube Link:</label>
            <input type="text" onChange={(e) => setSongLink(e.target.value)} required /><br />
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
