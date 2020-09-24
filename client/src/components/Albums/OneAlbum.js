import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import { read } from '../Network/Ajax';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../Services/NotFound';

function OneAlbum() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState();
    const [songList, setSongsList] = useState([]);

    useEffect(() => {
        read(`albums/byId/${id}`)
            .then((res) => {
                setAlbum(res);
                setSongsList(res.Songs);
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
                    <div>Name: {album.name}</div>
                    <div>Artist: {album.Artist.name}</div>
                    {album.created_at && <div>created_at: {new Date(album.created_at).toDateString()}</div>}
                    {album.upload_at && <div>upload_at{new Date(album.upload_at).toDateString()}</div>}
                </div>
            </div>
            <div className='albumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.id }} songList={songList} albumDisplay={"none"} />
            </div>
        </div>)
            :
            !loading ?
                <NotFound />
                : <div></div>
    );
};

export default OneAlbum;
