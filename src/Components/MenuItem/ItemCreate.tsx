import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';
import UserModel from '../Models/UserModel';

import './menuItem.css';



type Props = {
    createOn: boolean,
    token: string,
    user: UserModel,
    toggleCreate: () => void,
    capitalizeName: (name: string) => string
};

type State = {
    name: string,
    price: number | null
};

export default class ItemCreate extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            name: '',
            price: null
        }
    }

    async submitForm(e: React.FormEvent){
        e.preventDefault();

        const stringValues = /^[A-Za-z]+$/

        if(!stringValues.test(this.state.name)){
            alert('Enter a valid item name.');
        }
        else if(!Number(this.state.price)){
            alert('Enter a valid item price.');
        }
        else{
            try{
                console.log('Item Create Start User:', this.props.user);
                
                const url = `${API_URL}/menuItem/create`;
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: this.props.capitalizeName(this.state.name),
                        price: this.state.price?.toFixed(2)
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.token
                    })
                };
    
                await fetch(url, options);
    
                console.log('Item Create End User:', this.props.user);
    
                this.props.toggleCreate();
            }
            catch(err){
                console.log('Error:', err.message);
            }
        }
    }

    render() {
        return (
            <Modal contentClassName='itemCreateModal' isOpen={this.props.createOn}>
                <Container>
                    <Row>
                        <Col className='text-right'>
                            <Button id='cancelBtn' onClick={this.props.toggleCreate} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={(e) => this.submitForm(e)}>
                        <FormGroup>
                            <Label for='itemName'>Menu Item Name:</Label>
                            <Input name='itemName' id='itemNameInput' onChange={e => this.setState({name: e.target.value})}  required />
                        </FormGroup>
                        <FormGroup>
                            <Label for='itemPrice'>Menu Item Price:</Label>
                            <Input name='item{rice' id='itemPriceInput' onChange={e => this.setState({price: parseInt(e.target.value)})}  required />
                        </FormGroup>
                        <Row>
                            <Col className='text-center'>
                                <Button id='createItemBtn' type='submit'>Create Menu Item</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal>
        );
    }
}