import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import API_URL from '../../env';
import User from './User';

import EmployeeModel from '../Models/EmployeeModel';

import './user.css';

type Props = {
    token: string
};

type State = {
    employees: [],
};

export default class UserList extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
    
        this.state = {
            employees: []
        }
    }
    
    async getAllEmployees(){
        // console.log('Running employee fetch');
        // console.log('token:', localStorage.getItem('token'));
        // const newToken = await localStorage.getItem('token');
        try{
            const url = `${API_URL}/user/all`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                    // 'Authorization': (newToken as string)
                })
            };

            const res = await fetch(url, options);
            const resJson = await res.json();
            const employees = resJson.Users;

            await this.setState({
                employees: employees
            });
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    componentDidMount(){
        this.getAllEmployees();
    }

    componentDidUpdate(prevProps: Props, prevState: State){
        if(prevState.employees != this.state.employees){
            // console.log('prevState:', prevState.employees);
            // console.log('curState:', this.state.employees);
            this.getAllEmployees();
            // console.log('compUpdateToken:', this.props.token);
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Employee List</h1>
                    </Col>
                </Row>
                {this.state.employees.map(employee => <User token={this.props.token} employee={employee} getAllEmployees={this.getAllEmployees} />)}
            </Container>
        );
    }
}