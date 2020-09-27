import React, { useState } from 'react';
import { create } from '../Network/Ajax';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Artist.css';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';
import like from '../../images/like.png';
import likeActive from '../../images/likeActive.png'
import dislike from '../../images/disLike.png';
import dislikeActive from '../../images/dislikeActive.png'

function Artist({ artist, isLiked }) {
    const [likeButtonSrc, setLikeButtonSrc] = useState(isLiked === true ? likeActive : like)
    const [disLikeButtonSrc, setDisLikeButtonSrc] = useState(isLiked === false ? dislikeActive : dislike)

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
        <div className='Artist'>
            <div className='ArtistContainer'>
                <img src={artist.coverImg} alt={artist.name} className='Artist-img' />
                <div className='ArtistDescription'>
                    <Link to={`/artist/${artist.id}`} className='ArtistName' > {artist.name}</Link>
                    {artist.createdAt && <div className='ArtistCreatedAt'>Created At: {new Date(artist.createdAt).toDateString()}</div>}
                    <div className='globalLikeButtons' >
                        <img className='likeButton' src={likeButtonSrc} alt={''} onClick={handleLikeButton} />
                        <img className='dislikeButton' src={disLikeButtonSrc} alt={''} onClick={handleDisLikeButton} />
                    </div>
                </div>
            </div>
            <div className='ArtistSongsList' >
                <ListOfSongs query={{ path: "artist", id: artist.id }} songList={artist.Songs} artistDisplay={"none"} />
            </div>
        </div>

    )
}

export default Artist;