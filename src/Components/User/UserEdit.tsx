import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, Container, Row, Col } from 'reactstrap';

import API_URL from '../../env';
import EmployeeModel from '../Models/EmployeeModel';

import './user.css';



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
            <Modal contentClassName='userEditModal' isOpen={this.props.editEmployeeOn}>
                <Container>
                    <Row className='rowSpacing'>
                        <Col className='text-right'>
                            <Button id='cancelBtn' onClick={this.props.toggleEditEmployeeOn} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={(e) => this.submitForm(e)}>
                        <FormGroup>
                            <Label for='itemId'>Employee Id: {employee.id}</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='employeeFirstName'>Employee First Name:</Label>
                            <Input name='employeeFirstName' className='rowSpacing' required placeholder={employee.firstName} onChange={e => this.setState({updatedFirstName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='employeeLastName'>Employee Last Name:</Label>
                            <Input name='employeeLastName' className='rowSpacing' required placeholder={employee.lastName} onChange={e => this.setState({updatedLastName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='employeePassword'>Password:</Label>
                            <Input name='employeePassword' className='rowSpacing' required placeholder={(employee.password).toString()} onChange={e => this.setState({updatedPassword: parseInt(e.target.value)})} />
                        </FormGroup>
                        <FormGroup>
                            <Row className='rowSpacing'>
                                <Col className='text-center' sm='6'>
                                    <Label check>
                                        <Input type='checkbox' name='isManager' defaultChecked={employee.isManager} onChange={e => this.setState({updatedIsManager: e.target.checked})} />{' Manager? '}
                                    </Label>
                                </Col>
                                <Col className='text-center' sm='6'>
                                    <Label check>
                                        <Input type='checkbox' name='isAdmin' defaultChecked={employee.isAdmin} onChange={e => this.setState({updatedIsAdmin: e.target.checked})} />{' Admin? '}
                                    </Label>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Row className='rowSpacing'>
                            <Col className='text-center'>
                                <Button id='submitEditBtn' type='submit'>Done</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal>
        );
    }
}