import React, {Component} from 'react';
import loading from '../images/loading.gif';
import './general.css';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info : null
        }
    }
    render() {
        return (
            <div className = "top-margin-10">
                <img src = {loading} alt = "Loading" />
                <h3>Loading...</h3>
            </div>
        );
    }
}

export default Loading;