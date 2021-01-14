import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';



type Props = {
    createOn: boolean,
    toggleCreate: () => void,
    token: string,
    user: {
        isAdmin: boolean
    }
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
        try{
            e.preventDefault();
            console.log('Item Create Start User:', this.props.user);
            
            const url = `${API_URL}/menuItem/create`;
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    price: this.state.price
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

    render() {
        return (
            <Modal isOpen={this.props.createOn}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Menu Item Create</h3>
                            </Col>
                            <Col sm='2'>
                                <Button onClick={this.props.toggleCreate} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Form onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup>
                        <Label for='itemName'>Menu Item Name:</Label>
                        <Input name='itemName' id='itemNameInput' onChange={e => this.setState({name: e.target.value})}  required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='itemPrice'>Menu Item Price:</Label>
                        <Input name='item{rice' id='itemPriceInput' onChange={e => this.setState({price: parseInt(e.target.value)})}  required />
                    </FormGroup>
                    <Button type='submit'>Create Menu Item</Button>
                </Form>
            </Modal>
        );
    }
}

