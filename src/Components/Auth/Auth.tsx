import React, { Component } from 'react';
import {Button, Modal} from 'reactstrap';

import Login from './Login';
import Signup from './Signup';

import './Auth.css';



type UserModel = {
    isManager: boolean,
    isAdmin: boolean
  };

type Props = {
    updateToken: (token: string) => void,
    updateUser: (user: UserModel) => void 
};

type State = {
    signupOpen: boolean,
    loginOpen: boolean
};

export default class Auth extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            signupOpen: false,
            loginOpen: false
        }

        // Since passing down to child component, need to bind in constructor
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }
    
    toggleSignup(): void{
        this.setState({signupOpen: !this.state.signupOpen});
    }

    toggleLogin(): void{
        this.setState({loginOpen: !this.state.loginOpen})
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

