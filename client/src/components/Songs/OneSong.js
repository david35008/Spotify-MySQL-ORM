import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import './Song.css';
import { read } from '../Network/Ajax';
import NotFound from '../NotFound/NotFound';
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
function OneSong({ getIdSong }) {
    const query = useQuery();
    const { id } = useParams()
    const [song, setSong] = useState()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        read(`song/${id}`)
            .then((res) => setSong(res[0]))
            .catch(console.error);
        let path = 'top_songs';
        if (query.get("artist")) {
            path = `artist/${query.get("artist")}`;
        }
        else if (query.get("album")) {
            path = `album/${query.get("album")}`;
        }
        else if (query.get("playlist")) {
            path = `playlist/${query.get("playlist")}`;
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
    }, [id])



    const queryIdKey = useLocation().search.split("=");

    return (
        song ?
            <div>
                <Navbar setList={setList} />
                <ReactPlayer 
                className='firstSongIframe' 
                onEnded={()=> alert('end')} 
                playing={false} 
                controls={true} 
                url={song.youtube_link}  
                ></ReactPlayer >
                <div className='views'> views</div>
                <img className='shareButton' src={shareButton} alt={''} onClick={() => alert('i am share button')} />
                <img className='likeButton' src={like} alt={''} onClick={() => alert('i am like button')} />
                <img className='dislikeButton' src={disLike} alt={''} onClick={() => alert('i am dislike button')} />
                <img className='addToPlayListButton' src={addToPlayList} alt={''} onClick={() => alert('i am addToPlayList button')} />
                <div>Name: {song.name}</div>
                <Link to={`/album/${song.album_ID}`} >Album: {song.album_name}</Link><br />
                <Link to={`/artist/${song.artist_ID}`} >Artist: {song.artist_name}</Link>
                <ReadMore content={song.lyrics} maxChar="65" />
                <div>Length: {song.length} </div>
                <div>Created: {new Date(song.created_at).toDateString()}</div>
                <div>Upload: {new Date(song.upload_at).toDateString()} </div>
                <SongsListForOneSong query={{ path: queryIdKey[0].substring(1), id: queryIdKey[1] }} songList={list.filter((element) =>
                    element.song_ID !== song.song_ID
                )} split={0} />

            </div> :
            !loading ?
                <NotFound />
                : <div></div>
    )
}

export default OneSong