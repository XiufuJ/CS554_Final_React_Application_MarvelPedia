import React, { Component } from 'react';
import imgNA from '../images/imgNA.jpg';
import {NavLink} from 'react-router-dom';
import cookie from 'react-cookies';
import './general.css';

class ComicItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: this.props.info.images.length > 0 ? `${this.props.info.images[0].path}.${this.props.info.images[0].extension}` : imgNA
        };
         console.log(this.props.info);
    }

    async handleChange(id) {
        cookie.save('prevUrl', this.props.pathName, {path: '/'});
        await this.props.handleProfileChange(`/comics/detail/${id}`);
    }
    render() {
        return (
            <div className = "mx-auto one-card rounded">
                <div className="card card-config shadow">
                    <img className="card-img-top card-img" src = {this.state.imgSrc} alt={this.props.info.title} />
                    <div className="card-body ">
                        <h5 className="card-title card-intro">{this.props.info.title}</h5>
                        <NavLink to = {`/comics/detail/${this.props.info.id}`}
                         onClick = {this.handleChange.bind(this, this.props.info.id)} 
                         className="btn btn-primary">
                         Check details
                         </NavLink>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default ComicItem;

