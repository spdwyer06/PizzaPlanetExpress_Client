import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';

import CustomerModel from '../Models/CustomerModel';



type Props = {
    token: string,
    customer: CustomerModel, 
    editCustomerOn: boolean,
    mapCustomers: () => void,
    toggleCustomerEdit: () => void
};

type State = {
    updatedFirstName: string,
    updatedLastName: string,
    updatedPhoneNumber: number
};

export default class CustomerEdit extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            updatedFirstName: '',
            updatedLastName: '',
            updatedPhoneNumber: 0
        }
    }
    
    async submitForm(e: React.FormEvent){
        e.preventDefault();

        try{
            const url = `${API_URL}/customer/${this.props.customer.id}`;
            const options = {
                method: 'PUT',
                body: JSON.stringify({
                    firstName: this.capitalizeName(this.state.updatedFirstName),
                    lastName: this.capitalizeName(this.state.updatedLastName),
                    phoneNumber: this.state.updatedPhoneNumber
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token   
                })
            };

            await fetch(url, options);
            this.props.mapCustomers();
            this.props.toggleCustomerEdit();
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    async removeCustomer(e: React.MouseEvent){
        // e.preventDefault();

        try{
            const url = `${API_URL}/customer/${this.props.customer.id}`;
            const options = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token   
                })
            };

            await fetch(url, options);
            this.props.mapCustomers();
            this.props.toggleCustomerEdit();
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    capitalizeName = (name: string) => name[0].toUpperCase() + name.slice(1);

    render() {
        return (
            <Modal isOpen={this.props.editCustomerOn}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Customer Edit</h3>
                            </Col>
                            <Col sm='2'>
                                <Button onClick={this.props.toggleCustomerEdit} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Form onSubmit={(e) => this.submitForm(e)}>
                <ModalBody>
                        <FormGroup>
                            <Label for='itemId'>Customer Id: {this.props.customer.id}</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerFirstName'>Customer First Name:</Label>
                            <Input name='customerFirstName' id='customerFirstNameInput' required placeholder={this.props.customer.firstName} onChange={e => this.setState({updatedFirstName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerLastName'>Customer Last Name:</Label>
                            <Input name='customerLastName' id='customerLastNameInput' required placeholder={this.props.customer.lastName} onChange={e => this.setState({updatedLastName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='customerPhoneNumber'>Customer Phone Number:</Label>
                            <Input name='customerPhoneNumber' id='customerPhoneNumberInput' required placeholder={(this.props.customer.phoneNumber).toString()} onChange={e => this.setState({updatedPhoneNumber: parseInt(e.target.value)})} />
                        </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit'>Done</Button>
                    {localStorage.getItem('userRole') == 'manager' || localStorage.getItem('userRole') == 'admin' ? <Button color='danger' onClick={(e) => this.removeCustomer(e)}>Remove Customer From System</Button> : null}
                </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

