import React, { useEffect, useState } from 'react';
import './OneArtist.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import ListOfSongs from '../Songs/ListOfSongs';
import Album from '../Albums/Album';


function OneArtist() {

    const { id } = useParams()
    const [artist, setArtist] = useState([])
    const [songList, setSongsList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/artist/${id}`);
                setArtist(data[0])
                setSongsList(data)
                // debugger
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [id]);

    return (
        <div className='OneArtist'>
            <div className='ArtistContainer'>
                <img src={artist.cover_img} alt={artist.name} height='300px' />
                <div className='OneArtitstDescription'>
                    <div>Name: {artist.name}</div>
                    {artist.created_at && <div>created_at: {new Date(artist.created_at).toDateString()}</div>}
                    {artist.upload_at && <div>upload_at{new Date(artist.upload_at).toDateString()}</div>}
                </div>
            </div>
           <ol className='OneArtistAlbums' > {[...new Set(songList.map((song) => {
                return song.album_ID
            }))].map((id, index) => {
              return  <Album album_ID={id} index={index} albumDisplay={"none"}  artistDisplay={"none"}/>
            })}</ol>
            {/* <ListOfSongs songList={songList} getIdSong={getIdSong} artistDisplay={"none"} albumDisplay={"none"} split={0} /> */}
        </div>
    )

}

export default OneArtist;
