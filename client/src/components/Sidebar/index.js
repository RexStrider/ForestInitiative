import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar= () => (
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '80%',
        // background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          <li><Link to='/' style={{fontSize: '25px', color: '#115E1B', paddingTop: '2%'}}>Home</Link></li>
          <li><Link to='/news' style={{fontSize: '25px', color: '#115E1B'}}>News</Link></li>
          <li><Link to='/petitions' style={{fontSize: '25px', color: '#115E1B'}}>Petitions</Link></li>
          <li><Link to='/map' style={{fontSize: '25px', color: '#115E1B'}}>Map</Link></li>
          <li><Link to='/congress' style={{fontSize: '25px', color: '#115E1B'}}>Email-Congress</Link></li>
          <li><Link to='/donate' style={{fontSize: '25px', color: '#115E1B'}}>Donate</Link></li>
        </ul>
      </div>
    </div>
)

export default Sidebar;