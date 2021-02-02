import React, { Component } from 'react';
import {Button, Container, Row, Col} from 'reactstrap';

import API_URL from '../../env';
import Customer from '../Customer/Customer';
import CustomerCreate from '../Customer/CustomerCreate';

import CustomerModel from '../Models/CustomerModel';

import './customer.css';



type Props = {
    token: string,
    updateCustomer: (customer: CustomerModel) => void
};

type State = {
    customers: [],
    customerCreateOn: boolean
};

export default class CustomerList extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            customers: [],
            customerCreateOn: false
        }

        this.mapCustomers = this.mapCustomers.bind(this);
        this.toggleCustomerCreate = this.toggleCustomerCreate.bind(this);
    }
    
    async mapCustomers(){
        try{
            const url = `${API_URL}/customer/`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token   
                })
            };

            const res = await fetch(url, options);
            const resJson = await res.json();
            const customers = resJson.Customers;
            
            if(customers){
                await this.setState({customers: customers});
            }
            else{
                await this.setState({customers: []});
            }
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    capitalizeName = (name: string) => name[0].toUpperCase() + name.slice(1);

    toggleCustomerCreate = () => this.setState({customerCreateOn: !this.state.customerCreateOn});

    componentDidMount(){
        this.mapCustomers();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className='text-center'>
                        <Button id='newCustBtn' onClick={() => this.toggleCustomerCreate()}>Add New Customer</Button>
                    </Col>
                </Row>
                <Row>
                    {this.state.customers.length > 0 ? this.state.customers.map((customer, i) => <Customer token={this.props.token} customer={customer} capitalizeName={this.capitalizeName} updateCustomer={this.props.updateCustomer} mapCustomers={this.mapCustomers} key={i} />) : <h3 className='noCustomers'>No customers yet</h3>}
                </Row>
                {this.state.customerCreateOn ? <CustomerCreate token={this.props.token} customerCreateOn={this.state.customerCreateOn} toggleCustomerCreate={this.toggleCustomerCreate} mapCustomers={this.mapCustomers} /> : null}
            </Container>
        );
    }
}