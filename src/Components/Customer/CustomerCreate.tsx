import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';




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

        try{
            const url = `${API_URL}/customer`;
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
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
    

    render() {
        return (
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
        );
    }
}

