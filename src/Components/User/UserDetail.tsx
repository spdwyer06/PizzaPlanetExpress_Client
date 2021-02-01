import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from 'reactstrap';

import API_URL from '../../env';
import UserEdit from './UserEdit';

import EmployeeModel from '../Models/EmployeeModel';

import './user.css';



type Props = {
    token: string,
    employee: EmployeeModel,
    employeeDetailOn: boolean,
    toggleEmployeeDetailOn: () => void,
    capitalizeName: (name: string) => string,
    getAllEmployees: () => void
};

type State = {
    editEmployeeOn: boolean,
    isManager: string,
    isAdmin: string
};

export default class UserDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            editEmployeeOn: false,
            isManager: '',
            isAdmin: ''
        }

        this.toggleEditEmployeeOn = this.toggleEditEmployeeOn.bind(this);
        this.setIsManager = this.setIsManager.bind(this);
        this.setIsAdmin = this.setIsAdmin.bind(this);
    }

    toggleEditEmployeeOn = async() => await this.setState({editEmployeeOn: !this.state.editEmployeeOn});

    setIsManager = async(employee: EmployeeModel) => employee.isManager ? await this.setState({isManager: 'Yes'}) : await this.setState({isManager: 'No'})

    setIsAdmin = async(employee: EmployeeModel) => employee.isAdmin ? await this.setState({isAdmin: 'Yes'}) : await this.setState({isAdmin: 'No'})

    async deleteEmployee(){
        try{
            const url = `${API_URL}/user/${this.props.employee.id}`;
            const options = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };

            await fetch(url, options);
            this.props.toggleEmployeeDetailOn();
            this.props.getAllEmployees();
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    componentDidMount(){
        this.setIsManager(this.props.employee);
        this.setIsAdmin(this.props.employee);
    }

    render() {
        const employee = this.props.employee;

        return (
            <Modal contentClassName='userDetailModal' isOpen={this.props.employeeDetailOn}>
                <Container>
                    <Row className='rowSpacing'>
                        <Col className='text-right'>
                            <Button id='cancelBtn' onClick={() => this.props.toggleEmployeeDetailOn()} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Employee Id: {employee.id}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>First Name: {this.props.capitalizeName(employee.firstName)}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Last Name: {this.props.capitalizeName(employee.lastName)}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Password: {employee.password}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Manager? {this.state.isManager}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Admin? {this.state.isAdmin}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col className='text-left'>
                            <Button id='editUserBtn' color='primary' onClick={() => this.toggleEditEmployeeOn()}>Edit</Button>
                        </Col>
                        <Col className='text-right'>
                            <Button id='deleteUserBtn' color='danger' onClick={() => this.deleteEmployee()}>Delete Employee From System</Button>
                        </Col>
                    </Row>
                </Container>
                {this.state.editEmployeeOn ? <UserEdit token={this.props.token} employee={this.props.employee} editEmployeeOn={this.state.editEmployeeOn} toggleEditEmployeeOn={this.toggleEditEmployeeOn} toggleEmployeeDetailOn={this.props.toggleEmployeeDetailOn} /> : null}
            </Modal>
        );
    }
}