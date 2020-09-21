import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
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

    useEffect(() => {
        read(`songs/byId/${id}`)
            .then((res) => setSong(res[0]))
            .catch(console.error);
        let path = 'songs/top';
        if (query.get("artist")) {
            path = `artists/byId/${query.get("artist")}`;
        }
        else if (query.get("album")) {
            path = `albums/byId/${query.get("album")}`;
        }
        else if (query.get("playlist")) {
            path = `playlists/byId/${query.get("playlist")}`;
        }
        read(path)
            .then((res) => {
                setList(res)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
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
                        url={song.youtube_link}
                    ></ReactPlayer >

                    <div className='oneSongTitle' >
                    <Link to={`/artist/${song.artist_ID}`} >{song.artist_name} - </Link>
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
                    <Link to={`/album/${song.album_ID}`} className='oneSongAlbum' >Album: {song.album_name}</Link><br />
                    <ReadMore content={song.lyrics} maxChar="50" />
                    <div>Created: {new Date(song.created_at).toDateString()}</div>
                    <div>Upload: {new Date(song.upload_at).toDateString()} </div>
                </div>
                <div className='songRightSide'>
                    <h3 className='Suggestions'>Suggestions of the same kind:</h3>
                    <SongsListForOneSong query={{ path: queryIdKey[0].substring(1), id: queryIdKey[1] }} songList={list.filter((element) =>
                        element.song_ID !== song.song_ID
                    )} split={0} />
                </div>
            </div> :
            !loading ?
                <NotFound />
                : <div></div>
    )
}

export default OneSong;
