import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from "react-router-dom";
import './OneSong.css';
import { read } from '../Network/Ajax';
import NotFound from '../Services/NotFound';
import SongsListForOneSong from '../Songs/SongsListForOneSong';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import Navbar from '../NavBar/NavBar';
import shareButton from '../../images/shareButton.png';
import like from '../../images/like.png';
import disLike from '../../images/disLike.png';
import addToPlayList from '../../images/addToPlayList.png';
import ReactPlayer from 'react-player/youtube';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function OneSong() {
    const query = useQuery();
    const { id } = useParams();
    const [song, setSong] = useState();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory()

    useEffect(() => {
        read(`songs/byId/${id}`)
            .then((res) => {
                setSong(res)
            })
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
        if (query.get("artist")) {
            read(`artists/byId/${query.get("artist")}`)
                .then((res) => {
                    setList(res.Songs)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
        else if (query.get("album")) {
            read(`albums/byId/${query.get("album")}`)
                .then((res) => {
                    setList(res.Songs)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
        else if (query.get("playlist")) {
            read(`playlists/byId/${query.get("playlist")}`)
                .then((res) => {
                    setList(res.PlaylistsSongs.map((song) => song.Song))
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            read('songs/top')
                .then((res) => {
                    setList(res)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
        // eslint-disable-next-line
    }, [id]);

    let views = '10,000';

    const queryIdKey = useLocation().search.split("=");

    return (
        song ?
            <div className='songPage' >

                <Navbar setList={setList} />
                <div className='descriptionArea' >

                    <ReactPlayer
                        className='iframe'
                        onEnded={() => alert('end')}
                        width='600px'
                        playing={false}
                        controls={true}
                        url={song.youtubeLink}
                    ></ReactPlayer >

                    <div className='oneSongTitle' >
                        <Link to={`/artist/${song.artistId}`} >{song.Artist.name} - </Link>
                        <span>{song.name}</span>
                        <div className='oneSongLength' >Length: {song.length} </div>
                    </div>
                    <div className='buttonsArea' >
                        <span className='views'>{views} views</span>
                        <img className='shareButton' src={shareButton} alt={''} onClick={() => alert('i am share button')} />
                        <img className='likeButton' src={like} alt={''} onClick={() => alert('i am like button')} />
                        <img className='dislikeButton' src={disLike} alt={''} onClick={() => alert('i am dislike button')} />
                        <img className='addToPlayListButton' src={addToPlayList} alt={''} onClick={() => alert('i am addToPlayList button')} />
                    </div>
                    <Link to={`/album/${song.artistId}`} className='oneSongAlbum' >Album: {song.Album.name}</Link><br />
                    <ReadMore content={song.lyrics} maxChar="50" />
                    <div>Created: {new Date(song.createdAt).toDateString()}</div>
                    <div>Upload: {new Date(song.updatedAt).toDateString()} </div>
                </div>
                <div className='songRightSide'>
                    <h3 className='Suggestions'>Suggestions of the same kind:</h3>
                    <SongsListForOneSong query={{ path: queryIdKey[0].substring(1), id: queryIdKey[1] }} songList={list.filter((element) =>
                        element.id !== song.id
                    )} split={0} />
                </div>
            </div> :
            !loading ?
                <NotFound />
                : <div></div>
    )
}

export default OneSong;
