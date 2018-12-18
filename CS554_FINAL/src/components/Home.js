import React, {Component} from 'react';
import Carousel from './Carousel.js';
import Navigation from './Navigation.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommend : null
        }
    }

    async getReccomend() {

    }

    render() {
        return (
            <div>
                <Navigation />
                <div>
                    <Carousel />
                </div> 
            </div>
        );
    }
}

export default Home;