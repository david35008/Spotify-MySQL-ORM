import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import ListOfAlbums from './components/Albums/ListOfAlbums';
import OneAlbum from './components/Albums/OneAlbum';
import ListOfArtists from './components/Artists/ListOfArtists';
import OneArtist from './components/Artists/OneArtist';
import ListOfPlaylists from './components/Playlists/ListOfPlaylists';
import OnePlaylist from './components/Playlists/OnePlaylist';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/Services/NotFound'
import OneSong from './components/Songs/OneSong';
import Admin from './components/Admin/Admin';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/song/:id">
            <OneSong />
          </Route>
          <Route path="/album/:id">
            <NavBar />
            <OneAlbum />
          </Route>
          <Route path="/playlist/:id">
            <NavBar />
            <OnePlaylist />
          </Route>
          <Route path="/artist/:id">
            <NavBar />
            <OneArtist />
          </Route>
          <Route exact path="/playlists">
            <NavBar />
            <ListOfPlaylists />
          </Route>
          <Route exact path="/artists">
            <ListOfArtists />
          </Route>
          <Route exact path="/albums">
            <ListOfAlbums />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
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
