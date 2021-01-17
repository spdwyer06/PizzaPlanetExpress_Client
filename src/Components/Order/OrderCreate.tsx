import React, { Component } from 'react';

import API_URL from '../../env';
import CustomerList from '../Customer/CustomerList';
import MenuItemList from '../MenuItem/MenuItemList';
import CustomerModel from '../Models/CustomerModel';
import MenuItemModel from '../Models/MenuItemModel';
import UserModel from '../Models/UserModel';



type Props = {
    token: string,
    user: UserModel,
};

type State = {
    customer: CustomerModel,
    orderItems: MenuItemModel[],
    orderId: number
};

export default class OrderCreate extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            customer: {
                id: 0,
                firstName: '',
                lastName: '',
                phoneNumber: 0
            },
            orderItems: [],
            orderId: 0
            // menuItems: [{
            //     id: 0,
            //     name: 'test',
            //     price: 0
            // }]
        }

        this.updateCustomer = this.updateCustomer.bind(this);
        this.updateOrderItems = this.updateOrderItems.bind(this);
    }
    
    updateCustomer(newCustomer: CustomerModel){
        this.setState({
            customer: {
                id: newCustomer.id,
                firstName: newCustomer.firstName,
                lastName: newCustomer.lastName,
                phoneNumber: newCustomer.phoneNumber
            }
        });
    }

    async updateOrderItems(menuItem: MenuItemModel){
        // const newMenuItems: MenuItemModel[] = this.state.menuItems.push(menuItem);
        // const newMenuItems: [MenuItemModel] = this.state.menuItems.;
        await this.state.orderItems.push(menuItem);
        console.log(this.state.orderItems);
        // this.setState({
        //     // menuItems: this.state.menuItems.push(menuItem)
        // })
    }

    async createBaseOrder(){
        console.log('Order Create Customer Id:', this.state.customer.id);
        console.log('Order Create Customer Name:', this.state.customer.firstName);
        console.log('createBaseOrder() Starting Order Id State:', this.state.orderId);
        console.log('crateBaseOrder() User Props:', this.props.user);

        try{
            const url = `${API_URL}/order/create/${this.state.customer.id}`;
            const options = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };
    
            const res = await fetch(url, options);
            // console.log('Baser Order res:', res);
            const resJson = await res.json();
            // console.log('Base Order json:', resJson);
            const orderId = resJson.OrderId;
            console.log('Base Order id:', orderId);
            await this.setState({
                orderId: orderId
            });
            console.log('createBaseOrder() Ending Order Id State:', this.state.orderId);
        }
        catch(err){
            console.log('Error:', err.message);
        }

    }

    componentDidUpdate(prevProps: Props, prevState: State){
        prevState.customer.id != this.state.customer.id ? this.createBaseOrder() : console.log('componentDidUpdate()');
    }

    render() {
        return (
            <div>
                {/* {this.state.customer.id == 0 ? <CustomerList token={this.props.token} updateCustomer={this.updateCustomer} /> : <MenuItemList token={this.props.token} user={this.props.user} orderItems={this.state.orderItems} updateOrderItems={this.updateOrderItems} />} */}

                {/* {this.state.customer.id == 0 && this.state.orderId == 0 ? <CustomerList token={this.props.token} updateCustomer={this.updateCustomer} /> : this.createBaseOrder() } */}

                {/* {this.state.customer.id == 0 ? <CustomerList token={this.props.token} updateCustomer={this.updateCustomer} /> : null} */}

                {this.state.customer.id == 0 ? <CustomerList token={this.props.token} updateCustomer={this.updateCustomer} /> : <MenuItemList token={this.props.token} user={this.props.user} orderId={this.state.orderId} orderItems={this.state.orderItems} updateOrderItems={this.updateOrderItems} />}
            </div>
        );
    }
}

