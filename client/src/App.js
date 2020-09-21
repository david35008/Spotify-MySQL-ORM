import React, { useEffect, useState } from 'react';
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
import LogIn from './components/LogIn/Login';
import Registaer from './components/LogIn/registaer';
import { Logged } from './components/Services/Aouthorizetion';
import { useCookies } from 'react-cookie';
import { create } from './components/Network/Ajax';

function App() {
  const [cookies] = useCookies()

  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (cookies.name && cookies.token) {
      create('users/valid', cookies)
        .then(res => { setIsLogged(res); setLoading(false) })
        .catch(err => { setLoading(false); console.error(err); })
    } else {
      setLoading(false)
    }
  }, [cookies])

  return (
    <div className="App">
      <Router>
        {!loading ?
          !isLogged ?
            <Logged.Provider value={{ isLogged, setIsLogged }}>
              <Switch>
                <Route path="/register">
                  <Registaer />
                </Route>
                <Route path="/">
                  <LogIn />
                </Route>
              </Switch>
            </Logged.Provider>
            :
            <Logged.Provider value={{ isLogged, setIsLogged }}>
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
            </Logged.Provider>
          :
          <div></div>
        }

      </Router>
    </div>
  );
}

export default App;
