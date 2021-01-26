import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";



type Props = {
    addToOrderOn: boolean,
    toggleAddToOrder: () => void,
    updateSpecialInstructions: (instructions: string) => void,
    updateQuantity: (quantity: number) => void,
    addItemToOrder: () => void
};

export default class AddToOrder extends Component<Props> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <Modal isOpen={this.props.addToOrderOn}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h3>Add Item To Order</h3>
                            </Col>
                            <Col sm='2'>
                                <Button color='danger' onClick={this.props.toggleAddToOrder}>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Form onSubmit={this.props.addItemToOrder}>
                    <ModalBody>
                        {/* Taken out until ability to add multiple of the same items to an order is complete */}
                        {/* <FormGroup>
                            <Label for='specialInstructions'>Special Instructions:</Label>
                            <Input name='specialInstructions' id='specialInstructionsInput' required onChange={(e) => this.props.updateSpecialInstructions(e.target.value)} />
                        </FormGroup> */}
                        <FormGroup>
                            <Label for='quantity'>Quantity:</Label>
                            <Input name='quantity' id='quantityInput' required onChange={(e) => this.props.updateQuantity(parseInt(e.target.value))} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit'>Done</Button>
                    </ModalFooter>
                </Form>
                
            </Modal>
        );
    }
}





// import React, { Component } from 'react';
// import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

// import API_URL from '../../env';



// type Props = {
//     token: string,
//     itemId: number,
//     orderId: number,
//     addToOrderOn: boolean,
//     toggleAddToOrder: () => void,
//     updateSpecialInstructions: (instructions: string) => void,
//     updateQuantity: (quantity: number) => void,
//     addItemToOrder: (e: React.FormEvent) => void
// };

// export default class AddToOrder extends Component<Props> {

//     constructor(props: Props) {
//         super(props)
    
//         this.state = {
//         }

//     }

//     render() {
//         return (
//             <Modal isOpen={this.props.addToOrderOn}>
//                 <ModalHeader>
//                     <Container>
//                         <Row>
//                             <Col sm='10'>
//                                 <h3>Add Item To Order</h3>
//                             </Col>
//                             <Col sm='2'>
//                                 <Button color='danger' onClick={this.props.toggleAddToOrder}>X</Button>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </ModalHeader>
//                 <Form onSubmit={(e) => this.props.addItemToOrder(e)}>
//                     <ModalBody>
//                         <FormGroup>
//                             <Label for='quantity'>Quantity:</Label>
//                             <Input name='quantity' id='quantityInput' required onChange={(e) => this.props.updateQuantity(parseInt(e.target.value))} />
//                         </FormGroup>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button type='submit'>Done</Button>
//                     </ModalFooter>
//                 </Form>
//             </Modal>
//         );
//     }
// }
