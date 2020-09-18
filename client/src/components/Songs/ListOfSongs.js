import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Song from './Song';
import './ListOfSongs.css';
import Carousel from 'react-elastic-carousel';

function ListOfSongs({ query, songList, split = 1, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 450, itemsToShow: 2 },
        { width: 700, itemsToShow: 3 },
        { width: 1000, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ]

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
            {songList.map((song, index) => (
                <Song query={query} key={Math.random()} song={song} getIdSong={getIdSong} index={index} albumDisplay={albumDisplay} artistDisplay={artistDisplay} />
            )).splice(split, songList.length - split)}
        </Carousel>
    )
}

export default ListOfSongs;
