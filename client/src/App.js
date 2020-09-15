import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Albums from './components/Albums/ListOfAlbums';
import OneAlbum from './components/Albums/OneAlbum';
import Artists from './components/Artists/ListOfArtists';
import OneArtist from './components/Artists/OneArtist';
import ListOfPlaylists from './components/Playlists/ListOfPlaylists';
import OnePlaylist from './components/Playlists/OnePlaylist';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound'
import OneSong from './components/Songs/OneSong';

function App() {

  const getIdSong = (songId) => {
    let video_id = songId.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/song/:id">
            <OneSong getIdSong={getIdSong} />
          </Route>
          <Route path="/album/:id">
            <NavBar />
            <OneAlbum getIdSong={getIdSong} />
          </Route>
          <Route path="/playlist/:id">
            <NavBar />
            <OnePlaylist getIdSong={getIdSong} />
          </Route>
          <Route path="/artist/:id">
            <NavBar />
            <OneArtist getIdSong={getIdSong} />
          </Route>
          <Route exact path="/playlists">
            <NavBar />
            <ListOfPlaylists getIdSong={getIdSong} />
          </Route>
          <Route exact path="/artists">
            <Artists getIdSong={getIdSong} />
          </Route>
          <Route exact path="/albums">
            <Albums getIdSong={getIdSong} />
          </Route>
          {/* <Route path="/about">
        <About/>
      </Route>  */}
          <Route exact path="/">
            <Home getIdSong={getIdSong} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
