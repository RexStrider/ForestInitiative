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

    // consoleLogDivisions = (data, divisions) => {
    //     console.log(divisions);

    //     for (const key in divisions) {
    //         const gov = divisions[key]
    //         console.log('\t', gov[1].name)
    //         const officeIndices = gov[1].officeIndices;
    //         for (const key in officeIndices) {
    //             const index = officeIndices[key];
    //             const office = data.offices[index];
    //             console.log('\t\t', office.name);
    //             const officialIndices = office.officialIndices;
    //             for (const key in officialIndices) {
    //                 const index = officialIndices[key];
    //                 const official = data.officials[index];
    //                 console.log('\t\t\t', official.name);
    //             }
    //         }
    //     }
    // }

    renderPhoneNumber(phone) {
        return ( <p className="card-text">{ phone }</p> );
    }

    renderPhones(rep) {
        const phoneNumbers = [];

        console.log(rep);
        console.log(rep.phones);
        for (const key in rep.phones) {
            const phone = rep.phones[key];
            console.log(key);
            phoneNumbers.push(this.renderPhoneNumber(phone));
        }

        return phoneNumbers;
    }

    renderAddress(address) {
        return( <p className="card-text">{ address }</p> )
    }

    renderAddresses(rep) {
        const addresses = []

        for (const key in rep.addresses) {
            const address = rep.addresses[key];

            addresses.push(this.renderAddress(address));
        }

        // console.log(addresses);
        return addresses;
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
                    <h6 className="card-subtitle mb-2 text-muted">{ rep.title }</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{ rep.government }</h6>
                    { this.renderPhones(rep) }
                    { this.renderAddresses(rep) }
                    {/* <p className="card-text">{rep.address}</p> */}
                    { rep.facebookId ? (<a href={(`https://www.facebook.com/${ rep.facebookId }`)} 
                                           className="card-link">Facebook</a>) : null }
                    { rep.twitterId ? (<a href={(`https://twitter.com/${ rep.twitterId }`)}
                                          className="card-link">Twitter</a>) : null }
                </div>
            </div>
        )
    }

    renderContent = data => {
        const content = [];
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

                        // console.log( gov.name, '\n',
                        //             office.name, '\n',
                        //             official.name, '\n',
                        //             official.party, '\n',
                        //             official.phones, '\n',
                        //             official.urls, '\n',
                        //             official.photoUrl );

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
                            representative.addresses.push(address.line1 + ' ' + address.line2 + ' ' + address.line3 );
                            representative.addresses.push(address.city + ' ' + address.state + ' ' + address.zip);
                        }
                        for (const key in officialChannels) {
                            const channel = officialChannels[key];
                            // console.log(channel.type, channel.id);
                            
                            if ('facebook' === channel.type.toLowerCase()) {
                                representative.facebookId=channel.id;
                            }

                            if ('twitter' === channel.type.toLowerCase()) {
                                representative.twitterId=channel.id;
                            }

                            //google plus
                        }

                        content.push(this.renderRepresentative(representative));
                    }
                }
            }

            return content;
        }
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
                <div className='row justify-content-md-center mt-5 text-dark text-center'>
                        {this.renderContent(this.state.data)}
                </div>
            </div>
        );
    }
}
 
export default Contact;