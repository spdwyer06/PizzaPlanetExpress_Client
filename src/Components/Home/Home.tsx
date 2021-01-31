import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

import Navbar from './Navbar';
import MenuItemList from '../MenuItem/MenuItemList';
import OrderList from '../Order/OrderList';
import OrderCreate from '../Order/OrderCreate';
import CustomerList from '../Customer/CustomerList';
import UserList from '../User/UserList';


import CustomerModel from '../Models/CustomerModel';
import UserModel from '../Models/UserModel';

import './Home.css';



type Props = {
    logout: () => void,
    token: string,
    user: UserModel
}

type State = {
    orderId: number
}

export default class Home extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            orderId: 0
        }
    }
    
    updateCustomer = (customer: CustomerModel) => console.log('Just here to fulfill the props');

    render() {
        return (
            <Container fluid className='wasd'>
                <Router>
                    <Row className='mainRow'>
                        <Col sm='3'>
                            <Navbar logout={this.props.logout} user={this.props.user} />
                        </Col>
                        <Col className='qwer' sm='9'>
                            <Switch>
                                {/* All Employees */}
                                <Route exact path='/users/all'>
                                    <UserList token={this.props.token} />
                                </Route>
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
                            </Switch>
                        </Col>
                    </Row>
                </Router>
            </Container>
        );
    }
}

