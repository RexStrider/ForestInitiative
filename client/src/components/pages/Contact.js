import React, { Component } from 'react';

import { getCivicInfo } from '../../API/civicInfo';

class Contact extends Component {
    state = {
        address: '',
        offices: [],
        officials: []
    }

    handleInput = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    handleKeyPress = async event => {
        if (event.key === 'Enter') {
            const address = this.state.address;
            const data = await getCivicInfo(address);
            console.log(data);
            this.setState({
                offices: data.body.offices,
                officials: data.body.officials
            });
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className='row justify-content-md-center mt-5 text-dark text-center'>
                <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                    <h1>
                        address for your representative
                    </h1>

                    <input
                    name='address'
                    value={this.state.address}
                    onChange={this.handleInput}
                    onKeyPress={this.handleKeyPress}
                    className="form-control"
                    style={{height: '60px', fontSize: '18px'}}
                    type="text"
                    placeholder="enter your address"
                    aria-label="search" />

                    <div style={{margin: '25px 0px'}}></div>
                </div>
            </div>
        );
    }
}
 
export default Contact;