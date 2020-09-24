import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Artist.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';

function Artist({ artist }) {
    return (
        <div className='Artist'>
            <div className='ArtistContainer'>
                <img src={artist.cover_img} alt={artist.name} className='Artist-img'/>
                <div className='ArtistDescription'>
                    <Link to={`/artist/${artist.id}`} className='ArtistName' > {artist.name}</Link>
                    {artist.createdAt && <div className='ArtistCreated_at'>Created_at: {new Date(artist.createdAt).toDateString()}</div>}
                </div>
            </div>
            <div className='ArtistSongsList' >
                <ListOfSongs query={{ path: "artist", id: artist.id }} songList={artist.Songs} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Artist;