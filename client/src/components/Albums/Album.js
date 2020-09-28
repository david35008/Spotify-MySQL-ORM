import React, { useState } from 'react';
import { create } from '../Network/Ajax';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Album.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';
import like from '../../images/like.png';
import likeActive from '../../images/likeActive.png'
import dislike from '../../images/disLike.png';
import dislikeActive from '../../images/dislikeActive.png'

function Album({ album, isLiked, albumDisplay = 'inline', artistDisplay = 'inline' }) {

    const [likeButtonSrc, setLikeButtonSrc] = useState(isLiked === true ? likeActive : like)
    const [disLikeButtonSrc, setDisLikeButtonSrc] = useState(isLiked === false ? dislikeActive : dislike)

    const handleLikeButton = (e) => {
        const newInteraction = {
            albumId: album.id,
            isLiked: true,
        }
        create('/api/v1/interactions/albums', newInteraction)
            .then(res => {
                setLikeButtonSrc(likeActive)
                setDisLikeButtonSrc(dislike)
            })
            .catch(console.error);
    }

    const handleDisLikeButton = (e) => {
        const newInteraction = {
            albumId: album.id,
            isLiked: false,
        }
        create('/api/v1/interactions/albums', newInteraction)
            .then(res => {
                setDisLikeButtonSrc(dislikeActive)
                setLikeButtonSrc(like)
            })
            .catch(console.error);
    }
    return (
        <div className='Album'>
            <div className='AlbumContainer'>
                <img src={album.coverImg} alt={album.name} className='albumsImg' />
                <div className='AlbumDescription'>
                    <Link to={`/album/${album.id}`} style={{ display: albumDisplay }} className='AlbumName' > {album.name}</Link>
                    <Link to={`/artist/${album.artistId}`} style={{ display: artistDisplay }} className='AlbumArtist' > {album.Artist.name}</Link>
                    {album.createdAt && <div className='AlbumCreatedAt'>{new Date(album.createdAt).toDateString()}</div>}
                    <div className='globalLikeButtons' >
                        <img className='likeButton' src={likeButtonSrc} alt={''} onClick={handleLikeButton} />
                        <img className='dislikeButton' src={disLikeButtonSrc} alt={''} onClick={handleDisLikeButton} />
                    </div>
                </div>
            </div>
            <div className='AlbumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.id }} songList={album.Songs} albumDisplay={"none"} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Album;