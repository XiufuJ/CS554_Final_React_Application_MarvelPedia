import React, {Component} from 'react';
import ComicItem from './ComicItem.js';
import PaginationComic from './PaginationComic.js';
import axios from 'axios';
import './general.css';
import Loading from './Loading.js';
const CryptoJS = require("crypto-js");

class ComicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: this.props.curPage,
            list: undefined
        }
        //console.log("comcilist constructor");
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
    }

    async componentWillMount() {
       // console.log("ComicList.ComponentWillReceiveProps");
        try {
            let ts = new Date().getTime();
            let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
            let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`;
            let skip = ((this.state.pageNum - 1) * 12) + '';
            const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?offset=${skip}&limit=12&${script}`);
            this.setState({ list: response.data.data.results });
          //  console.log(response);
          //  console.log(this.state.curPage);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
      //  console.log(this.state.list);
        return (
            !this.state.list ?
            (<Loading />)
            :(<div>
                <div className = "card-list-config row">
                    {
                        this.state.list.map((arr, index) => {
                            return (
                                <ComicItem pathName = {`/comics/list/${this.state.pageNum}`} handleProfileChange = {this.props.handleProfileChange} info = {arr} key = {index} />
                            );
                        })
                    }
                </div>
                <div className = "pags">
                    <PaginationComic handleProfilePage = {this.props.handleProfileChange} curPage = {this.state.pageNum} /> 
                </div>
            </div>)
        );
    }
}

export default ComicList;