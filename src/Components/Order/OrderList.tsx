import React, { Component } from 'react';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import Order from './Order';



type UserModel = {
    isManager: boolean,
    isAdmin: boolean
};

type Props = {
    token: string,
    user: UserModel
};

type State = {
    orders: [],
    orderCreateOn: boolean
};

export default class OrderList extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            orders: [],
            orderCreateOn: false
        }

        this.toggleOrderCreate = this.toggleOrderCreate.bind(this);
        this.mapOrders = this.mapOrders.bind(this);
    }

    async mapOrders(){
        console.log('OrderList Token:', this.props.token);

        try{
            const url = `${API_URL}/order/all`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };
            
            const allOrders = await fetch(url, options);
            // console.log(allOrders.status);
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

    componentDidMount(){
        this.mapOrders();
    }

    // async componentDidMount(){
    //     console.log('OrderList Token:', this.props.token);

    //     try{
    //         const url = `${API_URL}/order/all`;
    //         const options = {
    //             method: 'GET',
    //             headers: new Headers({
    //                 'Content-Type': 'application/json',
    //                 'Authorization': this.props.token
    //             })
    //         };
            
    //         const allOrders = await fetch(url, options);
    //         // console.log(allOrders.status);
    //         // console.log('allOrders:', allOrders);
    //         const ordersJson = await allOrders.json();
    //         // console.log('ordersJson:', ordersJson);
    //         const orders = ordersJson.Orders;
    //         // console.log('orders:', orders);
            
    //         this.setState({orders: orders});
    //     }
    //     catch(err){
    //         console.log('Error', err.message);
    //     }
    // }

    toggleOrderCreate = () => this.setState({orderCreateOn: !this.state.orderCreateOn});
    
    render() {
        return (
            <div>
                <h1>All Orders</h1>
                <Button onClick={this.toggleOrderCreate}>Create New Order</Button>
                {this.state.orders.map((order, i) => <Order token={this.props.token} user={this.props.user} order={order} key={i} mapOrders={this.mapOrders} />)}
                {/* {console.log('Order List State:', this.state.orders)} */}
            </div>
        );
    }
}

