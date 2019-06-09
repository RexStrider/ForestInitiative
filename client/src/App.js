import React from 'react';
import Navbar from './containers/Navbar';
import Home from './components/pages/Home';
import News from './components/pages/News';
import Petitions from './components/pages/Petitions';
import Gmap from './components/pages/Map';
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
          <Route exact path='/map' component={Gmap} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
