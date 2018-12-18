import React from 'react';
import Navigation from './Navigation';
import './LogIn_SignUp.css'
import api from '../api';
import cookie from 'react-cookies';
import './general.css';
import axios from 'axios';
import googleIcon from '../images/googleIcon.png';

class LogIn_SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.state = {
      logIn: true,
      forgot: false
    };
  
  }

  //Set new state
  changeState = async() => {
    await this.setState({
      logIn: !this.state.logIn
    });
  }

  //Switch between log in page ans sign up page
  switchPage = async() => {
    await this.changeState();
    
    if (this.state.logIn) {
      document.getElementById("logInPart").style.setProperty('display', 'block');
      document.getElementById("signUpPart").style.setProperty('display', 'none');

    } else {
      document.getElementById("logInPart").style.setProperty('display', 'none');
      document.getElementById("signUpPart").style.setProperty('display', 'block');
    }
  }

  setForgot = () => {
    this.setState({
      forgot: true
    });
    document.getElementById('forgotPart').style.setProperty('display', 'block');
    document.getElementById('logInPart').style.setProperty('display', 'none');
    document.getElementById('signUpPart').style.setProperty('display', 'none');
  }

  resetFogot = () => {
    this.setState({
      forgot: false
    });
    document.getElementById('forgotPart').style.setProperty('display', 'none');
    document.getElementById('logInPart').style.setProperty('display', 'block');
    document.getElementById('signUpPart').style.setProperty('display', 'none');
  }

  logIn = async() => {
    console.log('Called logIn()');
    let email = document.getElementById('logInEmail').value;
    let password = document.getElementById('logInPassword').value;
    try{
      await api.signInWithEmailAndPassword(email, password);
      cookie.save('email', email, { path: '/' });
      let res = axios.post(`http://localhost:4000/history/${email}`);
      console.log(res);
      window.location.href = document.referrer;
    } catch(e) {
      alert('Email or password invalid. Please try again.')
    }
  }

  googleLogin = async () => {
    console.log('Called googleLogin()');
    try {
      const user = await api.signInWithGoogleAccount();
      const email = user.email;
      cookie.save('email', user.email, {path: '/'});
      let res = axios.post(`http://localhost:4000/history/${email}`);
      console.log(res);
      window.location.href = document.referrer;
    } catch (e) {
      alert ('Google login failed');
    }
  }
  
  signUp = async() => {
    let email = document.getElementById('signUpEmail').value;
    let password1 = document.getElementById('signUpPassword').value;
    let password2 = document.getElementById('passwordTwo').value;
    if (password1.length < 6) {
      alert("The password should at least have 6 characters.")
      return false;
    }
    if (password1 !== password2) {
      alert("Please make sure the two passwords are the same.");
      return false;
    }

    try {
      await api.registerWithEmailAndPassword(email,password1);
      cookie.save('email', email, { path: '/' });
      window.location.href = document.referrer;
    } catch(e) {
      alert("The email has already been registered");
    }  
  }

  resetPassword = async() => {
    try {
      let email = document.getElementById('forgotEmail').value;
      console.log(email);
      await api.forgetPassword(email);
      alert('Email sent. Please check your email');
      this.resetFogot();
    } catch(e) {
      console.log(e);
      alert('Email invalid. Please try again');
      return false;
    }
  }

  render() {
    let logInPage = (
      <div>
        <div>
          <Navigation handleProfileChange={this.handleProfileChange} />
        </div>
        <div className="logBackground">
          <div className="logAndSign rounded border test-align">
            <div id="logInPart">
              <div className="input row">
                <span className="labelLen text-right font-weight-bold">Email: </span>
                <input type="text" className="form-control inputLen" id="logInEmail" />
              </div>
              <div className="input row">
                <span className="labelLen text-right font-weight-bold">Password: </span>
                <input type="password" className="form-control inputLen" id="logInPassword" />
              </div>
                <button onClick = {this.logIn} className="btn btn-primary left-space btnProperty text-white font-weight-bold">Log in</button>
                <button onClick = {this.googleLogin} className="btn btn-dark btnProperty text-white font-weight-bold left-20">
                  <img src = {googleIcon} className = "g-icon"/>
                  Google Login
                  </button>
              <div>
                <a href = "javascript:void(0)" onClick = {this.setForgot}>Forgot password?</a>
              </div>
            </div>

            <div id="signUpPart">
              <div className="input row">
                <span className="labelLen text-right font-weight-bold">Email: </span>
                <input type="test" className="form-control inputLen" id="signUpEmail" />
              </div>
              <div className="input row">
                <span className="labelLen text-right font-weight-bold">Password: </span>
                <input type="password" className="form-control inputLen" id="signUpPassword" />
              </div>
              <div className="input row">
                <span className="labelLen text-right font-weight-bold">Reinput Password: </span>
                <input type="password" className="form-control inputLen" id="passwordTwo" />
              </div>
              <a href="javascript:void(0)" onClick = {this.signUp} className="btn btn-success btnProperty text-white font-weight-bold">Sign up</a>
              <br/>
            </div>

            <div id = "forgotPart" style = {{'display' : 'none'}}>
              <h4 className = "mx-auto profile-top-2">Get an email to reset password.</h4>
              <div className="input row bottom-20">
                <span className = "labelLen text-right font-weight-bold">Email: </span>
                <input type="text" className="form-control inputLen" id="forgotEmail" />
              </div> 
              <div>
                <a href = "javascript: void(0)" className = 'btn btn-success' onClick = {this.resetPassword}>Reset password</a>
                <br />
                <a href = "javascript: void(0)" onClick = {this.resetFogot}>Back to log in</a>
              </div>
            </div>

            {
              this.state.forgot ? null : (
                <div className="changePart">
                {
                  this.state.logIn ? (
                    <a href="javascript:void(0)" id="clickToChange" onClick={this.switchPage}> Doesn't have an account? Click to sign up. </a>
                  ) : (
                      <a href="javascript:void(0)" id="clickToChange" onClick={this.switchPage}> Already have an account? Click to log in. </a>
                  )
                }
                </div>
              )
            }
           
          </div>
        </div>
      </div>
    );



    return logInPage
  }
}

export default LogIn_SignUp;