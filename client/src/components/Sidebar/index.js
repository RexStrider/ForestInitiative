import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Sidebar= () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '80%',
        // background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li><a href='http://localhost:3000' style={{fontSize: '25px', color: '#115E1B', paddingTop: '2%'}}>Home</a></li>
          <li><a href='http://localhost:3000/news' style={{fontSize: '25px', color: '#115E1B'}}>News</a></li>
          <li><a href='http://localhost:3000/petitions' style={{fontSize: '25px', color: '#115E1B'}}>Petitions</a></li>
          <li><a href='http://localhost:3000/map' style={{fontSize: '25px', color: '#115E1B'}}>Map</a></li>
          <li><a href='http://localhost:3000/congress' style={{fontSize: '25px', color: '#115E1B'}}>Email-Congress</a></li>
          <li><a href='http://localhost:3000/Donate' style={{fontSize: '25px', color: '#115E1B'}}>Donate</a></li>
        </ul>
      </div>
    </div>
  </Router>
)

export default Sidebar;