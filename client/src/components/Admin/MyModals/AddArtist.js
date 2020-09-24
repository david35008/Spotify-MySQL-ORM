import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { create } from '../../Network/Ajax';

function AddArtist({ openModal, setOpenModal, formatDate }) {

    const [artistName, setArtistName] = useState('');
    const [artistCreated, setArtistCreated] = useState('');
    const [artistImageLink, setArtistImageLink] = useState('');

    const sendNewArtist = () => {
        const newArtist = {
            name: artistName,
            createdAt: artistCreated,
            uploadAt: formatDate(new Date()),
            coverImg: artistImageLink
        };
        create('artists', newArtist)
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
                    <Modal.Title>Add New Artist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="addNewForm" >
                        <label >Name:</label>
                        <input type="text" onChange={(e) => setArtistName(e.target.value)} required /><br />
                        <label >Created At:</label>
                        <input type="date" onChange={(e) => setArtistCreated(e.target.value)} required /><br />
                        <label >Image Link:</label>
                        <input type="text" onChange={(e) => setArtistImageLink(e.target.value)} required /><br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={sendNewArtist} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddArtist;
