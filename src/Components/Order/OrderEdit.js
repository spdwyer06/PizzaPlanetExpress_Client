import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from "reactstrap";

export default class OrderEdit extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {

        const {order} = this.props;

        return (
            <Modal isOpen={this.props.orderEditOn}>
                {/* {console.log('Order Edit Prop:', order)} */}
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Order Edit</h3>
                            </Col>
                            <Col sm='2'>
                                <Button color='danger' onClick={this.props.toggleEdit}>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

