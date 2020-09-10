import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Home from './components/Home/Home';
import Albums from './components/Albums/Albums';
import Artists from './components/Artists/Artists';
import Playlists from './components/Playlists/Playlists';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/Albums" exact component={Albums} />
        <Route path="/Artists" exact component={Artists} />
        <Route path="/Playlists" exact component={Playlists} />
      </Router>
    </div>
  );
}

export default App;
