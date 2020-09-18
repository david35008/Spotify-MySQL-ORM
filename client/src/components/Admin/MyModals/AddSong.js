import React, { useEffect, useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { read, create } from '../../Network/Ajax';
import Select from 'react-select';
// import TryGetData from '../../Songs/tryGetData';

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

  useEffect(() => {
    (() => {
      read('artists')
        .then((res) => {
          setArtistList(res);
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  }, []);

  const artistOptions = artistList.map((artist) => {
    return {
      value: artist.artist_ID, label: artist.name
    }
  })

  const getAlbumsList = (artistID) => {
    read(`albums_ByArtist/${artistID}`)
      .then((res) => {
        setAlbumsList(res)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  let albumOptions = albumsList.map((album) => {
    return {
      value: album.album_ID, label: album.name
    }
  })

  const getTrackNumber = (albumID) => {
    read(`album/${albumID}`)
      .then((res) => {
        setSongTrackNumber(Math.max(...res.map((album) => album.track_number)) + 1)
        console.log(Math.max(...res.map((album) => album.track_number)) + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const sendNewSong = () => {
    const newSong = {
      name: songName,
      artist_ID: songArtist,
      album_ID: songAlbum,
      track_number: songTrackNumber,
      length: songLength,
      lyrics: songLycris,
      created_at: songCreated,
      upload_at: formatDate(new Date()),
      youtube_link: songLink
    };
    create('song', newSong)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => setOpenModal(false);

  // const [openYT, setopenYT] =useState(false);

  // const handleClike =() => {
  //   setopenYT(true)
  // }

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


          {/* {openYT && <TryGetData link={songLink} />}
          <label >Youtube Link:</label>
          <input type="text" onChange={(e) => setSongLink(e.target.value)} required /><br />
          <button onClick={handleClike} >Load</button> */}

          <form className="addNewForm" >
            <label >Name:</label>
            <input type="text" onChange={(e) => setSongName(e.target.value)} required /><br />
            <label >Artist:</label>
            <Select options={artistOptions} onChange={(e) => { setSongArtist(e.value); getAlbumsList(e.value); }} />
            {songArtist && (
              <>
                <label >Album:</label>
                <Select options={albumOptions} onChange={(e) => { setSongAlbum(e.value); getTrackNumber(e.value) }} /></>)}
            {/* <label >Track Number:</label>
            <input type="number" onChange={(e) => setSongTrackNumber(e.target.value)} required /><br /> */}
            <label >Length:</label>
            <input type="time" step="2" onChange={(e) => setSongLength(e.target.value)} required /><br />
            <label >Lyrics:</label>
            <input type="text" onChange={(e) => setSongLycris(e.target.value)} required /><br />
            <label >Created_At:</label>
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
