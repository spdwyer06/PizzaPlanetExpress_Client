import React, { Component } from 'react';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import Customer from '../Customer/Customer';
import CustomerCreate from '../Customer/CustomerCreate';

import CustomerModel from '../Models/CustomerModel';



type Props = {
    token: string,
    updateCustomer: (customer: CustomerModel) => void
};

type State = {
    // customers: [CustomerModel] | [],
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
            // console.log('1', res);
            const resJson = await res.json();
            // console.log('2', resJson);
            const customers = resJson.Customers;
            // console.log('3', customers);
            this.setState({
                customers: customers
            });
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
            <div>
                <h1>Customer List</h1>
                <Button onClick={() => this.toggleCustomerCreate()}>Add New Customer</Button>
                {this.state.customers.map((customer, i) => <Customer token={this.props.token} customer={customer} capitalizeName={this.capitalizeName} updateCustomer={this.props.updateCustomer} mapCustomers={this.mapCustomers} key={i} />)}
                {this.state.customerCreateOn ? <CustomerCreate token={this.props.token} customerCreateOn={this.state.customerCreateOn} toggleCustomerCreate={this.toggleCustomerCreate} mapCustomers={this.mapCustomers} /> : null}
            </div>
        );
    }
}

