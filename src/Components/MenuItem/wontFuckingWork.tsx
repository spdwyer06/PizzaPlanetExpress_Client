import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from "reactstrap";

import API_URL from '../../env';



type Props = {
    token: string,
    itemId: number,
    orderId: number,
    addToOrderOn: boolean,
    toggleAddToOrder: () => void,
    updateSpecialInstructions: (instructions: string) => void,
    // updateQuantity: (quantity: number) => void,
    addItemToOrder: (quantity: number) => void
};

type State = {
    quantity: number
};

export default class AddToOrder extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            quantity: 0
        }

    }

    async handleSubmit(e: React.FormEvent){
        e.preventDefault();

        const q = this.state.quantity;

        // if(!Number(this.state.quantity)){
        //     alert('Enter a valid quantity amount');
        // }
        if(!Number(q)){
            alert('Enter a valid quantity amount');
        }
        else{
            this.props.addItemToOrder(this.state.quantity);
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
                {/* <Form onSubmit={this.props.addItemToOrder}> */}
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for='quantity'>Quantity:</Label>
                            {/* <Input name='quantity' id='quantityInput' required onChange={(e) => this.props.updateQuantity(parseInt(e.target.value))} /> */}
                            {/* <Input name='quantity' id='quantityInput' required onChange={(e) => this.updateQuantity(parseInt(e.target.value))} /> */}
                            <Input name='quantity' id='quantityInput' required onChange={async(e) => await this.setState({quantity: (parseInt(e.target.value))})} />
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
//     // updateQuantity: (quantity: number) => void,
//     addItemToOrder: () => void
// };

// type State = {
//     quantity: number
// };

// export default class AddToOrder extends Component<Props, State> {

//     constructor(props: Props) {
//         super(props)
    
//         this.state = {
//             quantity: 0
//         }

//         this.updateQuantity = this.updateQuantity.bind(this);
//     }

//     async updateQuantity(newQuantity: number){
//         console.log('Prior State:', this.state.quantity);
//         await this.setState({quantity: newQuantity});
//         console.log('After State:', this.state.quantity);
//     }

//     // updateQuantity = async(quantity: number) => await this.setState({quantity: quantity});
    
//     async handleSubmit(e: React.FormEvent){
//         e.preventDefault();

//         console.log('Token:', this.props.token);

//         try{
//             const url = `${API_URL}/order/food/${this.props.itemId}/add/${this.props.orderId}`;
//             const options = {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                     quantity: this.state.quantity
//                 }),
//                 headers: new Headers({
//                     'Content-Type': 'application/json',
//                     'Authorization': this.props.token   
//                 })
//             };

//             console.log(this.state.quantity);

//             await fetch(url, options);
//             console.log('addItemToOrder() After Fetch');
//         }
//         catch(err){
//             console.log('Error:', err.message);
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
//                 {/* <Form onSubmit={this.props.addItemToOrder}> */}
//                 <Form onSubmit={this.handleSubmit}>
//                     <ModalBody>
//                         <FormGroup>
//                             <Label for='quantity'>Quantity:</Label>
//                             <Input name='quantity' id='quantityInput' required onChange={(e) => this.updateQuantity(parseInt(e.target.value))} />
//                             {/* <Input name='quantity' id='quantityInput' required onChange={async(e) => await this.setState({quantity: (parseInt(e.target.value))})} /> */}
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