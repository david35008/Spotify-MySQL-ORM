import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { create } from '../../Network/Ajax';
import { formatDate } from '../../Services/globalVariables'

function AddPlayList({ openModal, setOpenModal }) {

    const [playListName, setPlayListName] = useState('');
    const [playListCreated, setPlayListCreated] = useState('');
    const [playListImageLink, setplayListImageLink] = useState('');

    const sendNewPlayList = () => {
        const sendNewPlayList = {
            name: playListName,
            createdAt: playListCreated,
            uploadAt: formatDate(new Date()),
            coverImg: playListImageLink
        };

        create('/api/v1/playlists', sendNewPlayList)
            .then((res) =>
                create('/api/v1/interactions/playlist', {
                    playlistId: res.id
                })
                    .then(handleClose)
                    .catch(console.error))
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
