import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import './Song.css';
import axios from "axios";
import NotFound from '../NotFound/NotFound';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import Navbar from '../NavBar/NavBar';

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
        (async () => {
            setLoading(true);
            try {
                let { data } = await axios.get(`/song/${id}`)
                setSong(data[0])
                if (query.get("artist")) {
                    data = await axios.get(`/artist/${query.get("artist")}`)
                    setList(data.data)
                }
                else if (query.get("album")) {
                    data = await axios.get(`/album/${query.get("album")}`)
                    setList(data.data)
                }
                else if (query.get("playlist")) {
                    data = await axios.get(`/playlist/${query.get("playlist")}`)
                    setList(data.data)
                }
                else {
                    data = await axios.get(`/top_songs/20`)
                    setList(data.data)
                }
                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
        )()
        // eslint-disable-next-line
    }, [id])

    const queryIdKey = useLocation().search.split("=");

    return (
        song ?
            <div>
                <Navbar setList={setList} />
                <iframe className='firstSongIframe' width="45%" height="400vh" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}?autoplay=1`} allow="auto" title={song.name} ></iframe>
                <div>Name: {song.name}</div>
                <Link to={`/album/${song.album_ID}`} >Album: {song.album_name}</Link><br />
                <Link to={`/artist/${song.artist_ID}`} >Artist: {song.artist_name}</Link>
                <ReadMore content={song.lyrics} maxChar="65" />
                <div>Length: {song.length} </div>
                <div>Created: {new Date(song.created_at).toDateString()}</div>
                <div>Upload: {new Date(song.upload_at).toDateString()} </div>
                <ListOfSongs query={{ path: queryIdKey[0].substring(1), id: queryIdKey[1] }} songList={list.filter((element)=> 
                    element.song_ID !== song.song_ID
                )} split={0}/>

            </div> :
            !loading ?
                <NotFound />
                : <div></div>
    )
}

export default OneSong