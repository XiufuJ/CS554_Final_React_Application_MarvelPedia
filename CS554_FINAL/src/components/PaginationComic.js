import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './general.css';

class PaginationComics extends Component {
    constructor(props) {
        super(props);
        let pageNum = this.props.curPage;
        let startNum = pageNum % 5 == 0 ? pageNum - 4 : pageNum - pageNum % 5 + 1;
        this.state = {
            curPage: pageNum,
            startPage: startNum,
        }
        this.handleForward = this.handleForward.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(path) {
        this.props.handleProfileChange(path);
    }

    handleForward() {
        let val = document.getElementById("toPage").value;
        let path = `comics/list/${val}`;
        window.location.href = val;
    }

    render() {
        return (
            <div>
                <nav className = "row">
                    <ul className = "pagination shadow">
                        {
                            this.state.curPage !== 1 ? 
                            <li className = "page-item">
                                <NavLink className = "page-link bg-light" onClick = {this.handleChange.bind(this, `/comics/list/${(this.state.curPage - 1) + ''}`)} to = {`/comics/list/${(this.state.curPage - 1) + ''}`}>Previous</NavLink>
                            </li>
                            : null
                        }
                        <li className = {this.state.startPage === this.state.curPage? "page-item active" : "page-item"}>
                            <NavLink className = "page-link" onClick = {this.handleChange.bind(this, `/comics/list/${this.state.startPage}`)} to = {`/comics/list/${this.state.startPage}`}>{this.state.startPage}</NavLink>
                        </li>
                        <li className = {this.state.startPage + 1 === this.state.curPage? "page-item active" : "page-item"}>
                            <NavLink className = "page-link" onClick = {this.handleChange.bind(this, `/comics/list/${this.state.startPage + 1}`)} to = {`/comics/list/${this.state.startPage + 1}`}>{this.state.startPage + 1}</NavLink>
                        </li>
                        <li className = {this.state.startPage + 2 === this.state.curPage? "page-item active" : "page-item"}>
                            <NavLink className = "page-link" onClick = {this.handleChange.bind(this, `/comics/list/${this.state.startPage + 2}`)} to = {`/comics/list/${this.state.startPage + 2}`}>{this.state.startPage + 2}</NavLink>
                        </li>
                        {
                            this.state.startPage === 3596 ? null : (<li className = {this.state.startPage + 3 === this.state.curPage? "page-item active" : "page-item"}>
                                <NavLink className = "page-link" onClick = {this.handleChange.bind(this, `/comics/list/${this.state.startPage + 3}`)} to = {`/comics/list/${this.state.startPage + 3}`}>{this.state.startPage + 3}</NavLink>
                                </li>)
                        }
                        {
                            this.state.startPage === 3596 ? null : (<li className = {this.state.startPage + 4 === this.state.curPage? "page-item active" : "page-item"}>
                            <NavLink className = "page-link" onClick = {this.handleChange.bind(this, `/comics/list/${this.state.startPage + 4}`)} to = {`/comics/list/${this.state.startPage + 4}`}>{this.state.startPage + 4}</NavLink>
                            </li>)
                        }
                        
                        {
                            this.state.curPage !== 3598 ? 
                            <li className = "page-item">
                                <NavLink className = "page-link bg-light" onClick = {this.handleChange.bind(this, `/comics/list/${(this.state.curPage + 1) + ''}`)} to = {`/comics/list/${(this.state.curPage + 1) + ''}`}>Next</NavLink>
                            </li>
                            : null
                        }
                    </ul>
                    <ul className = "pagination left-20 shadow">
                        <li className = "page-item disabled"><span className = "page-link bg-light">Page</span></li>
                        <li className = "page-item">
                            <input id = "toPage" className = "page-link  pagination-input" placeholder = {this.state.curPage} defaultValue = {this.state.curPage}/>
                        </li>
                        <li className = "page-item disabled"><span className = "page-link bg-light">of 3598</span></li>
                        <li className = "page-item">
                            <button  className = "page-link bg-light" onClick = {this.handleForward}>Forward</button>
                        </li>
                    </ul>
                </nav>
               
            </div>
        );
    }
}

export default PaginationComics;