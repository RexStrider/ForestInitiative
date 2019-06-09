import React from 'react';
import Navbar from './containers/Navbar';
import Home from './components/pages/Home';
import News from './components/pages/News';
import Petitions from './components/pages/Petitions';
import MapView from './components/pages/Map';
import Donate from './components/pages/Donate';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/news' component={News} />
          <Route exact path='/petitions' component={Petitions} />
          <Route exact path='/map' component={MapView} />
          <Route exact path='/congress' />
          <Route exact path='/donate' component={Donate} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
