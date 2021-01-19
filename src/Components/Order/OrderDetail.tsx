import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';

import API_URL from '../../env';
import MenuItemList from '../MenuItem/MenuItemList';
import OrderDetailItems from './OrderDetailItems';

import OrderModel from '../Models/OrderModel';
import UserModel from '../Models/UserModel';
import MenuItemModel from '../Models/MenuItemModel';




// type MenuItemModel = {
//     name: string,
//     price: number,
//     orderItem: {
//         quantity: number
//     }
// }

// type OrderModel = {
//     id: number,
//     user: {
//         firstName: string,
//         lastName: string
//     },
//     customer: {
//         firstName: string,
//         lastName: string,
//         phoneNumber: number
//     },
//     orderTime: Date,
//     menuItems: [MenuItemModel],
//     totalPrice: number,
//     isPaid: boolean
// };

type Props = {
    toggleInfo: () => void,
    // toggleEdit: () => void,
    orderInfoOn: boolean,
    order: OrderModel,
    token: string,
    user: UserModel,
    mapOrders: () => void
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

    async addToOrder(){
        // this.props.toggleEdit();
        // this.props.toggleInfo();
        // window.location.href == '/menuItem/all';
        console.log('addToOrder() in OrderDetail');
        <Switch>
            <Route path='/order/add' exact>
                <MenuItemList token={this.props.token} user={this.props.user} orderId={this.props.order.id} orderItems={this.props.order.menuItems} updateOrderItems={this.updateOrderItems} />
            </Route> 
        </Switch>
    }

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

    // async setIsPaid = (order: OrderModel) => await this.setState({isPaid: order.isPaid});

    //? Set up in a componentDidMount()???
    async setIsPaid(order: OrderModel){
        // console.log('Getting isPaid State:', this.state.isPaid);
        order.isPaid ? await this.setState({isPaid: 'Yes'}) : await this.setState({isPaid: 'No'})
        // await this.setState({
        //     isPaid: order.isPaid
        // });
        // console.log('Setting isPaid State:', this.state.isPaid);
    }
    
    componentDidMount(){
        this.setIsPaid(this.props.order);
        // const isPaidTag = (document.getElementById('isPaidElement') as HTMLElement);
        // isPaidTag.innerText = this.state.isPaid.toString();
    }

    render() {
        const {order} = this.props;
        console.log('Order Prop:', order);

        // return (
        //     <Modal isOpen={this.props.orderInfoOn}>
        //         {console.log('Order Prop:', order)}
        //         <ModalHeader>
        //             <Container>
        //                 <Row>
        //                     <Col sm='10'>
        //                         <h3>Order Detail</h3>
        //                     </Col>
        //                     <Col sm='2'>
        //                         <Button onClick={this.props.toggleInfo} color='danger'>X</Button>
        //                     </Col>
        //                 </Row>
        //             </Container>
        //         </ModalHeader>
        //         <ModalBody>
        //             <Container>
        //                 <Row>
        //                     <Col>
        //                         <h3>Order Id: {order.id}</h3>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h3>Date Order Taken: {this.getOrderDate(order)}</h3>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h3>Order Taken At: {this.getOrderTime(order)}</h3>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h3>Order Taken By: {order.user.firstName} {order.user.lastName}</h3>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h3>Customer: {order.customer.firstName} {order.customer.lastName}</h3>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h6>Phone Number: {this.formatPhoneNumber(order)}</h6>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h3>Order Detail:</h3>
        //                     </Col>
        //                 </Row>
        //                 {/* {order.menuItems.forEach(menuItem => <h6>{menuItem.name}</h6>)} */}
        //                 {this.mapOrderDetail(order)}
        //                 <Row>
        //                     <Col>
        //                         <h3>Order Total: ${order.totalPrice}</h3>
        //                     </Col>
        //                 </Row>
        //                 <Row>
        //                     <Col>
        //                         <h3>Paid For? {order.isPaid}</h3>
        //                         {console.log('Order Paid?', order.isPaid)}
        //                     </Col>
        //                 </Row>
        //             </Container>
        //         </ModalBody>
        //         <Router>

                
        //         <ModalFooter>
        //             <Button onClick={(e) => this.payOrder(e)}>Pay For Order</Button>
        //             {/* <Button onClick={() => order.isPaid == !order.isPaid}>Pay For Order</Button> */}
        //             <Link to='/order/add'>
        //                 <Button color='primary' onClick={() => this.addToOrder()}>Add To Order</Button>
        //             </Link>
        //             {/* <Button color='primary' onClick={this.props.toggleEdit}>Edit Order</Button> */}
        //         </ModalFooter>
        //         {/* {order.menuItems.map((menuItem, i) => {
        //             <h6>{menuItem.name}</h6>
        //         })} */}
        //         <Switch>
        //             <Route path='/order/all' exact>

                        

        //             </Route>
        //             <Route path='/order/add' exact>
        //                 <MenuItemList token={this.props.token} user={this.props.user} orderId={this.props.order.id} orderItems={this.props.order.menuItems} updateOrderItems={this.updateOrderItems} />
        //             </Route> 
        //         </Switch>
        //         </Router>
        //     </Modal>
            
        // );

        return(
            <Router>
                {/* {this.setIsPaid(order)} */}
            <Switch>
                <Route path='/order/all' exact> 
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

                                {/* {this.mapOrderDetail(order)} */}
                                <OrderDetailItems order={order} />

                                <Row>
                                    <Col>
                                        <h3>Order Total: ${order.totalPrice.toFixed(2)}</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {/* <h3>Paid For? {order.isPaid.toString()}</h3> */}
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
                </Route>
                <Route path='/order/add' exact>
                    <MenuItemList token={this.props.token} user={this.props.user} orderId={this.props.order.id} orderItems={this.props.order.menuItems} updateOrderItems={this.updateOrderItems} />
                </Route> 
            </Switch>
         </Router>
        );
    }
}

