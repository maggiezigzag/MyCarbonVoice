import React, {useState} from 'react';
// import './NRELapi.js'
import axios from 'axios';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFnZ2llemlnemFnIiwiYSI6ImNrZ2UwMmpxNjBjbWQyeGw3MHU2OHMza2wifQ.R4wV_x3v1qvC1_t31pyjdg';
// api_key = 'fNxHM8Y8kuj1eFMERRIuaRNLK4r8DeSTHDsMSasq'  

const Slider = () => {
    const [ value, setValue ] = useState(50); 
    return (
      <RangeSlider
        min = {0}
        max = {100}
        step = {1}
        value={value}
        onChange={changeEvent => setValue(changeEvent.target.value)}
      />
    );
  };

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: -97.5164,
            lat: 35.4676,
            zoom: 4,
            items: [],
            isLoaded: false,
            emmissions: []
            
        };
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
             
        map.on('move', () => {
            this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
            });

            
        });
        // fetch('https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?zip=74133&api_key=fNxHM8Y8kuj1eFMERRIuaRNLK4r8DeSTHDsMSasq')
        //     .then(res => res.json())    // converting response to json format
        //     .then(json => {             // json formatted response data
        //         this.setState({
        //             isLoaded: true,
        //             items: json,        // data
        //     })
        // });

        axios.get(`https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?zip=74133&api_key=fNxHM8Y8kuj1eFMERRIuaRNLK4r8DeSTHDsMSasq`)
          .then(res => {
            const emmissions = Object.values(res.data);
            this.setState({ emmissions });
            console.log(emmissions)

          })
    }
    render() {
        return(
            <div>
                <div className='sidebarStyle'>
                    <h1>My Carbon Voice</h1>
                    {/* <Slider></Slider> */}
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">Zip Code</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <br/>
                    {/* <DropdownButton id="dropdown-basic-button" title="Income Level">
                        <Dropdown.Item href="#/action-1">Less than $10,000</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">$10,000 to $19,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">$20,000 to $29,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">$30,000 to $39,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">$40,000 to $49,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-6">$50,000 to $59,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-7">$60,000 to $69,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-8">$70,000 to $79,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-9">$80,000 to $89,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-10">$90,000 to $99,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-11">$100,000 to $119,999</Dropdown.Item>
                        <Dropdown.Item href="#/action-12">$120,000 or more</Dropdown.Item>
                    </DropdownButton> */}
                    <p>How much are you willing to pay?</p>
                    <Slider></Slider>
                    <p>You will reduce __</p>
                    <p>Your city will reduce __</p>
                    <p>Your city has $__</p>
                    {/* <ul>
                        { this.state.emmissions.map(emmission => <li key="Tulsa">{emmission}</li>)}
                    </ul> */}

                    {/* <div><iframe width="950px" title="2016 - Citywide Emissions, Map" height="808px" src="https://data.cdp.net/w/iqbu-zjaj/hh8z-a6hj?cur=mr5_Jdv9rwa&from=root" frameborder="0"scrolling="no"><a href="https://data.cdp.net/Emissions/2016-Citywide-Emissions-Map/iqbu-zjaj" title="2016 - Citywide Emissions, Map" target="_blank">2016 - Citywide Emissions, Map</a></iframe></div> */}
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}
ReactDOM.render(<Application />, document.getElementById('app'));