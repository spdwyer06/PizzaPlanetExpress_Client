import React, { Component } from 'react';
import { Button, Form, Modal, Container, Row, Col } from "reactstrap";



type Props = {
    addToOrderOn: boolean,
    toggleAddToOrder: () => void,
    updateSpecialInstructions: (instructions: string) => void,
    updateQuantity: (quantity: number) => void,
    addItemToOrder: () => void,
    quantity: number
};

export default class AddToOrder extends Component<Props> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <Modal contentClassName='addToOrderModal' isOpen={this.props.addToOrderOn}>
                <Container>
                    <Row className='rowSpacing'>
                        <Col className='text-right'>
                            <Button id='cancelBtn' color='danger' onClick={this.props.toggleAddToOrder}>X</Button>
                        </Col>
                    </Row>
                    <Form onSubmit={this.props.addItemToOrder}>
                        <Row className='rowSpacing'>
                            <Col sm='3'>
                                {this.props.quantity > 0 ? <Button id='itemQuantityBtn' onClick={() => this.props.updateQuantity(-1)}>-</Button> : null}
                            </Col>
                            <Col sm='6' className='text-center'>
                                <h1>{this.props.quantity}</h1>
                            </Col>
                            <Col sm='3'>
                                <Button id='itemQuantityBtn' onClick={() => this.props.updateQuantity(1)}>+</Button>
                            </Col>
                        </Row>
                        <Row className='rowSpacing'>
                            <Col className='text-center'>
                                <Button id='addItemToOrderBtn' type='submit'>Done</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal>
        );
    }
}