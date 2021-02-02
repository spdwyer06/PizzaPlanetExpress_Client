import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Container, Row} from 'reactstrap';

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
            const ordersJson = await allOrders.json();
            const orders = ordersJson.Orders;
            
            if(orders){
                console.log('Orders present');
                await this.setState({orders: orders});
            }
            else{
                console.log('No orders');
                await this.setState({orders: []})
            }
        }
        catch(err){
            console.log('Error', err.message);
        }
    }

    componentDidMount(){
        this.mapOrders();
    }

    toggleOrderCreate = () => this.setState({orderCreateOn: !this.state.orderCreateOn});

    setOrderId = (orderId: number) => this.setState({orderId: orderId});
    
    render() {
        return (
            <Container>
                <Row>
                    <Route exact path='/order/all'>
                        {this.state.orders.length > 0 ? this.state.orders.map((order, i) => <Order token={this.props.token} user={this.props.user} order={order} key={i} mapOrders={this.mapOrders} setOrderId={this.setOrderId} />) : <h3 className='noOrders'>No orders yet</h3>}
                    </Route>
                </Row>

                {/* Switch for inner nested route */}
                <Switch>
                    <Route exact path='/order/add'>
                        <MenuItemList token={this.props.token} user={this.props.user} orderId={this.state.orderId} />
                    </Route> 
                </Switch>
            </Container>
        );
    }
}