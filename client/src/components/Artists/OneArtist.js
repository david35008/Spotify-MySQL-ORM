import React, { useEffect, useState } from 'react';
import './OneArtist.css';
import { Link } from 'react-router-dom';
import { read, create } from '../Network/Ajax';
import { useParams, useHistory } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from '../Home/ElementToCarusel';
import NotFound from '../Services/NotFound';
import { GetYTId, breakPoints } from '../Services/globalVariables';
import like from '../../images/like.png';
import likeActive from '../../images/likeActive.png'
import dislike from '../../images/disLike.png';
import dislikeActive from '../../images/dislikeActive.png'

function OneArtist() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [artist, setArtist] = useState();
    const [songList, setSongsList] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [finish, setFinish] = useState(false)
    const [likeButtonSrc, setLikeButtonSrc] = useState(like)
    const [disLikeButtonSrc, setDisLikeButtonSrc] = useState(dislike)

    const history = useHistory()
    useEffect(() => {
        read(`artists/byId/${id}`)
            .then((res) => {
                setArtist(res);
                setSongsList(res.Songs);
                setAlbums(res.Albums)
                setLoading(false)
                setFinish(true)
            }).catch(err => {
                if (err.status === 403) {
                    history.push('/')
                } setLoading(false)
            })
        read('interactions/artists/userInteractions')
            .then(res => {
                switch (res.filter((artist) => {
                    return artist.artistId === parseInt(id)
                })[0].isLiked) {
                    case true:
                        setLikeButtonSrc(likeActive)
                        break;
                    case undefined:
                        break;
                    case false:
                        setDisLikeButtonSrc(dislikeActive)
                        break;
                    default:
                        break;
                }
            })
            .catch(console.error)
    }, [id, history]);



    const handleLikeButton = (e) => {
        const newInteraction = {
            artistId: artist.id,
            isLiked: true,
        }
        create('interactions/artists', newInteraction)
            .then(res => {
                setLikeButtonSrc(likeActive)
                setDisLikeButtonSrc(dislike)
            })
            .catch(console.error);
    }

    const handleDisLikeButton = (e) => {
        const newInteraction = {
            artistId: artist.id,
            isLiked: false,
        }
        create('interactions/artists', newInteraction)
            .then(res => {
                setDisLikeButtonSrc(dislikeActive)
                setLikeButtonSrc(like)
            })
            .catch(console.error);
    }

    return (
        finish ?
            <div className='OneArtist'>
                <div className='ArtistContainer'>
                    <img src={artist.coverImg} alt={artist.name} className='artistImage' />
                    <div className='OneArtitstDescriptionContainer'>
                        <div>{artist.name}</div>
                        <div className='OneArtitstDescription'>About: {artist.description}</div>
                        {artist.updatedAt && <div className='artisrcreatedAt' >createdAt: {new Date(artist.updatedAt).toDateString()}</div>}
                        <div className='globalLikeButtons' >
                            <img className='likeButton' src={likeButtonSrc} alt={''} onClick={handleLikeButton} />
                            <img className='dislikeButton' src={disLikeButtonSrc} alt={''} onClick={handleDisLikeButton} />
                        </div>
                    </div>
                </div>

                <div className='OneArtistSongList' >
                    <Carousel className='OneArtistAlbums' color="white" breakPoints={breakPoints} >
                        {albums.map((album) =>
                            <ElementToCarusel query={{ path: "album", id: artist.id }} key={album.coverImg + album.name} element={album} />
                        )}
                    </Carousel>
                    <ol className='song-list'>
                        {songList.map((song, index) => (
                            <li className='song' key={Math.random()}>
                                <Link to={`/song/${song.id}?artist=${artist.id}`} className='songName' >
                                    <span>  <img className='imgList' height='70px' width='100px' src={`https://img.youtube.com/vi/${GetYTId(song.youtubeLink)}/0.jpg`} alt={''} /></span>
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
