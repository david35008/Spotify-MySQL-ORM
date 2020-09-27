import React, { useEffect, useState, useContext } from 'react';
import { create, read } from '../Network/Ajax';
// import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import { Interactions } from '../Services/useContextComp';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from '../Home/ElementToCarusel';
import { breakPoints } from '../Services/globalVariables';
import { Link } from 'react-router-dom';

const MyLibrary = () => {
    const value = useContext(Interactions);
    // const location = useHistory()

    const [songList, setSongsList] = useState([])
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        create('songs/byUser', [...new Set(value.interactions.map((inter => {
            if (inter.isLiked === true) {
                return inter.songId
            } else { return null }
        })).filter(function (el) {
            return el != null;
        }))])
            .then(setSongsList)
            .catch(console.error)
        read('interactions/UserPlaylists')
            .then(res => setPlaylists(res.map(playlist =>
                playlist.Playlist
            )))
            .catch(console.error)
    }, [value])

    return (
        <>
            <NavBar />
            <h2>This is your personal page {Cookies.get('name')}</h2>
            <hr color='white' />
            <h3>This is your favorit songs</h3>
            {songList.length > 0 ? <Carousel color="white" breakPoints={breakPoints} >
                {songList.map((song) => (
                    <ElementToCarusel query={{ path: "song", id: song.id }} key={song.coverImg + song.name} element={song} />
                ))}
            </Carousel>
                : <div>You don't have favorit songs yet, press
            <Link to='/' > here</Link> {' '}
              to add</div>
            }
            <h3 >This is your favorit albums</h3>
            {albums.length > 0 ? <Carousel color="white" breakPoints={breakPoints} >
                {albums.map((album) => (
                    <ElementToCarusel query={{ path: "album", id: album.albumId }} key={album.name + album.albumId} element={album} />
                ))}
            </Carousel>
                : <div>You don't have favorit albums yet, press
           <Link to='/albums' > here</Link> {' '}
             to add</div>
            }
            <br /><br />
            <h3 >This is your favorit artists</h3>
            {artists.length > 0 ? <Carousel color="white" breakPoints={breakPoints} >
                {artists.map((artist) => (
                    <ElementToCarusel border={'50%'} widthPic={'100px'} query={{ path: "artist", id: artist.artistId }} key={artist.name + artist.artistId} element={artist} />
                ))}
            </Carousel>
                : <div>You don't have favorit albums yet, press
             <Link to='/artists' > here</Link> {' '}
               to add</div>
            }
            <br /><br />
            <h3>This is your playlists</h3>
          {playlists.length > 0?  <Carousel color="white" breakPoints={breakPoints} >
                {playlists.map((playlist) => (
                    <ElementToCarusel query={{ path: "playlist", id: playlist.playlistId }} key={playlist.name + playlist.playlistId} element={playlist} />
                ))}
            </Carousel>
            : <div>You don't have your own playlists yet, press
            <Link to='/' > here</Link> {' '}
              to add</div>
           }
        </>
    )
}

export default MyLibrary;