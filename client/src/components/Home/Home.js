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

    const firstSong = songList.map((song, index) => (
        <li key={song.title + index}>
            <iframe width="100%" height="400vh" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}`} title={song.title}></iframe>
        </li>
    )).splice(0, 1)

    const listToPrint = songList.map((song, index) => (
        <li key={song.title + index}>
            <div>{song.title}</div>
            <iframe width="200" height="112" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}`} title={song.title}></iframe>
        </li>
    )).splice(1, songList.length - 1)


    return (
        <>
            <NavBar setSongsList={setSongsList} />
            <div className="songContainer" >
                <div className='Home'>
                    <div className="firstSong" >{firstSong}</div>
                    <ol className='song-list'>
                        {listToPrint}</ol>
                </div>
            </div>
        </>
    )
}

export default Home;
