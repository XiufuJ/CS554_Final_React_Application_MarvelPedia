import React, {Component} from 'react';
import './general.css';
import Comics from './Comics';
import Navigation from './Navigation';



class ComicMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: this.props.location.pathname
        }
        //this.hendleProfileChange = this.handleProfileChange.bind(this);
    }
    
    handleProfileChange = path => {
        console.log('ComicMain.handleSearch:',path);
        this.setState({
            pathName: path
        });
    }

    render() {
        console.log("comic main rendered again");
        return (
            <div>
                <Navigation  isComic = "true" type={`Comic`} handleProfileChange = {this.handleProfileChange} {...this.state} />
                <Comics handleProfileChange = {this.handleProfileChange} pathName = {this.state.pathName} />
            </div>     
        );
    }  
}

export default ComicMain;