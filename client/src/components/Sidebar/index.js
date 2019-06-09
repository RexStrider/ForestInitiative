import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Sidebar= () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '40%',
        // background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href='http://localhost:3000'>Home</a></li>
          <li><a href='http://localhost:3000/news'>News</a></li>
          <li><a href='http://localhost:3000/petitions'>Petitions</a></li>
          <li><a href='http://localhost:3000/map'>Map</a></li>
        </ul>
      </div>
    </div>
  </Router>
)

export default Sidebar;