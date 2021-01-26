import React, { Component } from 'react';
import {Button, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

import './Home.css';



type Props = {
    logout: () => void
};

export default class Navbar extends Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <Nav vertical>
                <br />
                <NavItem>
                    <Button onClick={this.props.logout}>Logout</Button>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/customer/all'>
                        <Button>View Customers</Button>
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