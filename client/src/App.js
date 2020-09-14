import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Albums from './components/Albums/ListOfAlbums';
import OneAlbum from './components/Albums/OneAlbum';
import Artists from './components/Artists/ListOfArtists';
import OneArtist from './components/Artists/OneArtist';
import Playlists from './components/Playlists/Playlists';
import OnePlaylist from './components/Playlists/OnePlaylist';
import NavBar from './components/NavBar/NavBar';

function App() {

console.log("***********")
 
  return (
    <div className="App">
      <Router>
    <Switch>
      <Route path="/albums/:id">
        <NavBar />
        <OneAlbum />
      </Route>
      <Route path="/playlists/:id">
      <NavBar />
        <OnePlaylist />
      </Route>
      <Route path="/artists/:id">
      <NavBar />
        <OneArtist />
      </Route>
      <Route path="/playlists">
      <NavBar />
        <Playlists  />
    </Route>  
    <Route path="/artists">
    <NavBar />
        <Artists  />
    </Route> 
      <Route path="/albums">
      <NavBar />
        <Albums />
    </Route> 
      {/* <Route path="/about">
        <About/>
      </Route>  */}
      <Route path="/">
      <Home />
      </Route>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
