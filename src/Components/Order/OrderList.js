import React, { Component } from 'react';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import Order from './Order';



export default class OrderList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            orders: [],
            orderCreateOn: false
        }

        this.toggleOrderCreate = this.toggleOrderCreate.bind(this);
    }

    // componentDidMount(){
    //     this.mapOrders();
    // }

    async componentDidMount(){
        try{
            const url = `${API_URL}/order/all`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            };
            
            const allOrders = await fetch(url, options);
            // console.log('allOrders:', allOrders);
            const ordersJson = await allOrders.json();
            // console.log('ordersJson:', ordersJson);
            const orders = ordersJson.Orders;
            // console.log('orders:', orders);
            
            this.setState({orders: orders});
        }
        catch(err){
            console.log('Error', err.message);
        }
    }

    toggleOrderCreate = () => this.setState({orderCreateOn: !this.state.orderCreateOn});
    
    render() {
        return (
            <div>
                <h1>All Orders</h1>
                <Button onClick={this.toggleOrderCreate}>Create New Order</Button>
                {this.state.orders.map((order, i) => <Order order={order} key={i} />)}
                {/* {console.log('Order List State:', this.state.orders)} */}
            </div>
        );
    }
}

