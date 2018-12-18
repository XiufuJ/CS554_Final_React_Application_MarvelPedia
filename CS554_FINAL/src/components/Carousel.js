import React, {Component} from 'react';
import carousel1 from '../images/carousel1.png';
import carousel2 from '../images/carousel2.png';
import carousel3 from '../images/carousel3.png';
import Recommendations from './Recommendations.js';
import './general.css';

class Carousel extends Component {
    constructor(props) {
        super(props);
    }

    getTweet(index) {
        if (index === '1'){
            window.location.href = "https://twitter.com/Marvel/status/1071026971432300544";

        }
        if (index === '2') {
            window.location.href = "https://twitter.com/Marvel/status/1073222118840635392";

        }
        if (index === '3') {
            window.location.href = "https://twitter.com/Marvel/status/1073215905910403072";
        }
    }

    render() {
        return (
            <div className = "event-middle">
                <div id="homeCarousel" className="carousel slide carousel-size" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#homeCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#homeCarousel" data-slide-to="1"></li>
                        <li data-target="#homeCarousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img className="d-block w-100 img-fluid" src={carousel1} onClick = {this.getTweet.bind(this, '1')} alt="New Averger" />
                        </div>
                        <div className="carousel-item img-fluid">
                        <img className="d-block w-100 img-fluid" src={carousel2} onClick = {this.getTweet.bind(this, '2')} alt="Second slide" />
                        </div>
                        <div className="carousel-item img-fluid">
                        <img className="d-block w-100 img-fluid " src={carousel3} onClick = {this.getTweet.bind(this, '3')} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#homeCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#homeCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div >
                    <Recommendations />
                </div>
            </div>
        );
    }
}
export default Carousel;