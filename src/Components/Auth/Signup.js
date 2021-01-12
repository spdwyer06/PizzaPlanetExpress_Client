import React, { Component } from 'react';
import {Modal, Button, Form, FormGroup, Label, Input} from 'reactstrap';

import API_URL from '../../env';

import './Auth.css';



export class Signup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <Modal isOpen={true}>
                <Form>
                    <Button color='danger' id='cancelBtn' onClick={() => this.props.toggleSignup()}>X</Button>
                    <FormGroup>
                        <Label for='firstName'>First Name:</Label>  
                        <Input name='firstName' id='firstNameInput' required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastName'>Last Name:</Label>  
                        <Input name='lastName' id='lastNameInput' required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password:</Label>  
                        <Input name='password' id='passwordInput' required />
                    </FormGroup>
                    <Button type='submit'>Create User</Button>
                </Form>
            </Modal>
        )
    }
}

export default Signup
