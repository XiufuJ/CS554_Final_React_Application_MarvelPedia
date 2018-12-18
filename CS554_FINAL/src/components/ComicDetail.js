import React, {Component} from 'react';
import imgNA from '../images/imgNA.jpg';
import axios from 'axios';
import './general.css';
import Loading from './Loading.js';
import {NavLink} from 'react-router-dom';
import cookie from 'react-cookies';
import api from '../api';
const CryptoJS = require("crypto-js");

class ComicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            info: undefined,
            imgSrc: undefined,
            prevUrl: cookie.load('prevUrl'),
        }
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
        this.getData = this.getData.bind(this);
        this.comicRef = React.createRef();
       // this.pdf = this.pdf.bind(this);
    }

    async getData(id) {
        try {
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${id}?${script}`); 
            this.setState({ 
                info: response.data.data.results[0],
            });
            let imgSrc =  this.state.info.images.length !== 0 ? `${this.state.info.images[0].path}.${this.state.info.images[0].extension}` : imgNA
             this.setState({
                imgSrc:imgSrc
            });
        } catch (e) {
            console.log(e);
        }
    }
     pdf = async() => {
        console.log('ref test')
        console.log(this.state.ref);
       // let ref = React.createRef();
        //console.log(this.comicRef);
        await api.generatePdf(this.comicRef.current);
    }

    async componentWillMount() {
        console.log('will mount this shit',this.state.id);
        await this.getData(this.state.id);
        this.setState({
            ref: React.createRef()
        });
        //console.log("res", res);
    }

    async componentWillReceiveProps(next) {
        console.log('will receive props');
        await this.getData(next.id);
    }

    async handleBack(prevUrl) {
        console.log(prevUrl);
        await this.props.handleProfileChange(prevUrl);
        // Clear cookie.
        cookie.remove('prevUrl',{path: '/'});
    }

    render() {
      //  console.log('detail render', this.state.id, this.state.info);
      // console.log(this.state.prevUrl);

        return (
            !this.state.info ?
                (<Loading />)
            :(<div ref = {this.comicRef}>
                <div className = "row comic-detail bg-dark text-white rounded shadow-lg" >
                    <div>
                        <img className = "border detail-img" src = {this.state.imgSrc} alt = "" />
                    </div>
                
                    <div className = "mx-auto">
                        <h4 className = "top-margin-5">{this.state.info.title}</h4>
                        <div className = "detail-width"> 
                            <div>
                                <div className = "text-left">
                                    <label className = "labelLen text-right font-weight-bold">{this.state.info.dates[0].type}: </label>
                                    <label className = "comic-detail-info">  {this.state.info.dates[0].date}</label>
                                </div>
                                <div  className = "text-left">
                                    <label className = "labelLen text-right font-weight-bold">{this.state.info.dates[1].type}: </label>
                                    <label className = "comic-detail-info">  {this.state.info.dates[1].date}</label>
                                </div>
                                <div  className = "detail-width text-left">
                                    <label className = "labelLen text-right font-weight-bold">{this.state.info.prices[0].type}: </label>
                                    <label className = "comic-detail-info">${this.state.info.prices[0].price}</label>
                                </div>
                                <p>{this.state.info.description !== null ? this.state.info.description : 'Description not available'}</p>
                                
                            </div>                        
                        </div>
                        <div className = "row left-10 bottom-20">
                            {
                                this.state.prevUrl === undefined ? null : (
                                    <NavLink className = "btn btn-primary text-white font-weight-bold right-3"
                                        onClick = {this.handleBack.bind(this, this.state.prevUrl)}
                                        to = { this.state.prevUrl === undefined ? './comics/list/1' : this.state.prevUrl}>
                                        Back to list
                                    </NavLink>
                                )
                            }
                            <button className = "btn btn-success font-weight-bold" onClick = {this.pdf}>Download PDF</button>
                        </div>
                    </div>    
                </div>
            </div>)
        );
    };
}

export default ComicDetail;