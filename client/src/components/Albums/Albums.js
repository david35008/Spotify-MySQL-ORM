import React, { useEffect, useState } from 'react';
import './Albums.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';


function Albums(params) {

const [albumsList, setAlbumsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/albums');
                setAlbumsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);

    const firstAlnum = albumsList.map((album, index) => (
        <li key={album.name + index}>
            <img width="100%" height="400vh" src={album.cover_img} alt={album.name}/>
        </li>
    )).splice(0, 1)

    const listToPrint = albumsList.map((album, index) => {
        debugger
        return (
        <li key={album.name + index}>
            <div>{album.title}</div>
            <img width="200" height="112" src={album.cover_img} alt={album.name}/>
        </li>
    )}).splice(1, albumsList.length - 1)


    return (
        <div>
            <NavBar />
            <div className="firstAlb" >{firstAlnum}</div>
                    <ol className='album-list'>
                        {listToPrint}</ol>
               
        </div>
    )

}

export default Albums;
