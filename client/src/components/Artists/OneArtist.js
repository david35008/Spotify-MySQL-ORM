import React, { useEffect, useState } from 'react';
import './OneArtist.css';
import { Link } from 'react-router-dom';
import { read } from '../Network/Ajax';
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
        read(`artist/${id}`)
            .then((res) => {
                setArtist(res[0]);
                setSongsList(res);
                debugger
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        read(`albums_ByArtist/${id}`)
            .then((res) => {
                setAlbums(res);
                setLoading(false);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    return (
        artist ?
            <div className='OneArtist'>
                <div className='ArtistContainer'>
                    <img src={artist.image} alt={artist.artist_name} className='artistImage' />
                    <div className='OneArtitstDescriptionContainer'>
                        <div>{artist.artist_name}</div>
                        <div className='OneArtitstDescription'>About: {artist.description}</div>
                        {artist.created_at && <div className='artisrCreatedAt' >created_at: {new Date(artist.created_at).toDateString()}</div>}
                    </div>
                </div>

                <div className='OneArtistSongList' >
                    <Carousel className='OneArtistAlbums' color="white" breakPoints={breakPoints} enableAutoPlay>
                        {albums.map((album) =>
                            <ElementToCarusel query={{ path: "album", id: artist.artist_ID }} key={album.cover_img + album.name} element={album} getIdSong={getIdSong} />
                        )}
                    </Carousel>
                    <ol className='song-list'>
                        {songList.map((song, index) => (
                            <li className='song' key={Math.random()}>
                                <Link to={`/song/${song.song_ID}?artist=${artist.artist_ID}`} className='songName' >
                                    <span>  <img className='imgList' height='70px' width='100px' src={song.cover_img} alt={''} /></span>
                                    <span className='nameAlbumArtist'>
                                        <div> {song.name} </div>
                                        <span className='albumName' >{song.album_name}</span><br />
                                        <span className='artistName' >{song.artist_name}</span>
                                    </span>
                                </Link>
                            </li>
                        )).splice(0, songList.length - 0)}
                    </ol>
                </div>
                {/* <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                    {songList.map((song) => (
                        <ElementToCarusel query={{ path: "song", id: song.artist_ID }} artist={true} key={song.cover_img + song.name} element={song} getIdSong={getIdSong} />
                    ))}
                </Carousel> */}
            </div>
            :
            !loading ?
                <NotFound />
                : <div></div>
    )

}

export default OneArtist;
