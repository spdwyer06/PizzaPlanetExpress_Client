import React, { Component } from 'react';
import {Button, Col} from 'reactstrap';

import API_URL from '../../env';
import CustomerEdit from './CustomerEdit';

import CustomerModel from '../Models/CustomerModel';

import './customer.css';



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
            <Col className='customer' sm='3'>
                <h3>{this.props.capitalizeName(customer.firstName)} {this.props.capitalizeName(customer.lastName)}</h3>
                <h3>{this.formatPhoneNumber(customer)}</h3>
                {/* If the url isn't on order create, don't show the button */}
                {window.location.href == 'http://localhost:3000/order/create' ?  <Button id='custBtn' color='primary' onClick={() => this.props.updateCustomer(customer)}>Select Customer</Button> : null}
                {window.location.href == 'http://localhost:3000/customer/all' ? <Button id='custBtn' onClick={() => this.toggleCustomerEdit()}>Edit Customer Info</Button> : null}
                {/* {window.location.href == `${API_URL}/customer/all` ? <Button onClick={() => this.toggleCustomerEdit()}>Edit Customer Info</Button> : null} */}
                {this.state.editCustomerOn ? <CustomerEdit token={this.props.token} customer={this.props.customer} editCustomerOn={this.state.editCustomerOn} mapCustomers={this.props.mapCustomers} toggleCustomerEdit={this.toggleCustomerEdit} /> : null}
            </Col>
        );
    }
}