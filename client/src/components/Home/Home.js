import React, { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import FirstSong from '../Songs/FirstSong';
import ListOfSongs from '../Songs/ListOfSongs';

function Home() {

    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/songs');
                setSongsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <>
            <NavBar setList={setSongsList} serchType='song' />
            <div className="songContainer" >
                <div className='Home'>
                    <FirstSong songList={songList} getIdSong={getIdSong} />
                    <ListOfSongs songList={songList} getIdSong={getIdSong} />
                </div>
            </div>
        </>
    )
}

export default Home;
