import React, { useEffect, useState } from 'react';
import './OneArtist.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from '../Home/ElementToCarusel';
import NotFound from '../NotFound/NotFound';


function OneArtist({ getIdSong, breakPoints }) {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState();
    const [songList, setSongsList] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let { data } = await axios.get(`/artist/${id}`);
                setArtist(data[0]);
                setSongsList(data);
                data = await axios.get(`/albums_ByArtist/${id}`);
                setAlbums(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error.message);
            }
        })();
    }, [id]);

    return (
        artist ?
            <div className='OneArtist'>
                <div className='ArtistContainer'>
                    <img src={artist.image} alt={artist.artist_name} height='300px' />
                    <div className='OneArtitstDescription'>
                        <div>Name: {artist.artist_name}</div>
                        {artist.created_at && <div>created_at: {new Date(artist.created_at).toDateString()}</div>}
                        {artist.upload_at && <div>upload_at{new Date(artist.upload_at).toDateString()}</div>}
                    </div>
                </div>
                <Carousel className='OneArtistAlbums' color="white" breakPoints={breakPoints} enableAutoPlay>
                    {albums.map((album) =>
                        <ElementToCarusel query={{ path: "album", id: artist.artist_ID }} key={Math.random()} element={album} getIdSong={getIdSong} />
                    )}
                </Carousel>

                <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                    {songList.map((song) => (
                        <ElementToCarusel query={{ path: "song", id: song.artist_ID }} artist={true} key={Math.random()} element={song} getIdSong={getIdSong} />
                    ))}
                </Carousel>
            </div>
            :
            !loading ?
                <NotFound />
                : <div></div>
    )

}

export default OneArtist;
