import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Album.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Album({ album_ID, index, albumDisplay = 'inline', artistDisplay = 'inline' }) {

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

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        <div className='Album'>
            <div className='AlbumContainer'>
                <img src={album.cover_img} alt={album.name} height='200' width='300' />
                <div className='AlbumDescription'>
                    <Link to={`/albums/${album.album_ID}`} style={{ display: albumDisplay }} className='AlbumName' > {album.name}</Link>
                    <Link to={`/artists/${album.artist_ID}`} style={{ display: artistDisplay }} className='AlbumArtist' > {album.artist_name}</Link>
                    {album.created_at&&<div className='AlbumCreated_at'>Created_at: {new Date(album.created_at).toDateString()}</div>}
                    {album.upload_at&&<div className='AlbumUpload_at' >Upload_at{new Date(album.upload_at).toDateString()}</div>}
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.album_ID}} songList={songList} getIdSong={getIdSong} split={0} albumDisplay={"none"} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Album;