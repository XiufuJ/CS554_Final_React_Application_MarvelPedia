import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import ComicsMain from './components/ComicsMain';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import { savePDF } from '@progress/kendo-react-pdf';
import Home from './components/Home.js';
//import Info from './Information'; 
// import Navigation from './components/Navigation';
import LogIn_SignUp from './components/LogIn_SignUp';

// firebase api
import fire from './config/Fire';

// authen api
import api from './api';


class App extends Component {

  //Constructor
  constructor(props, context) {
    super(props, context);
    this.state = {
      home: true,
      rootRef: React.createRef()
    };
    
  }

  
  
  render() {
    if(this.state.user === `pending`){
      return <div>Loading</div>
    }   
    return (
      <Router>
      <div className="App" ref={this.myRef}>
        <div className="App-body">


        <Switch>
          <Route path = "/LogIn_SignUp" component = { LogIn_SignUp } />
          <Route exact path = '/' component = {Home} />
          <Route path = '/heros' component = {Main} />
          <Route path = '/comics' component = {ComicsMain} />
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
/*
            <Route exact path = "/" component = {props => <Main {...props} user = {this.state.user} />} />
            <Route path = "/heros" component = {props => <Main {...props} user = {this.state.user} />}  />
            <Route path = "/comics/" component = {props => <Comics {...props} user = {this.state.user} />}  />
            */