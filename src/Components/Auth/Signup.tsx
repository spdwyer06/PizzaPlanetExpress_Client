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
    password: number | null
};

export class Signup extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            firstName: '',
            lastName: '',
            password: null
        }
    }
    
    async createUser(e: React.FormEvent){
        e.preventDefault();
        // console.log('Form Submitted');
        // console.log('First Name State:', this.state.firstName);
        // console.log('Last Name State:', this.state.lastName);
        // console.log('Password State:', this.state.password);
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

        try{
            // await fetch(url, options);
            const res = await fetch(url, options);
            if(res.status != 500){
                this.props.toggleSignup();
            }
            else{
                const r = await res.json();
                // console.log('Error', r);
                // console.log('Error 2', r.Error);
                console.log('Error:', r.Error.errors[0].message);
            }
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    // async updateLastName(e){
    //     console.log('First Name State:', this.state.firstName);
    //     console.log('Last Name State Start:', this.state.lastName);
    //     await this.setState({lastName: e.target.value});
    //     console.log('Last Name State End:', this.state.lastName);
    // }

    render() {
        return (
            <Modal isOpen={this.props.signupOpen}>
                <Form onSubmit={e => this.createUser(e)}>
                    <Button color='danger' id='cancelBtn' onClick={() => this.props.toggleSignup()}>X</Button>
                    <FormGroup>
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
                    <Button type='submit'>Create User</Button>
                </Form>
            </Modal>
        )
    }
}

export default Signup
