import React, { Component } from 'react';
import {Modal, Button, Form, FormGroup, Label, Input} from 'reactstrap';

import API_URL from '../../env';

import './Auth.css';



type Props = {
    toggleSignup: () => void,
    signupOpen: boolean
};

type State = {
    firstName: string,
    lastName: string,
    password: number
};

export default class Signup extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            firstName: '',
            lastName: '',
            password: 0
        }
    }
    
    async createUser(e: React.FormEvent){
        e.preventDefault();

        const stringValues = /^[A-Za-z]+$/

        if(!stringValues.test(this.state.firstName)){
            alert('Enter a valid first name.');
        }
        else if(!stringValues.test(this.state.lastName)){
            alert('Enter a valid last name.');
        }
        else if(!Number(this.state.password)){
            alert('Enter a valid password.');
        }
        else if(this.state.password.toString().length != 4){
            alert('Enter a 4-digit password.');
        }
        else{
            try{
                const url = `${API_URL}/user/create`;
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        password: this.state.password
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                };
    
                const res = await fetch(url, options);
                if(res.status != 500){
                    this.props.toggleSignup();
                }
                else{
                    const r = await res.json();
                    console.log('Error:', r.Error.errors[0].message);
                    alert(`Error: ${r.Error.errors[0].message}`);
                    // alert('Password already being used, select a different 4-digit password.');
                }
            }
            catch(err){
                console.log('Error:', err.message);
                alert(`Error: ${err.message}`);
            }
        }
    }

    render() {
        return (
            <Modal contentClassName='signupModal' isOpen={this.props.signupOpen}>
                <Form onSubmit={e => this.createUser(e)}>
                    <Button color='danger' id='cancelBtn' onClick={() => this.props.toggleSignup()}>X</Button>
                    <FormGroup id='signupForm'>
                        <Label for='firstName'>First Name:</Label>  
                        <Input name='firstName' id='firstNameInput' onChange={async e => await this.setState({firstName: e.target.value})} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName'>Last Name:</Label>  
                        <Input name='lastName' id='lastNameInput' onChange={e => this.setState({lastName: e.target.value})} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password:</Label>  
                        <Input name='password' id='passwordInput' onChange={e => this.setState({password: parseInt(e.target.value)})} required />
                    </FormGroup>
                    <Button type='submit' id='createUserBtn'>Create User</Button>
                </Form>
            </Modal>
        );
    }
}


