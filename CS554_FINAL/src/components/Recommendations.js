import React, {Component} from 'react';
import './general.css';
import axios from 'axios';
import Loading from './Loading.js';
import refreshIcon from '../images/refreshIcon.png'
const CryptoJS = require("crypto-js");

class Recommmendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recs: null,
            init: true
        }
        this.getRandom = this.getRandom.bind(this);
        this.getRecs = this.getRecs.bind(this);
        this.refresh = this.refresh.bind(this);
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
    }

    getRandom (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    async getRecs() {
        try {
            let skip = this.getRandom(0, 74) + '';
            console.log(skip);
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            const response = await axios.get(`https://gateway.marvel.com/v1/public/events?offset=${skip}&limit=6&${script}`);
            //console.log(response.data); 
            console.log(response.data.data.results);
            this.setState({
                recs: response.data.data.results
            });
        } catch(e) {
            console.log(e);
        }
        
        
    }

    async componentWillMount () {
        await this.getRecs();
        this.setState({
            init: false
        });
    }

    refresh() {
        this.setState({
            recs: null
        });
        this.getRecs();
    }
    
    render() {
        return (
            <div>
                {
                    this.state.init ? null : (
                        <div className = "text-right refresh-button">
                            <span className = "text-middle right-3 font-weight-bold">Events Recommendation</span>
                            <button onClick = {this.refresh} className = "right-3 btn btn-danger font-weight-bold">
                                <img className = "g-icon" src = {refreshIcon} />
                                Refresh
                            </button>
                        </div>
                        
                    )
                }
                {
                    this.state.recs === null ? (
                        <div className = "horizonal-middle">
                            <Loading />
                        </div>
                    ) : (    
                        <div className = "row">
                            {
                                this.state.recs.map((arr, index) => {
                                    return (
                                        <div key = {index} className = "mx-auto top-20 rounded bg-secondary event-detail border shadow bottom-20"> 
                                            <div className = "bg-dark text-white font-weight-bold">
                                                {arr.title}
                                            </div>
                                            <div className = "text-white passage-center">
                                                {arr.description}
                                            </div>
                                        </div>  
                                    )
                                })
                            }
                        </div>   
                    )
                    
                   
                }
            </div>
        );
    }
}

export default Recommmendations;