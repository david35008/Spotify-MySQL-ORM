import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Song from './Song';

function ListOfSongs({ query, songList, split = 1 ,albumDisplay = 'inline', artistDisplay = 'inline'}) {

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <ol className='song-list'>
            {songList.length > split && <li key={Math.random()} className='song'>
                <span className='songName'>Name:</span>
                <span style={{display: albumDisplay}} className='albumName'>Album:</span>
                <span style={{display: artistDisplay}} className='artistName'>Artist:</span>
                <span className='songLength'>Length:</span>
                <span className='songDate'>Created At:</span>
                <span >Play:</span>
            </li>}
            {songList.map((song, index) => (
                <Song query={query} key={Math.random()} song={song} getIdSong={getIdSong} index={index} albumDisplay={albumDisplay} artistDisplay={artistDisplay} />
            )).splice(split, songList.length - split)}
        </ol>
    )
}

export default ListOfSongs;
