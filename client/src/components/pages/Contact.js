import './Contact.css';

import React, { Component } from 'react';

import { getCivicInfo } from '../../API/civicInfo';

class Contact extends Component {
    state = {
        address: '',
        data: {
            divisions: []
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h2 style={{margin: '10px 0px'}}>
                            Enter your address to search for your representatives
                        </h2>

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

                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h2 style={{margin: '10px 0px'}}>
                            Powered by<br />Google Civic Information
                        </h2>
                    </div>
                </div>

                { this.renderContent(this.state.data) }
            </div>
        );
    }

    handleInput = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    handleKeyPress = async event => {
        if (event.key === 'Enter') {
            const address = this.state.address;
            const data = await getCivicInfo(address);
            this.setState({ data: data.body });
        }
    }

    renderContent = data => {
        if (data === undefined) {
            console.log('data', data);
            return (
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h2>Unfortunately, we could not find your representatives...</h2>
                    </div>
                </div>
            )
        }
        const reps = [];
        const divisions = Object.entries(data.divisions);

        if (divisions.length > 0) {
            for (const key in divisions) {
                const gov = divisions[key][1]
                const officeIndices = gov.officeIndices;
                for (const key in officeIndices) {
                    const index = officeIndices[key];
                    const office = data.offices[index];
                    const officialIndices = office.officialIndices;
                    for (const key in officialIndices) {
                        const index = officialIndices[key];
                        const official = data.officials[index];

                        const representative = {
                            name: official.name,
                            title: office.name,
                            government: gov.name,
                            addresses: [],
                            phones: official.phones,
                            facebookId: '',
                            twitterId: '',
                            photoUrl: official.photoUrl,
                            urls: official.urls
                        }

                        const officialAddresses = official.address;
                        const officialChannels = official.channels;

                        for (const key in officialAddresses) {
                            const address = officialAddresses[key];
                            representative.addresses.push([
                                address.line1 + ' ' + address.line2 + ' ' + address.line3,
                                address.city + ' ' + address.state + ' ' + address.zip
                            ]);
                        }

                        for (const key in officialChannels) {
                            const channel = officialChannels[key];

                            if ('facebook' === channel.type.toLowerCase()) {
                                representative.facebookId=channel.id;
                            }

                            if ('twitter' === channel.type.toLowerCase()) {
                                representative.twitterId=channel.id;
                            }
                        }

                        reps.unshift(representative);
                    }
                }
            }

            const rows = this.getRows(reps);

            const content = rows.map(row =>
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    { this.renderRow(row) }
                </div>
            )

            return content;
        }
    }

    // 
    getRows = (reps) => {
        const col=[];
        let row=[];
        const cardsPerRow = 1; // 1 card per row, if changed then make sure line 149 matches this setting
        for (let i=0; i<reps.length; i++) {
            const card = reps[i]; // get the card
            row.push(card); // push the card to the row
            if (i !== 0 && (i + 1) % cardsPerRow === 0) {
                col.push(row); // add row to the column
                row=[]; // initialize new row
            }
        }
        return col;
    }

    renderRow = row => {
        // console.log(row);
// line 149: col-md-6 sets card width to size of the search bar on the contacts page,
// if changed make sure line 129 is set to the appropriate setting.
// Currently its set to 1 card per row.
// Set to col-md-4 for 2 cards per row and change line 129 to match the setting
        const componentRow = row.map(rep => 
            <div className='col-md-6 m-3'>
                    { this.renderRepresentative(rep) }
            </div> 
        );

        return componentRow;
    }

    renderRepresentative = rep => {
        let {start, end} = 0;

        if (rep.urls) {
            const url = rep.urls[0]

            start = url.substring(0, 5) === 'https' ? 8 : 7;
            end = url.substring(url.length-1, url.length) === '/' ? url.length-1 : url.length;
        }

        return(
            <div className="card"
                 key={ rep.name }>
                <div className="card-body">
                    { rep.photoUrl ? <img src={rep.photoUrl} alt='' style={{width: '200px'}}/> : null }
                    <h5 className="card-title">{ rep.name }</h5>
                    <h6 className="card-subtitle mb-3">{ rep.title }</h6>
                    <h6 className="card-subtitle mb-3">{ rep.government }</h6>
                    { this.renderPhones(rep.phones) }
                    { this.renderAddresses(rep.addresses) }
                    <div>
                        { rep.facebookId ? (<a href={(`https://www.facebook.com/${ rep.facebookId }`)} 
                                            className="card-link">Facebook</a>) : null }
                        { rep.twitterId ? (<a href={(`https://twitter.com/${ rep.twitterId }`)}
                                            className="card-link">Twitter</a>) : null }
                    </div>
                    { rep.urls ? (<a href={rep.urls[0]} className="card-link">{ rep.urls[0].substring(start, end) }</a>) : null }
                </div>
            </div>
        )
    }

    renderPhones(phoneNumbers) {
        const ary = [];
        for (const key in phoneNumbers) {
            const phone = phoneNumbers[key];
            ary.push(this.renderPhoneNumber(phone));
        }
        return ary;
    }

    renderAddresses(addresses) {
        const ary = []
        for (const key in addresses) {
            const address = addresses[key];
            ary.push(this.renderAddress(address));
        }
        return ary;
    }

    renderPhoneNumber(phone) {
        return ( 
        <div className='phone-numbers'>
            <p className="card-text">{ phone }</p>
        </div>);
    }

    renderAddress(address) {
        return(
            <div className='address'>
                <p className="card-text">{ address[0] }</p>
                <p className="card-text">{ address[1] }</p>
            </div>
        )
    }

    
}
 
export default Contact;