import React, { Component } from 'react';
// import Searchbar from './Searchbar';
import Profile from './Profile';
import Navigation from './Navigation';
import cookie from 'react-cookies';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: this.props.user,
            user: cookie.load('email'),
            name: "1009610"
        }
    }

    upadateLoginState = () => {
        this.setState({user:cookie.load('email')})
    }

    handleProfileChange = profileName => {
        // This state change will force Profile component to be re-rendered
        this.setState({ name: profileName });
    }

    render() {
        return (
            <div>
                <div>

                    <Navigation type={`Hero`} handleProfileChange={this.handleProfileChange} {...this.state} handleLoginChange={this.upadateLoginState}/>

                </div>
                <div className="container">
                    <div className="row">
                        <Profile profileName={this.state.name} user={this.state.user} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;