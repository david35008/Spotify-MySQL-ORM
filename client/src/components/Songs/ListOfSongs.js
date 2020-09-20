import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Song from './Song';
import './ListOfSongs.css';
import Carousel from 'react-elastic-carousel';
import getIdSong from '../Services/GetYTId';

function ListOfSongs({ query, songList, split = 1, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 450, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1000, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ]

    return (
        <Carousel color="white" breakPoints={breakPoints} >
            {songList.map((song, index) => (
                <Song query={query} key={song.name + song.song_ID} song={song} getIdSong={getIdSong} index={index} albumDisplay={albumDisplay} artistDisplay={artistDisplay} />
            )).splice(split, songList.length - split)}
        </Carousel>
    )
}

export default ListOfSongs;
