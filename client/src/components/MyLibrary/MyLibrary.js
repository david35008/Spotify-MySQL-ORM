import React, { useEffect, useState, useContext } from 'react';
import { create } from '../Network/Ajax';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import { Interactions } from '../Services/useContextComp';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from '../Home/ElementToCarusel';
import { breakPoints } from '../Services/globalVariables';

const MyLibrary = () => {
    const value = useContext(Interactions);
    // const location = useHistory()

    const [songList, setSongsList] = useState([])

    useEffect(() => {
        create('songs/byUser', [...new Set(value.interactions.map((inter => {
            if (inter.isLiked === true) {
                return inter.songId
            } else { return null }
        })).filter(function (el) {
            return el != null;
        }))])
            .then(setSongsList)
            .catch(console.error)
    }, [value])

    return (
        <>
            <NavBar />
            <h2>this is your personal page {Cookies.get('name')}</h2>
            <h3>This is your favorit songs</h3>
            <Carousel color="white" breakPoints={breakPoints} >
                {songList.map((song) => (
                    <ElementToCarusel query={{ path: "song", id: song.id }} key={song.coverImg + song.name} element={song} />
                ))}
            </Carousel>
        </>
    )
}

export default MyLibrary;