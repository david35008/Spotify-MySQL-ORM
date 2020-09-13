import React from 'react';
import { Link } from 'react-router-dom';
import ReadMore from '../ReadMore/ReadMore';


function FirstSong({ songList, getIdSong }) {



    let firstSong = <div></div>
    if (songList.[0]) {
        let song = songList[0];
        firstSong = (<div className="firstSong" >
            <iframe className='firstSongIframe' width="45%" height="400vh" src={`https://www.youtube.com/embed/${getIdSong(song.youtube_link)}`} title={song.title}></iframe>
            <div className='firstSongDescription' >
                <div>Name: {song.title}</div>
                <Link to={`/albums/${song.album_ID}`} >Album: {song.album_name}</Link><br/>
                <Link to={`/artists/${song.artist_ID}`} >Artist: {song.artist_name}</Link>
                <ReadMore content={song.lyrics} maxChar="65" />
                <div>Length: {song.length} </div>
                <div>Created: {new Date(song.created_at).toDateString()}</div>
                <div>Upload: {new Date(song.upload_at).toDateString()} </div>
            </div>
        </div>
        )
    }
    return firstSong
}

export default FirstSong;
