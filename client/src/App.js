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
import MyLibrary from './components/MyLibrary/MyLibrary';
import { Logged, Interactions } from './components/Services/useContextComp';
import Cookies from 'js-cookie';
import { create, read } from './components/Network/Ajax';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [interactions, setInteractions] = useState([])

  useEffect(() => {
    if (Cookies.get('name') && Cookies.get('token')) {
      read(`/api/v1/interactions/songs/byUser`)
        .then(res => {
          setInteractions(res)
          create('/users/valid', Cookies.get())
            .then(res => {
              setIsAdmin(res.isAdmin);
              setIsLogged(res.valid);
              setLoading(false);
            })
            .catch(err => { setLoading(false); setIsLogged(false); console.error(err); })
        })
        .catch((err)=>{console.error(err); setLoading(false); setIsLogged(false);})
    } else {
      setLoading(false)
      setIsLogged(false)
    }
  }, [])

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
              <Interactions.Provider value={{ interactions }} >
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
                  <Route exact path="/mylibrary">
                    <MyLibrary />
                  </Route>
                  {isAdmin && (
                    <Route path="/admin">
                      <Admin />
                    </Route>)}
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Interactions.Provider>
            </Logged.Provider>
          :
          <div></div>
        }

      </Router>
    </div>
  );
}

export default App;
