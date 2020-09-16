import React, { useState } from 'react';
import './MyModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AddUser({ openModal, setOpenModal,formatDate }) {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userPreferences, setUserPreferences] = useState('');
  const [userRememberToken, setUserRememberToken] = useState(false);
  const [userCreated, setUserCreated] = useState('');

  const sendNewUser = async () => {
    const newUser = {
      name: userName,
      email: userEmail,
      password: userPassword,
      is_admin: userIsAdmin,
      preferences: userPreferences,
      remember_token: userRememberToken,
      created_at: userCreated,
      upload_at: formatDate(new Date())
    };
    await axios.post('/user', newUser);
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
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="addNewForm" >
            <label >UserName:</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} required/><br />
            <label >Password:</label>
            <input type="password" onChange={(e) => setUserPassword(e.target.value)} required/><br />
            <label >Email:</label>
            <input type="email" onChange={(e) => setUserEmail(e.target.value)} required/><br />
            <label >User Is Admin?</label>
            <input type="checkbox" onClick={(e) =>  setUserIsAdmin(e.target.checked)} /><br />
            <label >Preferences:</label>
            <input type="text" onChange={(e) => setUserPreferences(e.target.value)} required/><br />
            <label >Remember Token?</label>
            <input type="checkbox" onChange={(e) => setUserRememberToken(e.target.checked)} /><br />
            <label >Created_At:</label>
            <input type="date" onChange={(e) => setUserCreated(e.target.value)} required/><br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={sendNewUser} >Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
