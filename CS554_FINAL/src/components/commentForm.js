import api from '../api';
import React, { Component } from 'react';
import './general.css';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ comment: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.comment !== ''){
        const result = api.createComentByComicId(this.props.heroId,this.props.user,this.state.comment);
        result.then(
            this.props.rerender(this.props.heroId)
        )
    }
    }

    render() {
        return(
            <form className="commentform form-group" onSubmit={this.handleSubmit}>
            
                    <label className = "font-weight-bold">Leave your comment:</label>
                    <textarea className = "mx-auto comment-text-area form-control bottom-20" type="text" onChange={this.handleChange} />
                    <input className = "btn btn-primary font-weight-bold" type="submit" value="Submit" />
            </form>
        )
    }
}
export default CommentForm;