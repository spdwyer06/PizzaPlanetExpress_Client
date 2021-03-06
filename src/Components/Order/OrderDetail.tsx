import React, { Component } from 'react';
import { Button, Modal, Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';

import API_URL from '../../env';

import OrderModel from '../Models/OrderModel';
import UserModel from '../Models/UserModel';
import MenuItemModel from '../Models/MenuItemModel';
import OrderDetailItem from './OrderDetailItem';

import './order.css';



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
    isPaid: string,
    toggleEditItemOn: boolean
};

export default class OrderDetail extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            isPaid: '',
            toggleEditItemOn: false
        }

        this.toggleEditItem = this.toggleEditItem.bind(this);
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

    toggleEditItem = async() => await this.setState({toggleEditItemOn: !this.state.toggleEditItemOn});

    updateOrderItems = (item: MenuItemModel) => console.log('Hazaah from OrderDetail');

    addToOrder = async() => this.props.setOrderId(this.props.order.id);

    async payOrder(e: React.MouseEvent){
        try{
            const url = `${API_URL}/order/${this.props.order.id}`;
            const options = {
                method: 'PUT',
                body: JSON.stringify({
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
        console.log('Order Details:', this.props.order.menuItems);

        this.setIsPaid(this.props.order);
    }

    render() {
        const {order} = this.props;
        console.log('Order Prop:', order);

        return(
            <Modal contentClassName='orderDetailModal' isOpen={this.props.orderInfoOn}>
                <Container>
                    <Row className='rowSpacing'>
                        <Col className='text-right'>
                            <Button id='cancelBtn' onClick={this.props.toggleInfo} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Order Id: {order.id}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Date Order Taken: {this.getOrderDate(order)}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Order Taken At: {this.getOrderTime(order)}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Order Taken By: {order.user.firstName} {order.user.lastName}</h3>
                        </Col>
                    </Row>
                    <Row  className='rowSpacing'>
                        <Col>
                            <h3>Customer: {order.customer.firstName} {order.customer.lastName}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h6>Phone Number: {this.formatPhoneNumber(order)}</h6>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Order Detail:</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Item Name</h6>
                        </Col>
                    </Row>
                    {order.menuItems.map((menuItem) => <OrderDetailItem token={this.props.token} menuItem={menuItem} orderId={order.id} orderPrice={order.totalPrice} mapOrders={this.props.mapOrders} />)}
                    {this.state.toggleEditItemOn ? <Row><h3>quantity</h3></Row> : null}
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Order Total: ${order.totalPrice.toFixed(2)}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col>
                            <h3>Paid For? {this.state.isPaid}</h3>
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col className='text-left'>
                            <Button id='orderDetailBtn' onClick={(e) => this.payOrder(e)}>Pay For Order</Button>
                        </Col>
                        <Col className='text-right'>
                            <Link to='/order/add'>
                                <Button id='orderDetailBtn' color='primary' onClick={() => this.addToOrder()}>Add To Order</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    }
}