import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import { read } from '../Network/Ajax';
import NavBar from '../NavBar/NavBar';
import PlayList from './PlayList';

function ListOfPlaylists({ getIdSong }) {

    const [playListsList, setPlayListsList] = useState([])

    useEffect(() => {
        read('playLists')
            .then(res => setPlayListsList(res))
    }, []);

    const listToPrint = playListsList.map((playList, index) => {
        return (
            <li key={playList.name + index}>
                < PlayList index={index} playList_ID={playList.playlist_ID} getIdSong={getIdSong} />
            </li>
        )
    })

    return (
        <>
            <NavBar setPlaylists={setPlayListsList} searchTypeProps='Search_Playlist' />
            <h1>PlayLists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfPlaylists;
