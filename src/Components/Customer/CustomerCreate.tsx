import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';

import './customer.css';



type Props = {
    token: string,
    customerCreateOn: boolean,
    toggleCustomerCreate: () => void,
    mapCustomers: () => void
};

type State = {
    firstName: string,
    lastName: string,
    phoneNumber: number
};

export default class CustomerCreate extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: 0
        }
    }

    async submitForm(e: React.FormEvent){
        
        e.preventDefault();

        const stringValues = /^[A-Za-z]+$/

        if(!stringValues.test(this.state.firstName)){
            alert('Enter a valid first name.');
        }
        else if(!stringValues.test(this.state.lastName)){
            alert('Enter a valid last name.');
        }
        else if(!Number(this.state.phoneNumber)){
            alert('Enter a valid phone number.');
        }
        else if(this.state.phoneNumber.toString().length != 10){
            alert('Enter a 10-digit phone number (include area code)');
        }
        else{
            try{
                const url = `${API_URL}/customer`;
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        firstName: this.capitalizeName(this.state.firstName),
                        lastName: this.capitalizeName(this.state.lastName),
                        phoneNumber: this.state.phoneNumber
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.token
                    })
                };
    
                await fetch(url, options);
                this.props.mapCustomers();
                this.props.toggleCustomerCreate();
            }
            catch(err){
                console.log('Error:', err.message);
            }
        }

    }
    
    capitalizeName = (name: string) => name[0].toUpperCase() + name.slice(1);

    render() {
        return (
            <Modal contentClassName='custCreateModal' isOpen={this.props.customerCreateOn}>
                <Container>
                    <Row className='rowSpacing'>
                        <Col className='text-right'>
                            <Button id='cancelBtn' onClick={this.props.toggleCustomerCreate} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={(e) => this.submitForm(e)}>
                        <FormGroup>
                            <Label for='customerFirstName'>Customer First Name:</Label>
                            <Input name='customerFirstName' className='rowSpacing' required onChange={e => this.setState({firstName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerLastName'>Customer Last Name:</Label>
                            <Input name='customerLastName' className='rowSpacing' required onChange={e => this.setState({lastName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerPhoneNumber'>Customer Phone Number:</Label>
                            <Input name='customerPhoneNumber' className='rowSpacing' required onChange={e => this.setState({phoneNumber: parseInt(e.target.value)})} />
                        </FormGroup>
                        <Row className='rowSpacing'>
                            <Col className='text-center'>
                                <Button id='createCustBtn' type='submit'>Done</Button>
                            </Col>
                        </Row>
                </Form>
                </Container>
            </Modal>
        );
    }
}

/*
 <Modal isOpen={this.props.customerCreateOn}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Customer Create</h3>
                            </Col>
                            <Col sm='2'>
                                <Button onClick={this.props.toggleCustomerCreate} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Form onSubmit={(e) => this.submitForm(e)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for='customerFirstName'>Customer First Name:</Label>
                            <Input name='customerFirstName' id='customerFirstNameInput' required onChange={e => this.setState({firstName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerLastName'>Customer Last Name:</Label>
                            <Input name='customerLastName' id='customerLastNameInput' required onChange={e => this.setState({lastName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerPhoneNumber'>Customer Phone Number:</Label>
                            <Input name='customerPhoneNumber' id='customerPhoneNumberInput' required onChange={e => this.setState({phoneNumber: parseInt(e.target.value)})} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit'>Done</Button>
                    </ModalFooter>
                </Form>
            </Modal>
*/