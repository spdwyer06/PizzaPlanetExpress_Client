import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from 'reactstrap';

import API_URL from '../../env';
import EmployeeModel from '../Models/EmployeeModel';



type Props = {
    token: string,
    employee: EmployeeModel,
    editEmployeeOn: boolean,
    toggleEditEmployeeOn: () => void,
    toggleEmployeeDetailOn: () => void
};

type State = {
    updatedFirstName: string,
    updatedLastName: string,
    updatedPassword: number,
    updatedIsManager: boolean,
    updatedIsAdmin: boolean
};

export default class UserEdit extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
    
        this.state = {
            updatedFirstName: '',
            updatedLastName: '',
            updatedPassword: 0,
            updatedIsManager: false,
            updatedIsAdmin: false
        }
    }
    
    async submitForm(e: React.FormEvent){
        e.preventDefault();

        const stringValues = /^[A-Za-z]+$/

        if(!stringValues.test(this.state.updatedFirstName)){
            alert('Enter a valid first name.');
        }
        else if(!stringValues.test(this.state.updatedLastName)){
            alert('Enter a valid last name.');
        }
        else if(!Number(this.state.updatedPassword)){
            alert('Enter a valid password.');
        }
        else if(this.state.updatedPassword.toString().length != 4){
            alert('Enter a 4-digit password');
        }
        else{
            try{
                const url = `${API_URL}/user/${this.props.employee.id}`;
                const options = {
                    method: 'PUT',
                    body: JSON.stringify({
                        firstName: this.state.updatedFirstName,
                        lastName: this.state.updatedLastName,
                        password: this.state.updatedPassword,
                        isManager: this.state.updatedIsManager,
                        isAdmin: this.state.updatedIsAdmin
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.token
                    })
                };

                await fetch(url, options);
                this.props.toggleEditEmployeeOn();
                this.props.toggleEmployeeDetailOn();
            }
            catch(err){
                console.log('Error:', err.message);
            }
        }
    }

    render() {
        const employee = this.props.employee;

        return (
            <Modal isOpen={this.props.editEmployeeOn}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Employee Edit</h3>
                            </Col>
                            <Col sm='2'>
                            <Button onClick={this.props.toggleEditEmployeeOn} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Form onSubmit={(e) => this.submitForm(e)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for='itemId'>Employee Id: {employee.id}</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='employeeFirstName'>Employee First Name:</Label>
                            <Input name='employeeFirstName' id='employeeFirstNameInput' required placeholder={employee.firstName} onChange={e => this.setState({updatedFirstName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='employeeLastName'>Employee Last Name:</Label>
                            <Input name='employeeLastName' id='employeeLastNameInput' required placeholder={employee.lastName} onChange={e => this.setState({updatedLastName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='employeePassword'>Password:</Label>
                            <Input name='employeePassword' id='employeePasswordInput' required placeholder={(employee.password).toString()} onChange={e => this.setState({updatedPassword: parseInt(e.target.value)})} />
                        </FormGroup>
                        <FormGroup>
                            <Container>
                                <Row>
                                    <Col sm='6'>
                                        <Label check>
                                            <Input type='checkbox' name='isManager' defaultChecked={employee.isManager} onChange={e => this.setState({updatedIsManager: e.target.checked})} />{' Manager? '}
                                        </Label>
                                    </Col>
                                    <Col sm='6'>
                                        <Label check>
                                            <Input type='checkbox' name='isAdmin' defaultChecked={employee.isAdmin} onChange={e => this.setState({updatedIsAdmin: e.target.checked})} />{' Admin? '}
                                        </Label>
                                    </Col>
                                </Row>
                            </Container>
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