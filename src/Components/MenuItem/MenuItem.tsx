import React, { Component } from 'react';
import {Button, Col} from 'reactstrap';

import API_URL from '../../env';
import MenuItemEdit from './ItemEdit';
import AddToOrder from './AddToOrder';

import './menuItem.css';



type Props = {
    user: {isAdmin: boolean},
    token: string,
    item: {
        id: number,
        name: string,
        price: number
    },
    orderId: number,
    capName: (name: string) => string,
    refreshMenu: () => void,
};

type State = {
    editOn: boolean,
    addToOrderOn: boolean,
    specialInstructions: string,
    quantity: number
};

export default class MenuItem extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            editOn: false,
            addToOrderOn: false,
            specialInstructions: '',
            quantity: 0
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleAddToOrder = this.toggleAddToOrder.bind(this);
        this.updateSpecialInstructions = this.updateSpecialInstructions.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.addItemToOrder = this.addItemToOrder.bind(this);
    }

    async toggleEdit(){
        await this.setState({editOn: !this.state.editOn});
    }

    toggleAddToOrder = async() => await this.setState({addToOrderOn: !this.state.addToOrderOn});

    updateSpecialInstructions = async(instructions: string) => await this.setState({specialInstructions: instructions});

    async updateQuantity(quantity: number){
        const currentQuantity = this.state.quantity;

        await this.setState({
            quantity: currentQuantity + quantity
        });
    }
    
    async addItemToOrder(){
        try{
            const url = `${API_URL}/order/food/${this.props.item.id}/add/${this.props.orderId}`;
            const options = {
                method: 'PUT',
                body: JSON.stringify({
                    specialInstructions: this.state.specialInstructions,
                    quantity: this.state.quantity
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token   
                })
            };

            await fetch(url, options);
            console.log('addItemToOrder() After Fetch');
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    render() {
        const {item} = this.props;

        return (
                <Col className='menuItem' sm='3'>
                    <h3>{this.props.capName(item.name)}</h3>
                    <h3>${this.props.item.price.toFixed(2)}</h3>
                    {localStorage.getItem('userRole') == 'admin' && window.location.href == 'http://localhost:3000/menuItem/all' ? <Button id='editItemBtn' onClick={this.toggleEdit}>Edit Item</Button> : <></>}
                    {this.props.orderId != 0 ? <Button id='editItemBtn' onClick={this.toggleAddToOrder}>Add To Order</Button> : null}
                    {console.log('Menu Item Token:', this.props.token)}
                    {this.state.editOn ? <MenuItemEdit refreshMenu={this.props.refreshMenu} token={this.props.token} toggleEdit={this.toggleEdit} item={this.props.item} editOn={this.state.editOn} /> : null}
                    {this.state.addToOrderOn ? <AddToOrder addToOrderOn={this.state.addToOrderOn} toggleAddToOrder={this.toggleAddToOrder} updateSpecialInstructions={this.updateSpecialInstructions} updateQuantity={this.updateQuantity} addItemToOrder={this.addItemToOrder} quantity={this.state.quantity} /> : null}
                </Col>
        );
    }
}