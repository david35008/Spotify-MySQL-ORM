import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import { read } from '../Network/Ajax';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import PlayList from './PlayList';

function ListOfPlaylists() {

    const [playListsList, setPlayListsList] = useState([])
    const history = useHistory()
    useEffect(() => {
        read('interactions/playlists/byUser')
            .then(res => setPlayListsList(res.map(playlist=>
                playlist.Playlist
            )))
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
    }, [history]);

    const listToPrint = playListsList.map((playlist, index) => {
        return (
            < PlayList key={playlist.name + playlist.id} index={index} playlist={playlist}/>
        )
    })

    return (
        <>
            <NavBar setPlaylists={setPlayListsList} searchTypeProps='SearchPlaylist' />
            <h1 className='playlistTitle' >PlayLists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfPlaylists;
