import React from 'react';
import Navbar from './containers/Navbar';
import Home from './components/pages/Home';
import News from './components/pages/News';
import Contact from './components/pages/Contact';
import Petitions from './components/pages/Petitions';
import MapView from './components/pages/Map';
import Congress from './containers/Congress';
import Donate from './components/pages/Donate';

import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/news' component={News} />
        <Route path='/contact' component={Contact} />
        <Route path='/petitions' component={Petitions} />
        <Route path='/map' component={MapView} />
        <Route path='/congress' component={Congress}/>
        <Route path='/donate' component={Donate} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
