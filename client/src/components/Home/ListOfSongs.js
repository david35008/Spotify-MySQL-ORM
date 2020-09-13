import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Song from './Song';

function ListOfSongs({ songList, getIdSong }) {

    return (
        <ol className='song-list'>
            {songList.length > 1 && <li key={Math.random()} className='song'>
                <span className='songName'>Name:</span>
                <span className='albumName'>Album:</span>
                <span className='artistName'>Artist:</span>
                <span className='songLength'>Length:</span>
                <span className='songDate'>Created At:</span>
                <span >Play:</span>
            </li>}
            {songList.map((song, index) => (
                <Song key={Math.random()} song={song} getIdSong={getIdSong} index={index} />
            )).splice(1, songList.length - 1)}
            </ol>
    )
}

export default ListOfSongs;
