import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from "react-router-dom";
import './OneSong.css';
import { create, read } from '../Network/Ajax';
import NotFound from '../Services/NotFound';
import SongsListForOneSong from '../Songs/SongsListForOneSong';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import Navbar from '../NavBar/NavBar';
import like from '../../images/like.png';
import likeActive from '../../images/likeActive.png'
import dislike from '../../images/disLike.png';
import dislikeActive from '../../images/dislikeActive.png'
import ReactPlayer from 'react-player/youtube';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Share from '../Services/share';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function OneSong() {
    const query = useQuery();
    const { id } = useParams();
    const [song, setSong] = useState('');
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playlistOptions, setPlaylistOptions] = useState([])
    const [likeButtonSrc, setLikeButtonSrc] = useState(like)
    const [disLikeButtonSrc, setDisLikeButtonSrc] = useState(dislike)
    const [views, setViews] = useState([])
    const [userLike, setUserLike] = useState(null)
    const history = useHistory()

    useEffect(() => {
        let songUnmaunt;
        read(`songs/byId/${id}`)
            .then((res) => {
                songUnmaunt = res;
                setSong(res)
            })
            .catch(err => {
                if (err.status === 403) {
                    history.push('/')
                }
            })
        read(`interactions`)
            .then(res => {
                setViews(res.map((inter => {
                    if (inter.songId === parseInt(id)) {
                        return inter.playCount
                    } else {
                        return 0
                    }
                })))
            })
            .catch(console.error)

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
        return () => {
            const newInteraction = {
                // songName: songUnmaunt.name,
                playCount: 1,
                songId: songUnmaunt.id,
                userLike
            }
            console.log(newInteraction, songUnmaunt.name);
            create('interactions', newInteraction)
                .then(console.log)
                .catch(console.error);
        }
        // eslint-disable-next-line
    }, [id]);

    const queryIdKey = useLocation().search.split("=");

    const handleLikeButton = (e) => {
        setLikeButtonSrc(likeActive)
        setDisLikeButtonSrc(dislike)
        setUserLike(true)
    }

    const handleDisLikeButton = (e) => {
        setDisLikeButtonSrc(dislikeActive)
        setLikeButtonSrc(like)
        setUserLike(false)
    }

    const handleAddToPlaylistButton = () => {
        read(`playlists`)
            .then((res) => {
                setPlaylistOptions(res);
            })
            .catch(console.error);
    }

    const addSongToPlaylistRequest = (event) => {
        const requestBody = {
            songId: song.id,
            playlistId: event
        }
        // create('songsInPlaylists', )
        console.log(requestBody);
    }

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
                        url={`${song.youtubeLink.replace('p', 'ps')}`}
                    ></ReactPlayer >

                    <div className='oneSongTitle' >
                        <Link to={`/artist/${song.artistId}`} >{song.Artist.name} - </Link>
                        <span>{song.name}</span>
                        <div className='oneSongLength' >Length: {song.length} </div>
                    </div>
                    <div className='buttonsArea' >
                        <span className='views'>{views.reduce(function (a, b) {
                            return a + b;
                        }, 0)} views</span>
                        <Share link={song.youtubeLink} songName={song.name} artistName={song.Artist.name} />
                        <img className='likeButton' src={likeButtonSrc} alt={''} onClick={handleLikeButton} />
                        <img className='dislikeButton' src={disLikeButtonSrc} alt={''} onClick={handleDisLikeButton} />
                        <DropdownButton id={`dropdownDropUp`} drop={'up'} title={false} onToggle={handleAddToPlaylistButton} onSelect={addSongToPlaylistRequest} >
                            {playlistOptions.map((option) =>
                                <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
                            )}
                        </DropdownButton>
                    </div>
                    <Link to={`/album/${song.albumId}`} className='oneSongAlbum' >Album: {song.Album.name}</Link><br />
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
