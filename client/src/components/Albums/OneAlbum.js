import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../NotFound/NotFound';

function OneAlbum({ getIdSong }) {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [album, setAlbums] = useState();
    const [songList, setSongsList] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/album/${id}`);
                setAlbums(data[0]);
                setSongsList(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error.message);
            }
        })();
    }, [id]);

    return (
        album ? (<div className='OneAlbum'>
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
            !loading ?
            <NotFound />
            : <div></div>
    );
};

export default OneAlbum;
