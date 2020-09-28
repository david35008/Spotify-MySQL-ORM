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
        read('/api/v1/songs/top')
            .then(res => setSongsList(res))
            .catch(console.error)
        read('/api/v1/albums/top')
            .then(res => setAlbums(res))
            .catch(console.error)
        read('/api/v1/artists/top')
            .then(res => setArtists(res))
            .catch(console.error)
        read('/api/v1/interactions/playlists/all')
            .then(res => setPlaylists(res.map(playlist =>
                playlist.Playlist
            )))
            .catch(console.error)
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <NavBar songList={songList} albums={albums} artists={artists} playlists={playlists} setSongsList={setSongsList} setAlbums={setAlbums} setArtists={setArtists} setPlaylists={setPlaylists} searchTypeProps='Songs' />
            <h2 className='listTitle'>Top Songs</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {songList.map((song) => (
                    <ElementToCarusel query={{ path: "song", id: song.id }} key={song.coverImg + song.name} element={song} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Albums</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {albums.map((album) => (
                    <ElementToCarusel query={{ path: "album", id: album.albumId }} key={album.name + album.albumId} element={album} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Artists</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {artists.map((artist) => (
                    <ElementToCarusel border={'50%'} widthPic={'100px'} query={{ path: "artist", id: artist.artistId }} key={artist.name + artist.artistId} element={artist} />
                ))}
            </Carousel>
            <br /><br />
            <h2 className='listTitle'>Top Playlists</h2>
            <Carousel color="white" breakPoints={breakPoints} >
                {playlists.map((playlist) => (
                    <ElementToCarusel query={{ path: "playlist", id: playlist.playlistId }} key={playlist.name + playlist.playlistId} element={playlist} />
                ))}
            </Carousel>
        </>
    )
}

export default Home;
