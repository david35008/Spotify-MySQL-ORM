import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { create } from '../../Network/Ajax';

function AddPlayList({ openModal, setOpenModal, formatDate }) {

    const [playListName, setPlayListName] = useState('');
    const [playListCreated, setPlayListCreated] = useState('');
    const [playListImageLink, setplayListImageLink] = useState('');
    const [userId, setUsetId] = useState('');

    const sendNewPlayList = () => {
        const sendNewPlayList = {
            name: playListName,
            createdAt: playListCreated,
            uploadAt: formatDate(new Date()),
            coverImg: playListImageLink,
            userId: userId
        };
        create('playlists', sendNewPlayList)
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
                    <Modal.Title>Add New PlayList</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="addNewForm" >
                        <label >Name:</label>
                        <input type="text" onChange={(e) => setPlayListName(e.target.value)} required /><br />
                        <label >Created At:</label>
                        <input type="date" onChange={(e) => setPlayListCreated(e.target.value)} required /><br />
                        <label >Image Link:</label>
                        <input type="text" onChange={(e) => setplayListImageLink(e.target.value)} required /><br />
                        <label >User ID:</label>
                        <input type="text" onChange={(e) => setUsetId(e.target.value)} required /><br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={sendNewPlayList} >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddPlayList;
