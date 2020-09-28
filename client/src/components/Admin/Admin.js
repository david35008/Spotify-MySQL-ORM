import React, { useEffect, useState } from 'react';
import { create } from '../Network/Ajax';
import { useHistory } from 'react-router-dom';
import { removeTokents } from '../Services/globalVariables';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import AddSong from './MyModals/AddSong';
import AddAlbum from './MyModals/AddAlbum';
import AddArtist from './MyModals/AddArtist';
import AddPlayList from './MyModals/AddPlayList';
import AddUser from './MyModals/AddUser';
import AddSongToPlayList from './MyModals/AddSongToPlayList';

function Admin() {

  const [openSongModal, setOpenSongModal] = useState(false);
  const [openAlbumModal, setOpenAlbumModal] = useState(false);
  const [openArtistModal, setOpenArtistModal] = useState(false);
  const [openPlayListModal, setOpenPlayListModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [OpenSongToPlayListModal, setOpenSongToPlayListModal] = useState(false);
  const history = useHistory()

  function pad(num) { return ('00' + num).slice(-2) };

  // Change the date to SQL date format
  function formatDate(date) {
    let dateStr = date.getUTCFullYear() + '-' +
      pad(date.getUTCMonth() + 1) + '-' +
      pad(date.getUTCDate() + 1)
    return dateStr;
  };

  useEffect(() => {
    create('/users/valid', Cookies.get())
      .then(res => {
        if(res.isAdmin === false) {
          removeTokents();
        history.push('/');
        }
      })
      .catch(console.error)
  }, [history])

  return (
    <>
      <NavBar />
      <h1>This is an admin page</h1>
      <button onClick={() => setOpenSongModal(true)} >Add new Song</button>
      {openSongModal && <AddSong openModal={openSongModal} setOpenModal={setOpenSongModal} formatDate={formatDate} />}
      <button onClick={(e) => setOpenArtistModal(true)}>Add new Artist</button>
      {openArtistModal && <AddArtist openModal={openArtistModal} setOpenModal={setOpenArtistModal} formatDate={formatDate} />}
      <button onClick={(e) => setOpenAlbumModal(true)}>Add new Album</button>
      {openAlbumModal && <AddAlbum openModal={openAlbumModal} setOpenModal={setOpenAlbumModal} formatDate={formatDate} />}
      <button onClick={(e) => setOpenPlayListModal(true)}>Add new Playlist</button>
      {openPlayListModal && <AddPlayList openModal={openPlayListModal} setOpenModal={setOpenPlayListModal} formatDate={formatDate} />}
      <button onClick={(e) => setOpenUserModal(true)}>Add new User</button>
      {openUserModal && <AddUser openModal={openUserModal} setOpenModal={setOpenUserModal} formatDate={formatDate} />}
      <button onClick={(e) => setOpenSongToPlayListModal(true)}>Add Song To Playlist</button>
      {OpenSongToPlayListModal && <AddSongToPlayList openModal={OpenSongToPlayListModal} setOpenModal={setOpenSongToPlayListModal} formatDate={formatDate} />}
    </>
  );

};

export default Admin;
