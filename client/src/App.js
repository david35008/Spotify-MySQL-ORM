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

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route  path="/song/:id">
            <OneSong />
          </Route>
          <Route  path="/albums/:id">
            <NavBar />
            <OneAlbum />
          </Route>
          <Route  path="/playlists/:id">
            <NavBar />
            <OnePlaylist />
          </Route>
          <Route  path="/artists/:id">
            <NavBar />
            <OneArtist />
          </Route>
          <Route exact path="/playlists">
            <NavBar />
            <ListOfPlaylists />
          </Route>
          <Route exact path="/artists">
            <Artists />
          </Route>
          <Route exact path="/albums">
            <Albums />
          </Route>
          {/* <Route path="/about">
        <About/>
      </Route>  */}
          <Route exact path="/">
            <Home />
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
