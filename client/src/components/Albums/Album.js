import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { read } from '../Network/Ajax';
import './Album.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Album({ album_ID, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    const [songList, setSongsList] = useState([])
    const [album, setAlbums] = useState([])

    useEffect(() => {
        let isMounted = true;
        read(`albums/byId/${album_ID}`)
            .then((res) => {
                if (isMounted) {
                    setAlbums(res[0])
                    setSongsList(res)
                }
            })
            .catch(console.error)
        return () => { isMounted = false };
    }, [album_ID]);

    return (
        <div className='Album'>
            <div className='AlbumContainer'>
                <img src={album.cover_img} alt={album.album_name} className='albums_img' />
                <div className='AlbumDescription'>
                    <Link to={`/album/${album.album_ID}`} style={{ display: albumDisplay }} className='AlbumName' > {album.album_name}</Link>
                    <Link to={`/artist/${album.artist_ID}`} style={{ display: artistDisplay }} className='AlbumArtist' > {album.artist_name}</Link>
                    {album.created_at && <div className='AlbumCreated_at'>{new Date(album.created_at).toDateString()}</div>}
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.album_ID }} songList={songList} albumDisplay={"none"} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Album;