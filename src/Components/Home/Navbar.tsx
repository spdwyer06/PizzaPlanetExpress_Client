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
                    <Button id='btn' onClick={this.props.logout}>Logout</Button>
                    {/* <Button id='blarg' onClick={this.props.logout}>Logout</Button> */}
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/customer/all'>
                        <Button id='btn'>Customers</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/order/create'>
                        <Button id='btn'>New Order</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/order/all'>
                        <Button id='btn'>Orders</Button>
                    </Link>
                </NavItem>
                <br />
                <NavItem>
                    <Link to='/menuItem/all'>
                        <Button id='btn'>Menu Items</Button>
                    </Link>
                </NavItem>
            </Nav>
        );
    }
}