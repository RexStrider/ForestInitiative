import React, { Component } from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MapComponent from './MapComponent'

class MapView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLatLng: {
                lat: 0,
                lng: 0
            },
            isMarkerShown: true
        }
    }

    // componentWillUpdate() {
    //     this.getGeoLocation()
    // }

    componentDidMount() {
        this.getGeoLocation()
        // this.delayedShowMarker()
    }

    // delayedShowMarker = () => {
    //     setTimeout(() => {
    //         this.getGeoLocation()
    //         this.setState({ isMarkerShown: true })
    //     }, 5000)
    // }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: true })
        this.delayedShowMarker()
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            console.log('error');
        }
    }

    render() {
        return (
            <div className='row justify-content-md-center mt-5'>
                <div className='col-md-6 mt-5 m-4 p-3 pl-4 pb-5 rounded-lg text-center' style={{ backgroundColor: `rgba(255,255,255,.8)` }}>
                    <h1 className='border-bottom border-dark mb-3 pb-2'>GeoLocation</h1>
                    <h3 className='text-left'>In a National Forest right now?</h3>
                    <p className='text-left'>Click your location on the map to get info about the forest you are in!</p>

                    <p>Map Tool still under construction!</p>
                    <MapComponent
                        className='ml-4'     
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                        currentLocation={this.state.currentLatLng}
                    />
                </div>
            </div>
        )
    }
}

export default MapView;