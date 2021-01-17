import React, { Component } from 'react';
import {Button} from 'reactstrap';

import CustomerEdit from './CustomerEdit';

import CustomerModel from '../Models/CustomerModel';



type Props = {
    token: string,
    customer: CustomerModel,
    capitalizeName: (name: string) => string,
    updateCustomer: (customer: CustomerModel) => void,
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
    
    formatPhoneNumber(customer: CustomerModel){
        const number = (customer.phoneNumber).toString().split('');
        const areaCode = number.splice(0, 3).join('');
        const firstThree = number.splice(0, 3).join('');
        const finalFour = number.join('');

        return `(${areaCode}) ${firstThree}-${finalFour}`;
    }

    render() {

        const {customer} = this.props;

        return (
            <div>
                {/* <h3>{this.props.capitalizeName(customer.firstName)}</h3>
                <h3>{this.props.capitalizeName(customer.lastName)}</h3> */}
                {/* <h3>{this.props.capitalizeName(customer.lastName)}, {this.props.capitalizeName(customer.firstName)}</h3> */}
                <h3>{this.props.capitalizeName(customer.firstName)} {this.props.capitalizeName(customer.lastName)}</h3>
                {/* <h3>{customer.phoneNumber}</h3> */} 
                <h3>{this.formatPhoneNumber(customer)}</h3>
                {/* If the url isn't on order create, don't show the button */}
                {window.location.href == 'http://localhost:3000/order/create' ?  <Button color='primary' onClick={() => this.props.updateCustomer(customer)}>Select Customer</Button> : null}
                {/* <Button color='primary' onClick={() => this.props.updateCustomer(customer)}>Select Customer</Button> */}
                <Button onClick={() => this.toggleCustomerEdit()}>Edit Customer Info</Button>
                {this.state.editCustomerOn ? <CustomerEdit token={this.props.token} customer={this.props.customer} editCustomerOn={this.state.editCustomerOn} mapCustomers={this.props.mapCustomers} toggleCustomerEdit={this.toggleCustomerEdit} /> : null}
            </div>
        );
    }
}

