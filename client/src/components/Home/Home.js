import React, { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

function Home(params) {

    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/songs');
                console.log(data)
                setSongsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    return (
        <div className='Home'>
            <NavBar />
            <ol className='song-list' >{songList.map((song, index) => (
                <li key={song.title + index} >
                    <div>{song.title}</div>
                    <iframe width="200" height="112" src={song.youtube_link} title={song.title}></iframe>                    
                </li>
            ))}</ol>
        </div>
    )
}

export default Home;
