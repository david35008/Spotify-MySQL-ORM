import React, { useEffect, useState } from 'react';
import { create, read } from '../Network/Ajax';
import Cookies from 'js-cookie';
import NavBar from '../NavBar/NavBar';
import Carousel from 'react-elastic-carousel';
import ElementToCarusel from '../Home/ElementToCarusel';
import { breakPoints } from '../Services/globalVariables';
import { Link } from 'react-router-dom';

const MyLibrary = () => {
    const [songList, setSongsList] = useState([])
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        read(`/api/v1/interactions/songs/byUser`)
            .then(res => {
                create('/api/v1/interactions/songs/songsByUser', [...new Set(res.map((inter => {
                    if (inter.isLiked === true) {
                        return inter.songId
                    } else { return null }
                })).filter(function (el) {
                    return el != null;
                }))])
                    .then(setSongsList)
                    .catch(console.error)
            })
            .catch(console.error)
        read('/api/v1/interactions/albums/userInteractions')
            .then(res => {
                create('/api/v1/interactions/albums/byUser', [...new Set(res.map((inter => {
                    if (inter.isLiked === true) {
                        return inter.albumId
                    } else { return null }
                })).filter(function (el) {
                    return el != null;
                }))])
                    .then(res => {
                        setAlbums(res.map(album =>
                            album.Album
                        ))
                    })
            })
            .catch(console.error)
            .catch(console.error)
        read('/api/v1/interactions/artists/userInteractions')
            .then(res => {
                create('/api/v1/interactions/artists/byUser', [...new Set(res.map((inter => {
                    if (inter.isLiked === true) {
                        return inter.artistId
                    } else { return null }
                })).filter(function (el) {
                    return el != null;
                }))])
                    .then(res => setArtists(res.map(artist =>
                        artist.Artist
                    )))
            })
            .catch(console.error)
            .catch(console.error)
        read('/api/v1/interactions/playlists/byUser')
            .then(res => setPlaylists(res.map(playlist =>
                playlist.Playlist
            )))
            .catch(console.error)
    }, [])

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
            {playlists.length > 0 ? <Carousel color="white" breakPoints={breakPoints} >
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