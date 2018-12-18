import React from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import './general.css';
//import SignOutButton from './SignOut'
//import {firebase} from '../firebase';
import api from '../api';
import logo from '../images/MarvelLogo.png';
// import { setupMaster } from 'cluster';

// Sign out function.
let signOut = async (prop) => {
    console.log("shit");
    try {
        await api.signout();
        cookie.remove('email', { path: '/' });
        if (prop.type === 'Hero') {
            prop.handleLoginChange();
        }
        //console.log(cookie.load('email'));
        window.location.reload();
    } catch (e) {
        console.log(e);
        alert('Could not sign out!');
    }
}

var email = cookie.load('email');
console.log(email);

const Navigation = (props) => {
    // console.log(props.user);

    // if (props.handleProfileChange) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <Link className="navbar-brand" to="/">
                <img src={logo} width="130" height="40" alt="" />
                <span className="font-weight-bold nav-title">MarvelPedia</span>
            </Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item navItems font-weight-bold">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item navItems font-weight-bold">
                        <Link className="nav-link" to="/heros/">Heros</Link>
                    </li>
                    <li className="nav-item navItems font-weight-bold">
                        <a className={props.isComic === 'true' ? 'nav-link active' : 'nav-link'} href="/comics/list/1">Comics</a>
                    </li>
                </ul>
            </div>

            <div id="LoggedDiv" className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    {props.handleProfileChange ?
                        <li className="nav-item navItems">
                            <Searchbar type={props.type} handleProfileChange={props.handleProfileChange} />
                        </li> : null}
                    {/* <li className="nav-item navItems">
                            <Searchbar type={props.type} handleProfileChange={props.handleProfileChange} />
                        </li> */}
                    {
                        email !== undefined ? <li className="nav-item"> <span className="nav-link text-white font-weight-bold">{email}</span></li> : null
                    }
                    {
                        email !== undefined ? <li className="nav-item navItems font-weight-bold">
                            <a onClick={() => signOut(props)} className="nav-link" href="javascript:void(0)">Sign out</a>
                        </li>
                            : <li className="nav-item navItems font-weight-bold">
                                <a className="nav-link" href="/logIn_signUp">Log in / Sign up</a>
                            </li>
                    }

                </ul>
            </div>
        </nav>
    );
    // } else {
    //     return (
    //         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

    //             <Link className="navbar-brand" to="/">
    //                 <img src={logo} width="130" height="40" alt="" />
    //                 <span className = "font-weight-bold nav-title">MarvelPedia</span>
    //             </Link>

    //             <div className="collapse navbar-collapse">
    //                 <ul className = "navbar-nav">
    //                     <li className = "nav-item navItems font-weight-bold">
    //                         <Link className="nav-link" to="/">Home</Link>
    //                     </li>
    //                     <li className="nav-item navItems font-weight-bold">
    //                         <Link className="nav-link" to="/heros">Heros</Link>
    //                     </li>
    //                     <li className="nav-item navItems font-weight-bold">
    //                         <a className = {props.isComic ==='true' ? 'nav-link active' : 'nav-link'} href = "/comics/list/1">Comics</a>
    //                     </li>

    //                 </ul>
    //             </div>

    //             <div id = "LoggedDiv" className = "collapse navbar-collapse justify-content-end">
    //                 <ul className="navbar-nav">
    //                     <li className="nav-item navItems font-weight-bold">
    //                         <Link className="nav-link" to="/LogIn_SignUp">Log in / Sign up</Link>
    //                     </li>
    //                     <li className="nav-item navItems font-weight-bold" style={{ 'display': 'none' }}>
    //                         <Link className="nav-link" to="/">Sign out</Link>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </nav>
    //     );

    // }
}



export default Navigation;