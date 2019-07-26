import './CivicInfo.css';

import React, { Component } from 'react';

import { getCivicInfo } from '../../API/civicInfo';

class CivicInfo extends Component {
    state = {
        // address state is defaulted to an empty string
        address: '',
        // civic info data
        data: {
            // one of three arrays returned by google civic info
            // we check this value to make sure the data state was updated
            divisions: []
        }
    }

    // renders the civic info component
    render() {
        return (
            <div>
                {/* <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h2 style={{margin: '10px 0px'}}>
                            Powered by<br />Google Civic Information
                        </h2>
                    </div>
                </div> */}

                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h2 style={{margin: '10px 0px'}}>
                            Enter your address to search for your representatives
                        </h2>

                        <input
                        name='address'
                        value={ this.state.address }
                        onChange={ this.handleInput }
                        onKeyPress={ this.handleKeyPress }
                        className="form-control"
                        style={{height: '60px', fontSize: '18px'}}
                        type="text"
                        placeholder="enter your address"
                        aria-label="search" />
                        
                        <div style={{margin: '25px 0px'}}></div>
                    </div>
                </div>

                { this.renderCivicInfo(this.state.data) }
            </div>
        );
    }

    // sets the address state of the react component on every key press entered into the address field
    handleInput = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    // retrieves the representatives for the address when the enter key is pressed
    handleKeyPress = async event => {
        if (event.key === 'Enter') {
            const address = this.state.address;
            const data = await getCivicInfo(address);
            this.setState({ data: data.body });
        }
    }

    // renders the civic information for the user if it's available
    renderCivicInfo = data => {

        // api returns undefined if it can't find the civic information for the given address
        if (data === undefined) {
            return (
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h2>Unfortunately, we could not find your representatives...</h2>
                    </div>
                </div>
            )
        }

        // an array of representatives
        const reps = [];

        // divisions is the first of three arrays returned by the civic info api
        // api returns divisions as an object with a complex key containing many special characters
        // our solution is to turn that object into an array of objects using the following method
        const divisions = Object.entries(data.divisions);

        // the three arrays returned by the api are divisions, offices, and officials
        // divisions refers to the level of government the office falls under
        //   this could be on the National level, or the State level
        //   the api may mark this as United States, or use the name of the state
        // offices refers to the organization of government
        //   this could be a specific judicial branch (like the supreme court or a specific circuit)
        //   or it could be the governor of the states office, or the legislative office, or the supreme court
        // officials refers to specific people.
        //   for example, our current sitting president Trump, or the head of your states govenment
        //   or a specific representative for your state, be it for the senate or the house

        if (divisions.length > 0) {
            for (const key in divisions) {
                const gov = divisions[key][1];
                const officeIndices = gov.officeIndices;
                for (const key in officeIndices) {
                    const index = officeIndices[key];
                    const office = data.offices[index];
                    const officialIndices = office.officialIndices;
                    for (const key in officialIndices) {
                        const index = officialIndices[key];
                        const official = data.officials[index];

                        // divisions contains an array of indices that relate to the offices array
                        // offices contains an array of indices that relate to the officials array
                        // we have to loop through each array to get those indices
                        // and retrieve all of the data for a specific representative
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

                        // the full address is separated into several pieces of data
                        // so we have to re-construct the address
                        // more than one address might be listed for the representative
                        for (const key in officialAddresses) {
                            const address = officialAddresses[key];
                            representative.addresses.push([
                                address.line1 + ' ' + address.line2 + ' ' + address.line3,
                                address.city + ' ' + address.state + ' ' + address.zip
                            ]);
                        }

                        // the most common channels returned by this api are facebook and twitter
                        // but not every representative has either of these channels
                        // so we check to see what kind of channel the representative has
                        // not all channels are up to date, but the channels below have been current for most representatives
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

            // this is used for formating representatives into rows
            // representatives can be set up into rows of 2 or more per row
            const rows = this.getRows(reps);

            const content = rows.map(row =>
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    { this.renderRow(row) }
                </div>
            )

            return content;
        }
    }

    // used to set how many representatives are displayed per row
    // any changes made to the cards per row constant must also be reflected in the render row method
    getRows = (reps) => {
        const col=[];
        let row=[];
        const cardsPerRow = 1; // 1 card per row, if changed then make sure line 207 matches this setting
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

    // renders the row displaying the representative(s)
    // depends on settings set for get rows and render row methods
    renderRow = row => {
    // line 207: col-md-6 sets card width to size of the search bar on the contacts page,
    // if changed make sure line 187 is set to the appropriate setting.
    // Currently its set to 1 card per row.
    // Set to col-md-4 for 2 cards per row and change line 129 to match the setting
        const componentRow = row.map(rep => 
            <div className='col-md-6 m-3'>
                    { this.renderRepresentative(rep) }
            </div> 
        );

        return componentRow;
    }

    // renders a representative
    renderRepresentative = rep => {
        let {start, end} = 0;
        // determines how much of the url to a representatives website is displayed on the card
        // while maintaining the full url for the anchor tag
        if (rep.urls) {
            const url = rep.urls[0]

            // determines if the url contains https or http
            start = url.substring(0, 5) === 'https' ? 8 : 7;
            // determines if the url has a '/' character at the end
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

                    {/* Representatives personal website url is returned as an array of one string if it exists
                        I know it's weird, it's just the convention used by Google Civic Info
                        The code below is a result of working within that convention */}
                    { rep.urls ? (<a href={rep.urls[0]} className="card-link">{ rep.urls[0].substring(start, end) }</a>) : null }
                </div>
            </div>
        )
    }

    // creates the phone number components and returns them in an array
    renderPhones(phoneNumbers) {
        const ary = [];
        for (const key in phoneNumbers) {
            const phone = phoneNumbers[key];
            ary.push(this.renderPhoneNumber(phone));
        }
        return ary;
    }

    // creates the address components and returns them in an array
    renderAddresses(addresses) {
        const ary = []
        for (const key in addresses) {
            const address = addresses[key];
            ary.push(this.renderAddress(address));
        }
        return ary;
    }

    // renders a phone number component
    renderPhoneNumber(phone) {
        return ( 
        <div className='phone-numbers'>
            <p className="card-text">{ phone }</p>
        </div>);
    }

    // renders an address component
    renderAddress(address) {
        return(
            <div className='address'>
                <p className="card-text">{ address[0] }</p>
                <p className="card-text">{ address[1] }</p>
            </div>
        )
    }
}
 
export default CivicInfo;