import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import { read } from '../Network/Ajax';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../Services/NotFound';
import getIdSong from '../Services/GetYTId';

function OneAlbum() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [album, setAlbums] = useState();
    const [songList, setSongsList] = useState([]);

    useEffect(() => {
        read(`albums/byId/${id}`)
            .then((res) => {
                setAlbums(res[0]);
                setSongsList(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err)
                setLoading(false);
            })
    }, [id]);

    return (
        album ? (<div className='OneAlbum'>
            <div className='OneAlbumContainer'>
                <img src={album.cover_img} alt={album.name} className='OneAlbumImage' />
                <div className='OneAlbumDescription'>
                    <div>Name: {album.album_name}</div>
                    <div>Artist: {album.artist_name}</div>
                    {album.created_at && <div>created_at: {new Date(album.created_at).toDateString()}</div>}
                    {album.upload_at && <div>upload_at{new Date(album.upload_at).toDateString()}</div>}
                </div>
            </div>
            <div className='albumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.album_ID }} songList={songList} getIdSong={getIdSong} albumDisplay={"none"} split={0} />
            </div>
        </div>)
            :
            !loading ?
                <NotFound />
                : <div></div>
    );
};

export default OneAlbum;
