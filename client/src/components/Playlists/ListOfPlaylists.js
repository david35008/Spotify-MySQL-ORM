import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import PlayList from './PlayList';

function ListOfPlaylists({ getIdSong }) {

    const [playListsList, setPlayListsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/playLists');
                setPlayListsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    const listToPrint = playListsList.map((playList, index) => {
        return (
            <li key={playList.name + index}>
                < PlayList index={index} playList_ID={playList.playlist_ID} getIdSong={getIdSong}/>
            </li>
        )
    })


    return (
        <>
            <NavBar setList={setPlayListsList} serchType='playlist' />
            <h1>Top PlayLists</h1>
            <ol>
                {listToPrint}
            </ol>
        </>
    )
}

export default ListOfPlaylists;
