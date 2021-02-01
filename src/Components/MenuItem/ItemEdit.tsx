import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';

import './menuItem.css';



type Props = {
    toggleEdit: () => void,
    item: {
        id: number,
        name: string,
        price: number
    },
    editOn: boolean,
    token: string,
    refreshMenu: () => void
};

type State = {
    updatedName: string,
    updatedPrice: number
};

export default class ItemEdit extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            updatedName: '',
            updatedPrice: 0
        }
    }
    
    async submitForm(e: React.FormEvent){
        console.log('Form Submit');
        e.preventDefault();

        const stringValues = /^[A-Za-z]+$/

        if(!stringValues.test(this.state.updatedName)){
            alert('Enter a valid item name.');
        }
        else if(!Number(this.state.updatedPrice)){
            alert('Enter a valid item price.');
        }
        else{
            try{
                const url = `${API_URL}/menuItem/${this.props.item.id}`;
                const options = {
                    method: 'PUT',
                    body: JSON.stringify({
                        name: this.state.updatedName,
                        price: this.state.updatedPrice
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.token
                    })
                };
    
                await fetch(url, options);
                this.props.refreshMenu();
                this.props.toggleEdit();
            }
            catch(err){
                console.log('Error:', err.message);
            }
        }
    }

    async removeItem(e: React.MouseEvent){
        try{
            e.preventDefault();
            const url = `${API_URL}/menuItem/${this.props.item.id}`;
            const options = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };

            await fetch(url, options);
            this.props.refreshMenu();
            this.props.toggleEdit();
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    render() {
        return (
            <Modal contentClassName='itemEditModal' isOpen={this.props.editOn}>
                <Container>
                    <Row className='rowSpacing'>
                        <Col className='text-right'>
                            <Button id='cancelBtn' onClick={this.props.toggleEdit} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={(e) => this.submitForm(e)}>
                        <FormGroup>
                            <Label for='itemId'>Item Id: {this.props.item.id}</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='itemName'>Menu Item Name:</Label>
                            <Input name='itemName' className='rowSpacing' required placeholder={this.props.item.name} onChange={e => this.setState({updatedName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='itemPrice'>Menu Item Price:</Label>
                            <Input name='itemPrice' className='rowSpacing' required placeholder={(this.props.item.price).toString()} onChange={e => this.setState({updatedPrice: parseInt(e.target.value)})} />
                        </FormGroup>
                        <Row className='rowSpacing'>
                            <Col>
                                <Button id='editSubmitBtn' type='submit'>Done</Button>
                            </Col>
                            <Col>
                                <Button id='editRemoveBtn' color='danger' onClick={(e) => this.removeItem(e)}>Remove Item From Menu</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal>
        );
    }
}