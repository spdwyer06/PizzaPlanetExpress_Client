import React, { Component } from 'react';
import {Button, Row, Col} from 'reactstrap';

import EmployeeModel from '../Models/EmployeeModel';
import UserDetail from './UserDetail';



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
            <div>
                <Row>
                    <Col sm='6'>
                        <h3>{this.capitalizeName(employee.firstName)} {this.capitalizeName(employee.lastName)}</h3>
                    </Col>
                    <Col sm='3'>
                        <Button onClick={() => this.toggleEmployeeDetailOn()}>View Details</Button>
                    </Col>
                </Row>
                {this.state.employeeDetailOn ? <UserDetail token={this.props.token} employee={this.props.employee} employeeDetailOn={this.state.employeeDetailOn} toggleEmployeeDetailOn={this.toggleEmployeeDetailOn} capitalizeName={this.capitalizeName} getAllEmployees={this.props.getAllEmployees} /> : null}
            </div>
        );
    }
}