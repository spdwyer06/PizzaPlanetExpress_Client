import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, Container, Row, Col } from "reactstrap";



export default class ItemEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    submitForm(){

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
                <Form onSubmit={() => this.submitForm()}>
                    <FormGroup>
                        <Label for='itemId'>Item Id: {this.props.item.id}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for='itemName'>Menu Item Name:</Label>
                        <Input name='itemName' id='itemNameInput' required placeholder={this.props.item.name} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='itemPrice'>Menu Item Price:</Label>
                        <Input name='item{rice' id='itemPriceInput' required placeholder={this.props.item.price} />
                    </FormGroup>
                    <Button type='submit'>Done</Button>
                </Form>
            </Modal>
        );
    }
}

