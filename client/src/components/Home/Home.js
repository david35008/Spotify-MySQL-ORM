import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';
import { read } from '../Network/Ajax';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from './ElementToCarusel';
import { breakPoints } from '../Services/globalVariables';
import Cookies from 'js-cookie';
import { Logged } from '../Services/Aouthorizetion';


function Home() {

    const [songList, setSongsList] = useState([])
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const value = useContext(Logged);

    useEffect(() => {
        read('songs/top')
            .then(res => setSongsList(res))
            .catch(error => {
                console.error(error.status);
                if (error.status) {
                    Cookies.remove('name')
                    Cookies.remove('token')
                    value.setIsLogged(false);
                }
            })
        read('albums/top')
            .then(res => setAlbums(res))
            .catch(console.error)
        read('artists/top')
            .then(res => setArtists(res))
            .catch(console.error)
        read('playlists/top')
            .then(res => setPlaylists(res))
            .catch(console.error)
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <NavBar songList={songList} albums={albums} artists={artists} playlists={playlists} setSongsList={setSongsList} setAlbums={setAlbums} setArtists={setArtists} setPlaylists={setPlaylists} searchTypeProps='Songs' />
            <h2 className='listTitle'>Top Songs</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {songList.map((song) => (
                    <ElementToCarusel query={{ path: "song", id: song.id }} key={song.cover_img + song.name} element={song} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Albums</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {albums.map((album) => (
                    <ElementToCarusel query={{ path: "album", id: album.album_ID }} key={album.name + album.album_ID} element={album} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Artists</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {artists.map((artist) => (
                    <ElementToCarusel border={'50%'} widthPic={'100px'} query={{ path: "artist", id: artist.artist_ID }} key={artist.name + artist.artist_ID} element={artist} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Playlists</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {playlists.map((playlist) => (
                    <ElementToCarusel query={{ path: "playlist", id: playlist.playlist_ID }} key={playlist.name + playlist.playlist_ID} element={playlist} />
                ))}
            </Carousel>
        </>
    )
}

export default Home;
