import React, { Component } from 'react';
import {Button, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

import UserModel from '../Models/UserModel';

import './Home.css';



type Props = {
    user: UserModel,
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
                </NavItem>
                <br />
                {localStorage.getItem('userRole') == 'admin' || localStorage.getItem('userRole') == 'manager' ? (
                    <div>
                        <NavItem>
                            <Link to='/users/all'>
                                <Button id='btn'>Employees</Button>
                            </Link>
                        </NavItem>
                        <br />
                    </div>
                ) : null}
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