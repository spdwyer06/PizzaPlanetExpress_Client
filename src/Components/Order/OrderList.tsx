import React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

import API_URL from '../../env';
import Order from './Order';
import MenuItemList from '../MenuItem/MenuItemList';



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
    orderCreateOn: boolean,
    orderId: number
};

export default class OrderList extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            orders: [],
            orderCreateOn: false,
            orderId: 0
        }

        this.toggleOrderCreate = this.toggleOrderCreate.bind(this);
        this.mapOrders = this.mapOrders.bind(this);
        this.setOrderId = this.setOrderId.bind(this);
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

    setOrderId = (orderId: number) => this.setState({orderId: orderId});
    
    render() {
        return (
            <div>

            <Route exact path='/order/all'>
                <h1>All Orders</h1>
                <Button onClick={this.toggleOrderCreate}>Create New Order</Button>
                {this.state.orders.map((order, i) => <Order token={this.props.token} user={this.props.user} order={order} key={i} mapOrders={this.mapOrders} setOrderId={this.setOrderId} />)}
                {/* {console.log('Order List State:', this.state.orders)} */}
            </Route>

                <Switch>
                    <Route exact path='/order/add'>
                        <h2>Stuff n things</h2>
                        <MenuItemList token={this.props.token} user={this.props.user} orderId={this.state.orderId} />
                    </Route> 
                </Switch>

            </div>
        );
    }
}

