import React, { Component } from 'react';
import {Button} from 'reactstrap';

import CustomerEdit from './CustomerEdit';

import CustomerModel from '../Models/CustomerModel';



type Props = {
    token: string,
    customer: CustomerModel,
    mapCustomers: () => void 
};

type State = {
    editCustomerOn: boolean
};

export default class Customer extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            editCustomerOn: false
        }

        this.toggleCustomerEdit = this.toggleCustomerEdit.bind(this);
    }

    toggleCustomerEdit = () => this.setState({editCustomerOn: !this.state.editCustomerOn});
    
    render() {

        const {customer} = this.props;

        return (
            <div>
                <h3>{customer.firstName}</h3>
                <h3>{customer.lastName}</h3>
                <h3>{customer.phoneNumber}</h3>
                <Button color='primary'>Select Customer</Button>
                <Button onClick={() => this.toggleCustomerEdit()}>Edit Customer Info</Button>
                {this.state.editCustomerOn ? <CustomerEdit token={this.props.token} customer={this.props.customer} editCustomerOn={this.state.editCustomerOn} mapCustomers={this.props.mapCustomers} toggleCustomerEdit={this.toggleCustomerEdit} /> : null}
            </div>
        );
    }
}

