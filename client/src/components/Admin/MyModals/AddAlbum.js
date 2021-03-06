import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { create, read } from '../../Network/Ajax';

function AddAlbum({ openModal, setOpenModal, formatDate }) {

    const [artistList, setArtistList] = useState([])

    const [albumName, setAlbumName] = useState('');
    const [albumArtist, setAlbumArtist] = useState('');
    const [albumCreated, setAlbumCreated] = useState('');
    const [albumImageLink, setAlbumImageLink] = useState('');

    const getArtistsList = () => {
        read('/api/v1/artists')
            .then(setArtistList)
            .catch(console.error);
    }

    const sendNewAlbum = () => {
        const newAlbum = {
            name: albumName,
            artistId: albumArtist,
            createdAt: albumCreated,
            uploadAt: formatDate(new Date()),
            coverImg: albumImageLink
        };
        create('/api/v1/albums', newAlbum)
            .then(handleClose)
            .catch(console.error)
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
                        <DropdownButton id="dropdown-basic-button" title="Artists" onToggle={getArtistsList} onSelect={setAlbumArtist} >
                            {artistList.map((option) =>
                                <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
                            )}
                        </DropdownButton>
                        <label >Created At:</label>
                        <input type="date" onChange={(e) => setAlbumCreated(e.target.value)} required /><br />
                        <label >Image Link:</label>
                        <input type="text" onChange={(e) => setAlbumImageLink(e.target.value)} required /><br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={sendNewAlbum} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddAlbum;
