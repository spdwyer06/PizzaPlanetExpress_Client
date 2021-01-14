import React, { Component } from 'react';
import {Button, Modal} from 'reactstrap';

import Login from './Login';
import Signup from './Signup';

import './Auth.css';



export default class Auth extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            signupOpen: false,
            loginOpen: false
        }

        // Since passing down to child component, need to bind in constructor
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }
    
    toggleSignup(){
        // this.state.signupOpen == true ? this.setState({signupOpen: false}) : this.setState({signupOpen: true});
        this.setState({signupOpen: !this.state.signupOpen});
    }

    toggleLogin(){
        this.setState({loginOpen: !this.state.loginOpen})
        // if(this.state.loginOpen == true){
        //     this.setState({loginOpen: false});
        // }
        // else{
        //     this.setState({loginOpen: true});
        // }
    }

    render() {
        return (
            <Modal isOpen={true}>
                <Button id='authSignupBtn' onClick={() => this.toggleSignup()}>Create New User</Button>
                <br />
                <Button id='authLoginBtn' onClick={() => this.toggleLogin()}>Employee Login</Button>
                {this.state.signupOpen == true ? <Signup toggleSignup={this.toggleSignup} signupOpen={this.state.signupOpen} /> : <></>}
                {this.state.loginOpen == true ? <Login updateToken={this.props.updateToken} updateUser={this.props.updateUser} toggleLogin={this.toggleLogin} loginOpen={this.state.loginOpen} /> : <></>}
            </Modal>
        );
    }
}

