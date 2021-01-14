import React, { Component } from 'react';
import {Button, Label, Container, Row, Col} from 'reactstrap';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

import Navbar from './Navbar';
import MenuItemList from '../MenuItem/MenuItemList';
import MenuItemCreate from '../MenuItem/ItemCreate';
import OrderList from '../Order/OrderList';

import './Home.css';



type Props = {
    logout: () => void,
    token: string,
    user: {
        isAdmin: boolean
    }
}

export default class Home extends Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
             
        }
    }
    

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
                                {/* All Menu Items */}
                                <Route path='/menuItem/all' exact>
                                    <MenuItemList token={this.props.token} user={this.props.user} />
                                </Route> 
                                {/* Add Menu Item */}
                                <Route path='/menuItem/create' exact component={MenuItemCreate} />
                                {/* All Orders */}
                                <Route path='/order/all' exact>
                                    <OrderList token={this.props.token} user={this.props.user} />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Router>
            </Container>
        );
    }
}

