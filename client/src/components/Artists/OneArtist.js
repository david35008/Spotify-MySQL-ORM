import React, { useEffect, useState } from 'react';
import './OneArtist.css';
import { Link } from 'react-router-dom';
import { read } from '../Network/Ajax';
import { useParams } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from '../Home/ElementToCarusel';
import NotFound from '../Services/NotFound';
import { GetYTId, breakPoints } from '../Services/globalVariables';

function OneArtist() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState();
    const [songList, setSongsList] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [finish, setFinish] = useState(false)

    useEffect(() => {
        read(`artists/byId/${id}`)
            .then((res) => {
                    setArtist(res);
                    setSongsList(res.Songs);
                    setAlbums(res.Albums)
                    setFinish(true)
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    return (
        finish ?
            <div className='OneArtist'>
                <div className='ArtistContainer'>
                    <img src={artist.cover_img} alt={artist.name} className='artistImage' />
                    <div className='OneArtitstDescriptionContainer'>
                        <div>{artist.name}</div>
                        <div className='OneArtitstDescription'>About: {artist.description}</div>
                        {artist.updatedAt && <div className='artisrCreatedAt' >created_at: {new Date(artist.updatedAt).toDateString()}</div>}
                    </div>
                </div>

                <div className='OneArtistSongList' >
                    <Carousel className='OneArtistAlbums' color="white" breakPoints={breakPoints} >
                        {albums.map((album) =>
                            <ElementToCarusel query={{ path: "album", id: artist.id }} key={album.cover_img + album.name} element={album} />
                        )}
                    </Carousel>
                    <ol className='song-list'>
                        {songList.map((song, index) => (
                            <li className='song' key={Math.random()}>
                                <Link to={`/song/${song.id}?artist=${artist.id}`} className='songName' >
                                    <span>  <img className='imgList' height='70px' width='100px' src={`https://img.youtube.com/vi/${GetYTId(song.youtube_link)}/0.jpg`} alt={''} /></span>
                                    <span className='nameAlbumArtist'>
                                        <div> {song.name} </div>
                                        <span className='albumName' >{albums[0].name}</span><br />
                                        <span className='artistName' >{artist.name}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            :
            !loading ?
                <NotFound />
                : <div></div>
    )

}

export default OneArtist;
