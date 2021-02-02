import React, { Component } from 'react';
import {Button, Col} from 'reactstrap';

import EmployeeModel from '../Models/EmployeeModel';
import UserDetail from './UserDetail';

import './user.css';



type Props = {
    token: string,
    employee: EmployeeModel,
    getAllEmployees: () => void
};

type State = {
    employeeDetailOn: boolean
};

export default class User extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
    
        this.state = {
            employeeDetailOn: false
        }

        this.toggleEmployeeDetailOn = this.toggleEmployeeDetailOn.bind(this);
    }

    toggleEmployeeDetailOn = async() => await this.setState({employeeDetailOn: !this.state.employeeDetailOn});
    
    capitalizeName = (name: string) => name[0].toUpperCase() + name.slice(1);

    render() {
        const employee = this.props.employee;

        return (
            <Col className='user' sm='3'>
                <h3>{this.capitalizeName(employee.firstName)} {this.capitalizeName(employee.lastName)}</h3>
                <Button id='viewDetailsBtn' onClick={() => this.toggleEmployeeDetailOn()}>View Details</Button>
                {this.state.employeeDetailOn ? <UserDetail token={this.props.token} employee={this.props.employee} employeeDetailOn={this.state.employeeDetailOn} toggleEmployeeDetailOn={this.toggleEmployeeDetailOn} capitalizeName={this.capitalizeName} getAllEmployees={this.props.getAllEmployees} /> : null}
            </Col>
        );
    }
}