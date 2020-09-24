import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import PlayList from './PlayList';

function ListOfPlaylists() {

    const [playListsList, setPlayListsList] = useState([])

    useEffect(() => {
        read('playLists')
            .then(res => setPlayListsList(res))
    }, []);

    const listToPrint = playListsList.map((playlist, index) => {
        return (
            < PlayList key={playlist.name + playlist.id} index={index} playlist={playlist}/>
        )
    })

    return (
        <>
            <NavBar setPlaylists={setPlayListsList} searchTypeProps='Search_Playlist' />
            <h1 className='playlistTitle' >PlayLists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfPlaylists;
