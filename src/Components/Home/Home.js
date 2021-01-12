import React, { Component } from 'react';
import {Button, Label, Container, Row, Col} from 'reactstrap';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

import Navbar from './Navbar';
import MenuItemList from '../MenuItem/MenuItemList';
import MenuItemCreate from '../MenuItem/ItemCreate';
import OrderList from '../Order/OrderList';

import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Router>
                    <Row>
                        <Col sm='3'>
                            <Navbar />
                        </Col>
                        <Col sm='9'>
                            <Switch>
                                {/* All Menu Items */}
                                <Route path='/menuItem/all' exact component={MenuItemList} />
                                {/* Add Menu Item */}
                                <Route path='/menuItem/create' exact component={MenuItemCreate} />
                                {/* All Orders */}
                                <Route path='/order/all' exact component={OrderList} />
                            </Switch>
                        </Col>
                    </Row>
                </Router>
            </Container>
        );
    }
}

