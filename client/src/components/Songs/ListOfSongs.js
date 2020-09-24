import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Song from './Song';
import './ListOfSongs.css';
import Carousel from 'react-elastic-carousel';
import { breakPoints } from '../Services/globalVariables';

function ListOfSongs({ query, songList, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    return (
        <Carousel color="white" breakPoints={breakPoints} >
            {songList.map((song, index) => (
                <Song query={query} key={song.name + song.id} song={song} index={index} albumDisplay={albumDisplay} artistDisplay={artistDisplay} />
            ))}
        </Carousel>
    )
}

export default ListOfSongs;
