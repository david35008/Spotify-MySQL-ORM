import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import { read } from '../Network/Ajax';
import { useParams, useHistory } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../Services/NotFound';

function OneAlbum() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState();
    const [songList, setSongsList] = useState([]);
    const history = useHistory()
    useEffect(() => {
        read(`albums/byId/${id}`)
            .then((res) => {
                setAlbum(res);
                setSongsList(res.Songs);
                setLoading(false);
            })
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
    }, [id, history]);

    return (
        album ? (<div className='OneAlbum'>
            <div className='OneAlbumContainer'>
                <img src={album.coverImg} alt={album.name} className='OneAlbumImage' />
                <div className='OneAlbumDescription'>
                    <div>Name: {album.name}</div>
                    <div>Artist: {album.Artist.name}</div>
                    {album.createdAt && <div>created At: {new Date(album.createdAt).toDateString()}</div>}
                    {album.uploadAt && <div>upload At{new Date(album.uploadAt).toDateString()}</div>}
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
