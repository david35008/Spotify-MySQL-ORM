import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from '../NotFound/NotFound';
import ListOfSongs from '../Songs/ListOfSongs';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';
import Navbar from '../NavBar/NavBar';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function OneSong() {
    let query = useQuery();
    const { id } = useParams()
    const [song, setSong] = useState()
    const [list, setList] = useState([])

    useEffect(() => {
        (async () => {
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

            } catch (e) {

            }
        }
        )()
    }, [id])

    let queryID = useLocation().search.split("=")[1]
    let queryKey = useLocation().search.split("=")[0].substring(1);

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    return (
        song ?
            <div>
                <Navbar setList={setList} />
                <iframe className='firstSongIframe' width="45%" height="400vh" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}`} title={song.title}></iframe>
                <div>Name: {song.title}</div>
                <Link to={`/albums/${song.album_ID}`} >Album: {song.album_name}</Link><br />
                <Link to={`/artists/${song.artist_ID}`} >Artist: {song.artist_name}</Link>
                <ReadMore content={song.lyrics} maxChar="65" />
                <div>Length: {song.length} </div>
                <div>Created: {new Date(song.created_at).toDateString()}</div>
                <div>Upload: {new Date(song.upload_at).toDateString()} </div>
                <ListOfSongs query={{ path: queryKey, id: queryID }} songList={list} />

            </div> :
            <NotFound />
    )
}

export default OneSong