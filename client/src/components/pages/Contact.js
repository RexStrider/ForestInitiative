import React, { Component } from 'react';

import { getCivicInfo } from '../../API/civicInfo';

class Contact extends Component {
    state = {
        address: '',
        data: {
            divisions: []
        }
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

    // renderContent = (data) => {
    //     const cards = this.renderContent(data);
    //     // console.log(cards);

    //     // const rows = this.getRows(cards);

    //     return this.renderRows(cards)
    // }

    renderRow = row => {
        console.log(row);

        const componentRow = row.map(rep => 
            <div className='col-md-3 m-3'>
                    { this.renderRepresentative(rep) }
            </div> 
        );

        return componentRow;
    }

    getRows = (reps) => {
        const col=[];
        let row=[];
        for (let i=0; i<reps.length; i++) {
            const card = reps[i]; // get the card
            row.push(card); // push the card to the row
            if (i !== 0 && (i + 1) % 3 === 0) { // if every third card
                col.push(row); // add row to the column
                row=[]; // initialize new row
            }
        }
        return col;
    }

    renderContent = data => {
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
                            twitterId: ''
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

                        reps.push(representative);
                    }
                }
            }

            const rows = this.getRows(reps);

            console.log(rows);

            const content = rows.map(row =>
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    { this.renderRow(row) }
                </div>
            )

            // const content = reps.map(representative => 
            //     this.renderRepresentative(representative)
            // )

            return content;
        }
    }

    // create a card and push to the stack
    // gov, office, official + ' ' + address, channel
    // facebook page: https://www.facebook.com/{ facebook id here! }
    // twitter page: https://twitter.com/{ twitter id here }
    renderRepresentative = rep => {
        return(
            <div className="card" style={{width: '18rem'}}
                 key={ rep.name }>
                <div className="card-body">
                    <h5 className="card-title">{ rep.name }</h5>
                    <h6 className="card-subtitle mb-2">{ rep.title }</h6>
                    <h6 className="card-subtitle mb-2">{ rep.government }</h6>
                    { this.renderPhones(rep.phones) }
                    { this.renderAddresses(rep.addresses) }
                    {/* <p className="card-text">{rep.address}</p> */}
                    { rep.facebookId ? (<a href={(`https://www.facebook.com/${ rep.facebookId }`)} 
                                           className="card-link">Facebook</a>) : null }
                    { rep.twitterId ? (<a href={(`https://twitter.com/${ rep.twitterId }`)}
                                          className="card-link">Twitter</a>) : null }
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

    render() {
        console.log(this.state);
        return (
            <div>
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                    <div className='col-md-6 border border-white rounded-lg m-3 mt-5' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                        <h1 style={{margin: '10px 0px'}}>
                            Enter your address to search for your representatives
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
                { this.renderContent(this.state.data) }
            </div>
        );
    }
}
 
export default Contact;