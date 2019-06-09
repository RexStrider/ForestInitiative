import React, { Component } from "react";
import Sidebar from "react-sidebar";
import Tabs from './../../components/Sidebar';
import './navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return (
                <Sidebar
                    id='sidebar'
                    sidebar={<div className='p-4 mt-2'>
                        <h3>The Wilderness Society</h3>
                        <Tabs />
                    </div>}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: `linear-gradient(rgba(255,255,255,1), rgba(255,255,255,.4))` } }}
                >
                 
                 <div id='burger' className='row navbar p-3' style={{}}>
                    <div className='col-md-12'>
                        <div className='row justify-content-md-center'>
                            <div className='col-sm-11 d-flex justify-content-between'>
                                <i className="fas fa-bars border border-white p-1 rounded-lg" style={{ color: 'white', fontSize: '35px' }} onClick={() => this.onSetSidebarOpen(true)}></i>
                                <button className='btn btn-primary'>Donate</button>
                            </div>
                        </div>
                    </div>
                </div>

                </Sidebar>
        );
    }
}

export default Navbar;