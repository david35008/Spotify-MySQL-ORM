import React, { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from './ElementToCarusel';


function Home({ getIdSong, breakPoints }) {

    const [songList, setSongsList] = useState([])
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/top_songs/20');
                setSongsList(data)
            } catch (error) {
                console.error(error.message);
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get('/top_albums/20');
                setAlbums(data)
            } catch (error) {
                console.error(error.message);
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get('/top_artists/20');
                setArtists(data)
            } catch (error) {
                console.error(error.message);
            }
        })();

        (async () => {
            try {
                const { data } = await axios.get('/top_playlists/20');
                setPlaylists(data)
            } catch (error) {
                console.error(error.message);
            }
        })();


    }, []);

    return (
        <>
            <NavBar setList={setSongsList} serchType='song' />
            <h2 className='listTitle'>Top Songs</h2>
            <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                {songList.map((song) => (
                    <ElementToCarusel query={{ path: "song", id: song.song_ID }} key={Math.random()} element={song} getIdSong={getIdSong} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Albums</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {albums.map((album) => (
                    <ElementToCarusel query={{ path: "album", id: album.album_ID }} key={Math.random()} element={album} getIdSong={getIdSong} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Artists</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {artists.map((artist) => (
                    <ElementToCarusel query={{ path: "artist", id: artist.artist_ID }} key={Math.random()} element={artist} getIdSong={getIdSong} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Playlists</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {playlists.map((playlist) => (
                    <ElementToCarusel query={{ path: "playlist", id: playlist.playlist_ID }} key={Math.random()} element={playlist} getIdSong={getIdSong} />
                ))}
            </Carousel>
        </>
    )
}

export default Home;
