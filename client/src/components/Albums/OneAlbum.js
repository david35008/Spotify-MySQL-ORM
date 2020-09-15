import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../NotFound/NotFound';


function OneAlbum({ getIdSong }) {

    const { id } = useParams()
    const [album, setAlbums] = useState([])
    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/album/${id}`);
                setAlbums(data[0])
                setSongsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [id]);

    return (
        (songList.length > 0) ? (<div className='OneAlbum'>
            <div className='OneAlbumContainer'>
                <img src={album.cover_img} alt={album.name} height='300px' />
                <div className='OneAlbumDescription'>
                    <div>Name: {album.album_name}</div>
                    <div>Artist: {album.artist_name}</div>
                    {album.created_at && <div>created_at: {new Date(album.created_at).toDateString()}</div>}
                    {album.upload_at && <div>upload_at{new Date(album.upload_at).toDateString()}</div>}
                </div>
            </div>
            <ListOfSongs query={{ path: "album", id: album.album_ID }} className='albumSongsList' songList={songList} getIdSong={getIdSong} albumDisplay={"none"} split={0} />
        </div>)
            :
            <NotFound />
    )

}

export default OneAlbum;
