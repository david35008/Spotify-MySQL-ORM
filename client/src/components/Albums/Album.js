import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Album.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Album({ album_ID, getIdSong, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    const [songList, setSongsList] = useState([])
    const [album, setAlbums] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/album/${album_ID}`);
                setAlbums(data[0])
                setSongsList(data.concat())
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [album_ID]);

    return (
        <div className='Album'>
            <div className='AlbumContainer'>
                <img src={album.cover_img} alt={album.album_name} height='200' width='300' />
                <div className='AlbumDescription'>
                    <Link to={`/album/${album.album_ID}`} style={{ display: albumDisplay }} className='AlbumName' > {album.album_name}</Link>
                    <Link to={`/artist/${album.artist_ID}`} style={{ display: artistDisplay }} className='AlbumArtist' > {album.artist_name}</Link>
                    {album.created_at && <div className='AlbumCreated_at'>Created_at: {new Date(album.created_at).toDateString()}</div>}
                    {album.upload_at && <div className='AlbumUpload_at' >Upload_at{new Date(album.upload_at).toDateString()}</div>}
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.album_ID }} songList={songList} getIdSong={getIdSong} split={0} albumDisplay={"none"} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Album;