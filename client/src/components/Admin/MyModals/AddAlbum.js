import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { create } from '../../Network/Ajax';

function AddAlbum({ openModal, setOpenModal, formatDate }) {

    const [albumName, setAlbumName] = useState('');
    const [albumArtist, setAlbumArtist] = useState('');
    const [albumCreated, setAlbumCreated] = useState('');
    const [albumImageLink, setAlbumImageLink] = useState('');

    const sendNewAlbum = () => {
        const newAlbum = {
            name: albumName,
            artist_ID: albumArtist,
            created_at: albumCreated,
            upload_at: formatDate(new Date()),
            cover_img: albumImageLink
        };
        create('album', newAlbum)
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
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
                    <Modal.Title>Add New Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="addNewForm" >
                        <label >Name:</label>
                        <input type="text" onChange={(e) => setAlbumName(e.target.value)} required /><br />
                        <label >Artist:</label>
                        <input type="number" onChange={(e) => setAlbumArtist(e.target.value)} required /><br />
                        <label >Created_At:</label>
                        <input type="date" onChange={(e) => setAlbumCreated(e.target.value)} required /><br />
                        <label >Image Link:</label>
                        <input type="text" onChange={(e) => setAlbumImageLink(e.target.value)} required /><br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={sendNewAlbum()} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddAlbum;
