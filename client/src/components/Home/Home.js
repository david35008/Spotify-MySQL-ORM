import React, { useEffect, useState } from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';
import { read } from '../Network/Ajax';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from './ElementToCarusel';
import { breakPoints } from '../Services/globalVariables';

function Home() {

    const [songList, setSongsList] = useState([])
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        read('songs/top')
            .then(res => setSongsList(res))
            .catch(console.error)
        read('albums/top')
            .then(res => setAlbums(res))
            .catch(console.error)
        read('artists/top')
            .then(res => setArtists(res))
            .catch(console.error)
        read('playlists/top')
            .then(res => setPlaylists(res))
            .catch(console.error)
    }, []);

    return (
        <>
            <NavBar songList={songList} albums={albums} artists={artists} playlists={playlists} setSongsList={setSongsList} setAlbums={setAlbums} setArtists={setArtists} setPlaylists={setPlaylists} searchTypeProps='Songs' />
            <h2 className='listTitle'>Top Songs</h2>
            <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                {songList.map((song) => (
                    <ElementToCarusel   query={{ path: "song", id: song.song_ID }} key={song.cover_img + song.name} element={song}/>
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Albums</h2>
            <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                {albums.map((album) => (
                    <ElementToCarusel query={{ path: "album", id: album.album_ID }} key={album.name + album.album_ID} element={album} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Artists</h2>
            <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                {artists.map((artist) => (
                    <ElementToCarusel border={'50%'} widthPic={'100px'} query={{ path: "artist", id: artist.artist_ID }} key={artist.name + artist.artist_ID} element={artist} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Playlists</h2>
            <Carousel color="white" breakPoints={breakPoints} enableAutoPlay>
                {playlists.map((playlist) => (
                    <ElementToCarusel query={{ path: "playlist", id: playlist.playlist_ID }} key={playlist.name + playlist.playlist_ID} element={playlist} />
                ))}
            </Carousel>
        </>
    )
}

export default Home;
