import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';

import API_URL from '../../env';

import OrderModel from '../Models/OrderModel';
import UserModel from '../Models/UserModel';
import MenuItemModel from '../Models/MenuItemModel';



type Props = {
    toggleInfo: () => void,
    orderInfoOn: boolean,
    order: OrderModel,
    token: string,
    user: UserModel,
    mapOrders: () => void,
    setOrderId: (orderId: number) => void
};

type State = {
    isPaid: string
};

export default class OrderDetail extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            isPaid: ''
        }
    }
    
    mapOrderDetail(order: OrderModel){
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

    getOrderDate = (order: OrderModel) => (order.orderTime).toString().slice(0, 10);

    getOrderTime = (order: OrderModel) => (order.orderTime).toString().slice(11);

    formatPhoneNumber(order: OrderModel){
        const number = (order.customer.phoneNumber).toString().split('');
        const areaCode = number.splice(0, 3).join('');
        const firstThree = number.splice(0, 3).join('');
        const finalFour = number.join('');

        return `(${areaCode}) ${firstThree}-${finalFour}`;
    }

    updateOrderItems = (item: MenuItemModel) => console.log('Hazaah from OrderDetail');

    addToOrder = async() => this.props.setOrderId(this.props.order.id);

    async payOrder(e: React.MouseEvent){
        try{
            const url = `${API_URL}/order/${this.props.order.id}`;
            const options = {
                method: 'PUT',
                body: JSON.stringify({
                    // isPaid: !this.props.order.isPaid
                    isPaid: true
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };

            await fetch(url, options);
            this.props.mapOrders();
            this.props.toggleInfo();
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    setIsPaid = async(order: OrderModel) => order.isPaid ? await this.setState({isPaid: 'Yes'}) : await this.setState({isPaid: 'No'})
    
    componentDidMount(){
        this.setIsPaid(this.props.order);
    }

    render() {
        const {order} = this.props;
        console.log('Order Prop:', order);

        return(
            <div>
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
                            <Row>
                                <Col>
                                    <h6>Item Name</h6>
                                </Col>
                            </Row>
                            {order.menuItems.map((menuItem, i) => {
                                return(
                                    <Row key={i}>
                                        <Col>
                                            <pre>
                                                <h6>{menuItem.name}   X   {menuItem.orderItem.quantity}</h6>
                                            </pre>
                                        </Col>
                                        <Col>
                                            <h6>{menuItem.price * menuItem.orderItem.quantity}</h6>
                                        </Col>
                                    </Row>
                                );
                            })}
                            <Row>
                                <Col>
                                    <h3>Order Total: ${order.totalPrice.toFixed(2)}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>Paid For? {this.state.isPaid}</h3>
                                    {console.log('Order Paid?', order.isPaid)}
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={(e) => this.payOrder(e)}>Pay For Order</Button>
                        <Link to='/order/add'>
                            <Button color='primary' onClick={() => this.addToOrder()}>Add To Order</Button>
                        </Link>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

