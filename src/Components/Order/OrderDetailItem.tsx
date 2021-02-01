import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';

import API_URL from '../../env';
import MenuItemModel from "../Models/MenuItemModel";

import './order.css';



type Props = {
  token: string,
  menuItem: MenuItemModel,
  orderId: number,
  orderPrice: number,
  mapOrders: () => void
};

type State = {
  editItemOn: boolean,
  quantity: number
};

export default class OrderDetailItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editItemOn: false,
      quantity: 0
    };

    this.toggleEditItemOn = this.toggleEditItemOn.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  toggleEditItemOn = async() => this.setState({ editItemOn: !this.state.editItemOn });

  async updateQuantity(quantity: number){
    const currentQuantity = this.state.quantity;

    await this.setState({
        quantity: currentQuantity + quantity
    });
  }

  async updateOrderItem(e: React.MouseEvent){
    //   e.preventDefault();
    
      const menuItemName = await this.props.menuItem.name;

      try{
        const url = `${API_URL}/order/food/${menuItemName}/update/${this.props.orderId}`;
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                quantity: this.state.quantity
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        };

        await fetch(url, options);

        this.toggleEditItemOn();
        this.props.mapOrders();
      }
      catch(err){
          console.log('Error:', err.message);
      }
  }

//   componentDidMount = async() => await this.setState({quantity: this.props.menuItem.orderItem.quantity})

  async componentDidMount(){
      console.log('Props:', this.props.menuItem.id);

      await this.setState({quantity: this.props.menuItem.orderItem.quantity});
  }

  async findNewTotal(){
      const newQuantity = this.state.quantity;
    //   const originalQuantity = this.props.menuItem.orderItem.quantity;
      const itemPrice = this.props.menuItem.price;
      const originalPrice = this.props.orderPrice;
      const addingPrice = newQuantity * itemPrice;
      const newPrice = originalPrice + addingPrice;

    //   return newPrice.toFixed(2);

    return `New Order Total: ${newPrice.toFixed(2)}`;
  }

  render() {
    const menuItem = this.props.menuItem;

    return (
        <div>
            <Row key={menuItem.id}>
                <Col>
                    <pre>
                        <h6 className='orderItem'>{menuItem.name} X {this.state.quantity}</h6>
                    </pre>
                </Col>
                <Col>
                    <pre>
                        <h6 className='orderItem'>${(menuItem.price * this.state.quantity).toFixed(2)}</h6>
                    </pre>
                </Col>
                <Col>
                    <pre>
                        {!this.state.editItemOn ? <Button id='editOrderItemBtn' onClick={() => this.toggleEditItemOn()}>Edit</Button> : <Button id='cancelBtn' color='danger' onClick={() => this.toggleEditItemOn()}>X</Button>}
                    </pre>
                </Col>
            </Row>
            {this.state.editItemOn ? (
                <div>

                <Row>
                    <Col sm='2'>
                        {this.state.quantity > 0 ? <Button id='editItemQuantityBtn' onClick={() => this.updateQuantity(-1)}>-</Button> : null}
                    </Col>
                    <Col sm='2' className='text-center'>
                        <h1 className='orderItem'>{this.state.quantity}</h1>
                    </Col>
                    <Col sm='2'>
                        <Button id='editItemQuantityBtn' onClick={() => this.updateQuantity(1)}>+</Button>
                    </Col>
                    <Col sm='6'>
                        <Button id='submitItemQuantityBtn' onClick={(e) => this.updateOrderItem(e)}>Done</Button>
                    </Col>
                </Row>
                <Row>
                    {this.state.quantity != this.props.menuItem.orderItem.quantity ? <h6 className='orderItem'>New Order Total: ${(this.props.orderPrice + ((this.state.quantity - menuItem.orderItem.quantity) * menuItem.price)).toFixed(2)}</h6> :null}
                </Row>
                </div>
            ) : null}
        </div>
      
    );
  }
}

/*
<div>
            <Row key={menuItem.id}>
                <Col>
                    <pre>
                        <h6>{menuItem.name} X {this.state.quantity}</h6>
                    </pre>
                </Col>
                <Col>
                    <pre>
                        <h6>${(menuItem.price * this.state.quantity).toFixed(2)}</h6>
                    </pre>
                </Col>
                <Col>
                    <pre>
                        <Button onClick={() => this.toggleEditItemOn()}>Edit</Button>
                    </pre>
                </Col>
            </Row>
            {this.state.editItemOn ? (
                <div>

                <Row>
                    <Col sm='2'>
                        {this.state.quantity > 0 ? <Button onClick={() => this.updateQuantity(-1)}>-</Button> : null}
                    </Col>
                    <Col sm='2' className='text-center'>
                        <h1>{this.state.quantity}</h1>
                    </Col>
                    <Col sm='2'>
                        <Button onClick={() => this.updateQuantity(1)}>+</Button>
                    </Col>
                    <Col sm='6'>
                        <Button onClick={(e) => this.updateOrderItem(e)}>Done</Button>
                    </Col>
                </Row>
                <Row>
                    {this.state.quantity != this.props.menuItem.orderItem.quantity ? <h6>New Order Total: ${(this.props.orderPrice + ((this.state.quantity - menuItem.orderItem.quantity) * menuItem.price)).toFixed(2)}</h6> :null}
                </Row>
                </div>
            ) : null}
        </div>
*/