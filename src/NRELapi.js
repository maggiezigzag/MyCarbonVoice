import React, {Component} from 'react';

class NRELapi extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            isLoaded: false
        }
    }


    componentDidMount() {
        fetch('https://developer.nrel.gov/api/cleap/v1/energy_expenditures_and_ghg_by_sector?zip=74133&api_key=fNxHM8Y8kuj1eFMERRIuaRNLK4r8DeSTHDsMSasq')
            .then(res => res.json())    // converting response to json format
            .then(json => {             // json formatted response data
                this.setState({
                    isLoaded: true,
                    items: json,        // data
            })
        });
    }

    render() {
        var { isLoaded, items } = this.state;
        if (!isLoaded){
            return <div>Loading...</div>
        }
        else {
            return(
                <div>
                    <ul>
                        {items.map(item => (
                            <li key={item.result.Bixby.residential.elec_lb_ghg}>
                                {item.result.Bixby}
                            </li>
                        ))};
                    </ul>
                </div>
            );
        }
    }
}