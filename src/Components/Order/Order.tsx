import React, { Component } from 'react';
import {Button} from 'reactstrap';

import OrderDetail from './OrderDetail';
import API_URL from '../../env';

import OrderModel from '../Models/OrderModel';
import UserModel from '../Models/UserModel';



type Props = {
    order: OrderModel,
    user: UserModel,
    token: string,
    mapOrders: () => void,
    setOrderId: (orderId: number) => void
};

type State = {
    orderInfoOn: boolean
};

export default class Order extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            orderInfoOn: false,
            // orderEditOn: false
        }

        this.toggleOrderInfo = this.toggleOrderInfo.bind(this);
        // this.toggleOrderEdit = this.toggleOrderEdit.bind(this);
    }
    
    toggleOrderInfo = () => this.setState({orderInfoOn: !this.state.orderInfoOn});

    async deleteOrder(e: React.MouseEvent){
        try{
            const url = `${API_URL}/order/${this.props.order.id}`;
            const options = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };

            await fetch(url, options);
            this.props.mapOrders();
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    isUserManagerOrAdmin(){
        console.log('Checking User Role');
        if (localStorage.getItem('userRole') == 'manager' || localStorage.getItem('userRole') == 'admin'){
            return true;
        }
         return false;
    }

    render() {
        // Prop Destructuring
        const {order} = this.props;

        return (
            <div>
                <h3>Customer Name: {order.customer.lastName}, {order.customer.firstName}</h3>
                <h3>Order Price: ${order.totalPrice.toFixed(2)}</h3>
                {localStorage.getItem('userRole') == 'manager' || localStorage.getItem('userRole') == 'admin' ? <Button color='danger' onClick={(e) => this.deleteOrder(e)}>Delete Order</Button> : null}
                <Button onClick={this.toggleOrderInfo}>View</Button>
                {this.state.orderInfoOn ? <OrderDetail token={this.props.token} user={this.props.user} mapOrders={this.props.mapOrders} toggleInfo={this.toggleOrderInfo}  orderInfoOn={this.state.orderInfoOn} order={order} setOrderId={this.props.setOrderId} /> : null}
            </div>
        );
    }
}

