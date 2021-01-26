import React, { Component } from 'react';
import {Button, Label, Container, Row, Col} from 'reactstrap';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

import Navbar from './Navbar';
import MenuItemList from '../MenuItem/MenuItemList';
import MenuItemCreate from '../MenuItem/ItemCreate';
import OrderList from '../Order/OrderList';
import OrderCreate from '../Order/OrderCreate';
import CustomerList from '../Customer/CustomerList';

import MenuItemModel from '../Models/MenuItemModel';

import './Home.css';
import CustomerModel from '../Models/CustomerModel';



type UserModel = {
    isManager: boolean,
    isAdmin: boolean
};

type Props = {
    logout: () => void,
    token: string,
    user: UserModel
}

type State = {
    // testArr: MenuItemModel[],
    orderId: number
}

export default class Home extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            // testArr: [],
            orderId: 0
        }
    }
    
    // updateOrderItems = (item: MenuItemModel) => console.log('MAY HAVE MESSED THIS UP');

    updateCustomer = (customer: CustomerModel) => console.log('Blarg:', window.location.href);

    render() {
        return (
            <Container fluid>
                <Router>
                    <Row>
                        <Col sm='3'>
                            <Navbar logout={this.props.logout} />
                        </Col>
                        <Col sm='9'>
                            <Switch>
                                {/* All Customers */}
                                <Route path='/customer/all' exact>
                                    <CustomerList token={this.props.token} updateCustomer={this.updateCustomer} />
                                </Route>
                                {/* Create Order */}
                                <Route path='/order/create' exact>
                                    <OrderCreate token={this.props.token} user={this.props.user} />
                                    {/* <OrderCreate token={this.props.token} /> */}
                                </Route>
                                {/* All Orders */}
                                <Route path='/order'>
                                    <OrderList token={this.props.token} user={this.props.user} />
                                </Route>
                                {/* All Menu Items */}
                                <Route path='/menuItem/all' exact>
                                    <MenuItemList token={this.props.token} user={this.props.user} orderId={this.state.orderId} />
                                </Route> 
                                {/* Add Menu Item */}
                                <Route path='/menuItem/create' exact component={MenuItemCreate} />
{/* 
                                <Route path='/order/add' exact>
                                    <MenuItemList token={this.props.token} user={this.props.user} orderId={this.state.orderId} />
                                </Route>  */}

                            </Switch>
                        </Col>
                    </Row>
                </Router>
            </Container>
        );
    }
}

