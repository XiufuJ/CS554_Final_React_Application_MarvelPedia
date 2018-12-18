import React, { Component } from 'react';
import './Searchbar.css';
import axios from 'axios';
import Downshift from 'downshift';
import {NavLink} from 'react-router-dom';
var CryptoJS = require("crypto-js");

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: undefined,
            searchData: undefined,
            items: []
        }
        this.PUBLIC_KEY = `b297a0863017d3e43a78d69c0102bab1`;
        this.PRIV_KEY = `6cfadf50b9063ab192b648f5d892f9d89101bb6b`;
    }

    async getHeros() {

    }

    inputOnChange(event) {
        if (!event.target.value) {
            return;
        }
        this.fetchMovies(event.target.value);
    }

    handleChange = (e) => {
        let value = e.target.value;

        if (this.props.type === `Hero`) {
            this.setState({ searchTerm: value }, () => {
                this.searchHeros();
            });
        } else
            if (this.props.type === `Comic`) {
                this.setState({ searchTerm: value }, () => {
                    this.searchComics();
                });
            } else {
                throw (`no search type`);
            }
    }

    async searchComics() {
        if (this.state.searchTerm) {
            try {
                let ts = new Date().getTime();
                let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
                let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`
                const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?titleStartsWith=${this.state.searchTerm}&orderBy=title&limit=6&${script}`);
                this.setState({ searchData: response.data });
                let item = [];
                if (this.state.searchData.data.results) {
                    this.state.searchData.data.results.map(comics => {
                        let title = comics.title;
                        let id = comics.id;
                        item.push({ value: `${title}`,id: id });
                        return null;
                    })
                    this.setState({ items: item });
                }
            } catch (e) {
                console.log(e);
            }
        }


    }

    async searchHeros() {
        if (this.state.searchTerm) {
            try {
                let ts = new Date().getTime();
                let hash = CryptoJS.MD5(ts + this.PRIV_KEY + this.PUBLIC_KEY).toString();
                let script = `ts=${ts}&apikey=${this.PUBLIC_KEY}&hash=${hash}`
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${this.state.searchTerm}&orderBy=name&limit=6&${script}`);
                this.setState({ searchData: response.data });
                let item = [];
                if (this.state.searchData.data.results) {
                    this.state.searchData.data.results.map(heros => {
                        let name = heros.name;
                        let id = heros.id;
                        item.push({ value: `${name}`,id: id });
                        return null;
                    })
                    this.setState({ items: item });

                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    async handleClickComic(path) {
        await this.props.handleProfileChange(path);
    }

    render() {
        return (
            <Downshift
                onChange={selection => {
                    let profileName = selection.id;
                    if (this.props.type === `Hero`) {
                        this.props.handleProfileChange(profileName);
                    }
                    
                    if (this.props.type === `Comic`) {
                        this.props.handleProfileChange(`/comics/detail/${profileName}`);
                    }
                    
                }

                }
                itemToString={item => (item ? item.value : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                }) => (

                        <div style={{ position: `relative` }}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <label className="font-weight-bold input-group-text" {...getLabelProps()}>Search {this.props.type}: </label>
                                </div>
                                <input className="form-control" {...getInputProps({
                                    onChange: this.handleChange
                                })} />
                            </div>


                            {isOpen ? (
                                <div>
                                    <div className="downshift-dropdown border rounded">
                                        {this.state.items
                                            .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                                            .map((item, index) => (
                                                <div className="dropdown-item"
                                                    {...getItemProps({
                                                        key: item.value,
                                                        index,
                                                        item,
                                                        style: {
                                                            backgroundColor:
                                                                highlightedIndex === index ? 'lightgray' : 'white',
                                                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                        },
                                                    })}
                                                >
                                                {
                                                    this.props.type === 'Hero' ? (
                                                        <a className = "nav-link text-dark" href = "javascript:void(0)">{item.value}</a>
                                                        ) : (
                                                        <NavLink className = "nav-link text-dark" 
                                                            onClick = {this.handleClickComic.bind(this, `/comics/detail/${item.id}`)} 
                                                            to = {`/comics/detail/${item.id}`}>{item.value}</NavLink>  
                                                        )
                                                }
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}
            </Downshift>
        )
    }
}

export default Searchbar;

