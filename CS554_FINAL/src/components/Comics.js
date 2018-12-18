import React, { Component } from 'react';
import './general.css';
import ComicDetail from './ComicDetail.js';
import ComicList from './ComicList.js';
import './general.css'

class Comics extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        let url = this.props.pathName;
        let urlArr = url.split('/');
        let pageNum = undefined;
        let comicId = undefined;
        let target = undefined;

        if (url.indexOf('list') === -1) {
            comicId = urlArr[urlArr.length - 1];
            target = 'detail';
        } else {
            pageNum = parseInt(urlArr[urlArr.length - 1]);
            pageNum = url === '/comics/list' || url === '/comics/list/' ? 1 : pageNum;
            target = 'list';
        }
        this.state = {
            target: target,
            curPage: pageNum,
            comicId: comicId,
        };
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
    }
    
    componentWillMount(){
        
    }
    async componentWillReceiveProps(next) {
        console.log("willReceiveProps", next.pathName);
        let url = next.pathName;
        let urlArr = url.split('/');
        let pageNum = undefined;
        let comicId = undefined;
        let target = undefined;

        if (url.indexOf('list') === -1) {
            comicId = urlArr[urlArr.length - 1];
            target = 'detail';
        } else {
            pageNum = parseInt(urlArr[urlArr.length - 1]);
            pageNum = url === '/comics/list' || url === '/comics/list/' ? 1 : pageNum;
            target = 'list';
        }
        await this.setState({
            target: target,
            curPage: pageNum,
            comicId: comicId,
        });
    }
   
    render() {
        //console.log("Comic.js rendered");
        let isDetail = this.state.target === 'detail';
        return (
            <div>
            { 
                isDetail ?(
                    <ComicDetail handleProfileChange = {this.props.handleProfileChange} id = {this.state.comicId}/>
                )
                :(
                    <ComicList pathName = {this.props.pathName} curPage = {this.state.curPage} handleProfileChange = {this.props.handleProfileChange} />
                )
            }
            </div>
        );
    }
}

export default Comics;