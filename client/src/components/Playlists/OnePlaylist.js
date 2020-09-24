import React, { useEffect, useState } from 'react';
import './ListOfPlaylists.css';
import { read } from '../Network/Ajax';
import { useParams } from 'react-router-dom';
import ListOfSongs from '../Songs/ListOfSongs';
import NotFound from '../Services/NotFound';

function OnePlaylist() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [playList, setPlaylist] = useState();
    const [songList, setSongsList] = useState([]);
    const SongsToPrint = songList.map((song) => song.Song)

    useEffect(() => {
        read(`playlists/byId/${id}`)
            .then((res) => {
                setPlaylist(res);
                setSongsList(res.Playlists_Songs);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
            })
    }, [id]);

    return (
        playList ?
            <div className='OnePlayList'>
                <div className='OnePlayListContainer'>
                    <img src={playList.cover_img} alt={playList.name} height='300px' />
                    <div className='OnePlayListDescription'>
                        <div>Name: {playList.name}</div>
                        <div>created_at: {new Date(playList.createdAt).toDateString()}</div>
                        <div>upload_at{new Date(playList.uploaded_at).toDateString()}</div>
                    </div>
                </div>
                <ListOfSongs query={{ path: "playlist", id: playList.id }} className='PlayListSongsList' songList={SongsToPrint} />
            </div>
            :
            !loading ?
                <NotFound />
                : <div></div>
    )

}

export default OnePlaylist;
