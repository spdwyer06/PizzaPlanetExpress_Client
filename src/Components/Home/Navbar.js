import React, { Component } from 'react';
import {Button, Label, Container, Row, Col, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

import './Home.css';

export default class Navbar extends Component {
    render() {
        return (
            <Nav vertical>
                <br />
                <NavItem>
                    <Link to='/hours/clockIn'>
                        <Button>Clock In</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/hours/clockOut'>
                        <Button>Clock Out</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    {/* Get All Hours By User Id */}
                    <Link to='/hours/myHours'>
                        <Button>View Your Hours</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/hours/all'>
                        <Button>View All Hours</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/order/create'>
                        <Button>Start A New Order</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/order/all'>
                        <Button>View All Orders</Button>
                    </Link>
                </NavItem>
                {/* <br />
                <Row>
                    <Col>
                        <Button>View Current Orders (Unpaid)</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Button>View Previous Orders (Paid)</Button>
                    </Col>
                </Row> */}
                <br />
                <NavItem>
                    <Link to='/menuItem/all'>
                        <Button>View All Menu Items</Button>
                    </Link>
                </NavItem>
            </Nav>
        );
    }
}