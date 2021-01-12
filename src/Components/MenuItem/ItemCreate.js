import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, Container, Row, Col } from "reactstrap";

export default class ItemCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
         
        }
    }

    submitForm(){

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
                <Form onSubmit={() => this.submitForm()}>
                    <FormGroup>
                        <Label for='itemName'>Menu Item Name:</Label>
                        <Input name='itemName' id='itemNameInput' required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='itemPrice'>Menu Item Price:</Label>
                        <Input name='item{rice' id='itemPriceInput' required />
                    </FormGroup>
                    <Button type='submit'>Create Menu Item</Button>
                </Form>
            </Modal>
        );
    }
}

