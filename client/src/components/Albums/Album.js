import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Album.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Album({ album, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    return (
        <div className='Album'>
            <div className='AlbumContainer'>
                <img src={album.cover_img} alt={album.name} className='albums_img' />
                <div className='AlbumDescription'>
                    <Link to={`/album/${album.id}`} style={{ display: albumDisplay }} className='AlbumName' > {album.name}</Link>
                    <Link to={`/artist/${album.artist_id}`} style={{ display: artistDisplay }} className='AlbumArtist' > {album.Artist.name}</Link>
                    {album.createdAt && <div className='AlbumCreated_at'>{new Date(album.createdAt).toDateString()}</div>}
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.id }} songList={album.Songs} albumDisplay={"none"} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Album;