import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';



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
            <Modal isOpen={this.props.editOn}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Menu Item Edit</h3>
                            </Col>
                            <Col sm='2'>
                                <Button onClick={this.props.toggleEdit} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Form onSubmit={(e) => this.submitForm(e)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for='itemId'>Item Id: {this.props.item.id}</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='itemName'>Menu Item Name:</Label>
                            <Input name='itemName' id='itemNameInput' required placeholder={this.props.item.name} onChange={e => this.setState({updatedName: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='itemPrice'>Menu Item Price:</Label>
                            <Input name='itemPrice' id='itemPriceInput' required placeholder={(this.props.item.price).toString()} onChange={e => this.setState({updatedPrice: parseInt(e.target.value)})} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit'>Done</Button>
                        <Button color='danger' onClick={(e) => this.removeItem(e)}>Remove Item From Menu</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

