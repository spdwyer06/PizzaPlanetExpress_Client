import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import API_URL from '../../env';
import User from './User';

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
        try{
            const url = `${API_URL}/user/all`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
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
            this.getAllEmployees();
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.state.employees.map(employee => <User token={this.props.token} employee={employee} getAllEmployees={this.getAllEmployees} />)}
                </Row>
            </Container>
        );
    }
}