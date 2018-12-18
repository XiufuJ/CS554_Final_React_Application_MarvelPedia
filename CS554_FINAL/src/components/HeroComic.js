import React, { Component } from 'react';

class HeroComic extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.index);
    }

    handleChange(index) {
        console.log("The clicked index is", index)
        this.props.handleIndexChange(index);
    }
    render() {
        return (
            <div className = "mx-auto one-card">
                <div className="card card-config shadow-lg rounded">
                    <img className="card-img-top card-img" src = {this.props.imgSrc} alt={this.props.title} />
                    <div className="card-body bg-dark">
                        <h5 className="card-title card-intro text-white">{this.props.title}</h5>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#comicDescription" onClick = {this.handleChange.bind(this, this.props.index)}>
                        Check description
                        </button>
                    </div> 
                </div>
                
            </div>
        );
    }
}

export default HeroComic;