import React, { useEffect, useState, useContext } from 'react';
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
import { Interactions } from '../Services/useContextComp';
import AddPlayList from '../Admin/MyModals/AddPlayList';

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
    const [openPlayListModal, setOpenPlayListModal] = useState(false);

    const history = useHistory()

    const value = useContext(Interactions);

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
        const isLikedArr = value.interactions.map((inter => {
            if (inter.songId === parseInt(id)) {
                return inter.isLiked
            } else { return null }
        })).filter(function (el) {
            return el != null;
        })
        if (isLikedArr[isLikedArr.length - 1] === true) {
            setLikeButtonSrc(likeActive)
            setDisLikeButtonSrc(dislike)
        } else if (isLikedArr[isLikedArr.length - 1] === false) {
            setDisLikeButtonSrc(dislikeActive)
            setLikeButtonSrc(like)
        } else {
            setLikeButtonSrc(like)
            setDisLikeButtonSrc(dislike)
        }
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
                playCount: 1,
                songId: id,
                isLiked: null
            }
            console.log(newInteraction);
            create('interactions', newInteraction)
                .then(console.log)
                .catch(console.error);
        }
        // eslint-disable-next-line
    }, [id]);

    const queryIdKey = useLocation().search.split("=");

    const handleLikeButton = (e) => {
        const newInteraction = {
            songId: id,
            isLiked: true,
        }
        console.log(newInteraction);
        create('interactions', newInteraction)
            .then(res => {
                setLikeButtonSrc(likeActive)
                setDisLikeButtonSrc(dislike)
            })
            .catch(console.error);
    }

    const handleDisLikeButton = (e) => {
        const newInteraction = {
            songId: id,
            isLiked: false,
        }
        create('interactions', newInteraction)
            .then(res => {
                console.log(res)
                setDisLikeButtonSrc(dislikeActive)
                setLikeButtonSrc(like)
            })
            .catch(console.error);
    }

    const handleAddToPlaylistButton = () => {
        read(`playlists/byUser`)
            .then((res) => {
                setPlaylistOptions(res.map((element) =>
                    element.Playlist
                ).concat([{ name: 'Add +', id: null }]));
            })
            .catch(console.error);
    }

    const addSongToPlaylistRequest = (event) => {
        if (event) {
            const requestBody = {
                songId: song.id,
                playlistId: event
            }
            create('songsInPlaylists', requestBody)
            console.log(requestBody);
        } else {
            setOpenPlayListModal(true)
        }
    }

    return (
        song ?
            <div className='songPage' >

                <Navbar setList={setList} />
                <div className='descriptionArea' >
                    {openPlayListModal && <>
                        <AddPlayList openModal={openPlayListModal} setOpenModal={setOpenPlayListModal} /></>}
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
                        {/* <Share link={song.youtubeLink} songName={song.name} artistName={song.Artist.name} /> */}
                        <img className='likeButton' src={likeButtonSrc} alt={''} onClick={handleLikeButton} />
                        <img className='dislikeButton' src={disLikeButtonSrc} alt={''} onClick={handleDisLikeButton} />
                        <DropdownButton id={`dropdownDropUp`} drop={'up'} title={false} onToggle={handleAddToPlaylistButton} onSelect={addSongToPlaylistRequest} >
                            {playlistOptions.map((option) => {
                                return <Dropdown.Item key={option.name} eventKey={option.id} >{option.name}</Dropdown.Item>
                            })}
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
