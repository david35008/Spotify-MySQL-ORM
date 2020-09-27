import React, { useEffect, useState } from 'react';
import './OneAlbum.css';
import { read, create } from '../Network/Ajax';
import { useParams, useHistory } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../Services/NotFound';
import like from '../../images/like.png';
import likeActive from '../../images/likeActive.png'
import dislike from '../../images/disLike.png';
import dislikeActive from '../../images/dislikeActive.png'

function OneAlbum() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState();
    const [songList, setSongsList] = useState([]);
    const [likeButtonSrc, setLikeButtonSrc] = useState(like)
    const [disLikeButtonSrc, setDisLikeButtonSrc] = useState(dislike)


    const history = useHistory()
    useEffect(() => {
        read(`albums/byId/${id}`)
            .then((res) => {
                setAlbum(res);
                setSongsList(res.Songs);
                setLoading(false);
            })
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
        read('interactions/albums/byUser')
            .then(res => {
                switch (res.filter((album) => album.albumId === parseInt(id))[0].isLiked) {
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
            albumId: album.id,
            isLiked: true,
        }
        create('interactions/albums', newInteraction)
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
        create('interactions/albums', newInteraction)
            .then(res => {
                setDisLikeButtonSrc(dislikeActive)
                setLikeButtonSrc(like)
            })
            .catch(console.error);
    }

    return (
        album ? (<div className='OneAlbum'>
            <div className='OneAlbumContainer'>
                <img src={album.coverImg} alt={album.name} className='OneAlbumImage' />
                <div className='OneAlbumDescription'>
                    <div>Name: {album.name}</div>
                    <div>Artist: {album.Artist.name}</div>
                    {album.createdAt && <div>created At: {new Date(album.createdAt).toDateString()}</div>}
                    {album.uploadAt && <div>upload At{new Date(album.uploadAt).toDateString()}</div>}
                    <div className='globalLikeButtons' >
                        <img className='likeButton' src={likeButtonSrc} alt={''} onClick={handleLikeButton} />
                        <img className='dislikeButton' src={disLikeButtonSrc} alt={''} onClick={handleDisLikeButton} />
                    </div>
                </div>
            </div>
            <div className='albumSongsList' >
                <ListOfSongs query={{ path: "album", id: album.id }} songList={songList} albumDisplay={"none"} />
            </div>
        </div>)
            :
            !loading ?
                <NotFound />
                : <div></div>
    );
};

export default OneAlbum;
