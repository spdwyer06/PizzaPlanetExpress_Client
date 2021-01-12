import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from "reactstrap";



export default class OrderDetail extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    mapOrderDetail(order){
        console.log('mapOrderDetail():', order);
        order.menuItems.map((menuItem, i) => {

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
            console.log('.map() Key:', i);
            console.log('.map() Name:', menuItem.name);
            console.log('.map() Quantity:', menuItem.orderItem.quantity);
            console.log('.map() Item Price:', totalItemPrice);

        });
    }

    getOrderDate = (order) => order.orderTime.slice(0, 10);

    getOrderTime = (order) => order.orderTime.slice(11);

    formatPhoneNumber(order){
        const number = order.customer.phoneNumber.split('');
        const areaCode = number.splice(0, 3).join('');
        const firstThree = number.splice(0, 3).join('');
        const finalFour = number.join('');

        return `(${areaCode}) ${firstThree}-${finalFour}`;
    }

    editOrder(){
        this.props.toggleEdit();
        this.props.toggleInfo();
    }

    render() {
        const {order} = this.props;
        console.log('Order Prop:', order);

        return (
            <Modal isOpen={this.props.orderInfoOn}>
                {console.log('Order Prop:', order)}
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Order Detail</h3>
                            </Col>
                            <Col sm='2'>
                                <Button onClick={this.props.toggleInfo} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <h3>Order Id: {order.id}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Date Order Taken: {this.getOrderDate(order)}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Order Taken At: {this.getOrderTime(order)}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Order Taken By: {order.user.firstName} {order.user.lastName}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Customer: {order.customer.firstName} {order.customer.lastName}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>Phone Number: {this.formatPhoneNumber(order)}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Order Detail:</h3>
                            </Col>
                        </Row>
                        {/* {order.menuItems.forEach(menuItem => <h6>{menuItem.name}</h6>)} */}
                        {this.mapOrderDetail(order)}
                        <Row>
                            <Col>
                                <h3>Order Total: ${order.totalPrice}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Paid For? {order.isPaid}</h3>
                                {console.log('Order Paid?', order.isPaid)}
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button>Pay For Order</Button>
                    <Button color='primary' onClick={() => this.editOrder()}>Add To Order</Button>
                    {/* <Button color='primary' onClick={this.props.toggleEdit}>Edit Order</Button> */}
                </ModalFooter>
                {/* {order.menuItems.map((menuItem, i) => {
                    <h6>{menuItem.name}</h6>
                })} */}
            </Modal>
        );
    }
}

