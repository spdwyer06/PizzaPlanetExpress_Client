import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

import OrderModel from '../Models/OrderModel';

import './order.css';


type Props = {
    order: OrderModel
}

export default class OrderDetailItems extends Component<Props> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {

        return(
            <div>
                {this.props.order.menuItems.map((menuItem, i) => {

                    const totalItemPrice = menuItem.price * menuItem.orderItem.quantity;

                    <Row key={i}>
                        <Col>
                            <h6>{menuItem.name}</h6>
                        </Col>
                        <Col>
                            <h6>{menuItem.orderItem.quantity}</h6>
                        </Col>
                        <Col>
                            <h6>{totalItemPrice}</h6>
                        </Col>
                    </Row>
                    console.log('OrderDetailItems Key:', i);
                    console.log('OrderDetailItems Name:', menuItem.name);
                    console.log('OrderDetailItems Quantity:', menuItem.orderItem.quantity);
                    console.log('OrderDetailItems Item Price:', totalItemPrice);
                })}
            </div>
        );

        // return (
        //     {this.props.order.menuItems.map((menuItem, i) => {
                
        //         const totalItemPrice = menuItem.price * menuItem.orderItem.quantity;
                
        //         <Row key={i}>
        //             <Col>
        //                 <h6>{menuItem.name}</h6>
        //             </Col>
        //             <Col>
        //                 <h6>{menuItem.orderItem.quantity}</h6>
        //             </Col>
        //             <Col>
        //                 <h6>{totalItemPrice}</h6>
        //             </Col>
        //         </Row>
        //         console.log('.map() Key:', i);
        //         console.log('.map() Name:', menuItem.name);
        //         console.log('.map() Quantity:', menuItem.orderItem.quantity);
        //         console.log('.map() Item Price:', totalItemPrice);
                
        //     })}
        // );
    }
}

