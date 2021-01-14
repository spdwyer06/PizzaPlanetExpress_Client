import React, { Component } from 'react';
import {Button} from 'reactstrap';

import OrderDetail from './OrderDetail';
import OrderEdit from './OrderEdit';



type MenuItemModel = {
    name: string,
    price: number,
    orderItem: {
        quantity: number
    }
}

type OrderModel = {
    id: number,
    user: {
        firstName: string,
        lastName: string
    },
    customer: {
        firstName: string,
        lastName: string,
        phoneNumber: number
    },
    orderTime: Date,
    menuItems: [MenuItemModel],
    totalPrice: number,
    isPaid: boolean
}    

type Props = {
    // order: {
    //     customer: {
    //         firstName: string,
    //         lastName: string
    //     },
    //     totalPrice: number
    // }
    order: OrderModel
};

type State = {
    orderInfoOn: boolean,
    orderEditOn: boolean
};

export default class Order extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            orderInfoOn: false,
            orderEditOn: false
        }

        this.toggleOrderInfo = this.toggleOrderInfo.bind(this);
        this.toggleOrderEdit = this.toggleOrderEdit.bind(this);
    }
    
    toggleOrderInfo = () => this.setState({orderInfoOn: !this.state.orderInfoOn});

    toggleOrderEdit = () => this.setState({orderEditOn: !this.state.orderEditOn});

    render() {
        // Prop Destructuring
        const {order} = this.props;

        return (
            <div>
                {/* {console.log('Props In Order Comp:', this.props.order)} */}
                <h3>Customer Name: {order.customer.lastName}, {order.customer.firstName}</h3>
                <h3>Order Price: {order.totalPrice}</h3>
                <Button onClick={this.toggleOrderInfo}>View</Button>
                {this.state.orderInfoOn ? <OrderDetail toggleInfo={this.toggleOrderInfo} toggleEdit={this.toggleOrderEdit} orderInfoOn={this.state.orderInfoOn} order={order} /> : null}
                {this.state.orderEditOn ? <OrderEdit toggleEdit={this.toggleOrderEdit} orderEditOn={this.state.orderEditOn} order={order} /> : null}
            </div>
        );
    }
}

