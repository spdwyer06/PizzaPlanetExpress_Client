import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import MenuItemEdit from './ItemEdit';
import AddToOrder from './AddToOrder';

import MenuItemModel from '../Models/MenuItemModel';

import './MenuItem.css';



type Props = {
    user: {isAdmin: boolean},
    token: string,
    item: {
        id: number,
        name: string,
        price: number
    },
    orderId: number,
    capName: (name: string) => string,
    refreshMenu: () => void,
    // updateOrderItems: (item: MenuItemModel) => void
};

type State = {
    editOn: boolean,
    addToOrderOn: boolean,
    specialInstructions: string,
    quantity: number
};

export default class MenuItem extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            editOn: false,
            addToOrderOn: false,
            specialInstructions: '',
            quantity: 0
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleAddToOrder = this.toggleAddToOrder.bind(this);
        this.updateSpecialInstructions = this.updateSpecialInstructions.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.addItemToOrder = this.addItemToOrder.bind(this);
    }

    async toggleEdit(){
        await this.setState({editOn: !this.state.editOn});
        // !this.state.editOn ? this.props.refreshMenu() : <></>;
    }

    toggleAddToOrder = async() => await this.setState({addToOrderOn: !this.state.addToOrderOn});

    updateSpecialInstructions = async(instructions: string) => await this.setState({specialInstructions: instructions});

    updateQuantity = async(qunatity: number) => await this.setState({quantity: qunatity});
    
    async addItemToOrder(){
        try{
            const url = `${API_URL}/order/food/${this.props.item.id}/add/${this.props.orderId}`;
            const options = {
                method: 'PUT',
                body: JSON.stringify({
                    specialInstructions: this.state.specialInstructions,
                    quantity: this.state.quantity
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token   
                })
            };

            await fetch(url, options);
            console.log('addItemToOrder() After Fetch');
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    render() {
        const {item} = this.props;

        return (
                <div>
                    {/* <h3>{this.props.item.name}</h3> */}
                    <h3>{this.props.capName(item.name)}</h3>
                    {/* .toFixed(2) => specifiy 2 decimal places */}
                    <h3>${this.props.item.price.toFixed(2)}</h3>
                    {/* {this.props.user.isAdmin ? <Button onClick={this.toggleEdit}>Edit Item</Button> : <></>} */}
                    {localStorage.getItem('userRole') == 'admin' && window.location.href == 'http://localhost:3000/menuItem/all' ? <Button onClick={this.toggleEdit}>Edit Item</Button> : <></>}
                    {/* {this.props.orderId != 0 ? <Button onClick={() => this.props.updateOrderItems(item)}>Add To Order</Button> : null} */}
                    {/* {this.props.orderId != 0 ? <Button onClick={() => this.addItemToOrder(item)}>Add To Order</Button> : null} */}
                    {this.props.orderId != 0 ? <Button onClick={this.toggleAddToOrder}>Add To Order</Button> : null}
                    {console.log('Menu Item Token:', this.props.token)}
                    {this.state.editOn ? <MenuItemEdit refreshMenu={this.props.refreshMenu} token={this.props.token} toggleEdit={this.toggleEdit} item={this.props.item} editOn={this.state.editOn} /> : null}
                    {this.state.addToOrderOn ? <AddToOrder addToOrderOn={this.state.addToOrderOn} toggleAddToOrder={this.toggleAddToOrder} updateSpecialInstructions={this.updateSpecialInstructions} updateQuantity={this.updateQuantity} addItemToOrder={this.addItemToOrder} /> : null}
                </div>

            //     <Switch>
            //         <Route path='/menuItem/itemId' exact>
            //             <MenuItemEdit item={this.props.item} />
            //         </Route>
            //     </Switch>
            // </Router>
        );
    }
}









// import React, { Component } from 'react';
// import {Button} from 'reactstrap';

// import API_URL from '../../env';
// import MenuItemEdit from './ItemEdit';
// import AddToOrder from './AddToOrder';

// import './MenuItem.css';



// type Props = {
//     user: {isAdmin: boolean},
//     token: string,
//     item: {
//         id: number,
//         name: string,
//         price: number
//     },
//     orderId: number,
//     capName: (name: string) => string,
//     refreshMenu: () => void
// };

// type State = {
//     editOn: boolean,
//     addToOrderOn: boolean,
//     specialInstructions: string,
//     quantity: number
// };

// export default class MenuItem extends Component<Props, State> {

//     constructor(props: Props) {
//         super(props)
    
//         this.state = {
//             editOn: false,
//             addToOrderOn: false,
//             specialInstructions: '',
//             quantity: 0
//         }

//         this.toggleEdit = this.toggleEdit.bind(this);
//         this.toggleAddToOrder = this.toggleAddToOrder.bind(this);
//         this.updateSpecialInstructions = this.updateSpecialInstructions.bind(this);
//         this.updateQuantity = this.updateQuantity.bind(this);
//         this.addItemToOrder = this.addItemToOrder.bind(this);
//     }

//     // async toggleEdit(){
//     //     await this.setState({editOn: !this.state.editOn});
//     // }

//     toggleEdit = async() => await this.setState({editOn: !this.state.editOn});

//     toggleAddToOrder = async() => await this.setState({addToOrderOn: !this.state.addToOrderOn});

//     updateSpecialInstructions = async(instructions: string) => await this.setState({specialInstructions: instructions});

//     updateQuantity = async(qunatity: number) => await this.setState({quantity: qunatity});

//     // async addItemToOrder(quantity: number){
//     //     try{
//     //         const url = `${API_URL}/order/food/${this.props.item.id}/add/${this.props.orderId}`;
//     //         const options = {
//     //             method: 'PUT',
//     //             body: JSON.stringify({
//     //                 specialInstructions: this.state.specialInstructions,
//     //                 quantity: quantity
//     //             }),
//     //             headers: new Headers({
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': this.props.token   
//     //             })
//     //         };

//     //         await fetch(url, options);
//     //         console.log('addItemToOrder() After Fetch');
//     //     }
//     //     catch(err){
//     //         console.log('Error:', err.message);
//     //     }
//     // }
    
//     async addItemToOrder(e: React.FormEvent){
//         e.preventDefault();

//         if(!Number(this.state.quantity)){
//             alert('Enter a proper quantity amount.');
//         }
//         else{
//             try{
//                 const url = `${API_URL}/order/food/${this.props.item.id}/add/${this.props.orderId}`;
//                 const options = {
//                     method: 'PUT',
//                     body: JSON.stringify({
//                         specialInstructions: this.state.specialInstructions,
//                         quantity: this.state.quantity
//                     }),
//                     headers: new Headers({
//                         'Content-Type': 'application/json',
//                         'Authorization': this.props.token   
//                     })
//                 };
    
//                 // await fetch(url, options);
//                 const res = await fetch(url, options);
//                 if(res.status != 200){
//                     const r = await res.json();
//                     console.log('R', r);
//                     // alert(`Error: ${r.Error.errors[0].message}`);
//                 }
//                 console.log('addItemToOrder() After Fetch');
//             }
//             catch(err){
//                 console.log('Error:', err.message);
//             }
//         }
//     }

//     render() {
//         const {item} = this.props;

//         return (
//             <div>
//                 <h3>{this.props.capName(item.name)}</h3>
//                 {/* .toFixed(2) => specifiy 2 decimal places */}
//                 <h3>${this.props.item.price.toFixed(2)}</h3>
//                 {localStorage.getItem('userRole') == 'admin' ? <Button onClick={this.toggleEdit}>Edit Item</Button> : <></>}
//                 {this.props.orderId != 0 ? <Button onClick={this.toggleAddToOrder}>Add To Order</Button> : null}
//                 {console.log('Menu Item Token:', this.props.token)}
//                 {this.state.editOn ? <MenuItemEdit refreshMenu={this.props.refreshMenu} token={this.props.token} toggleEdit={this.toggleEdit} item={this.props.item} editOn={this.state.editOn} /> : null}
//                 {this.state.addToOrderOn ? <AddToOrder token={this.props.token} itemId={this.props.item.id} orderId={this.props.orderId} addToOrderOn={this.state.addToOrderOn} toggleAddToOrder={this.toggleAddToOrder} updateSpecialInstructions={this.updateSpecialInstructions} updateQuantity={this.updateQuantity} addItemToOrder={this.addItemToOrder} /> : null}
//                 {/* {this.state.addToOrderOn ? <AddToOrder token={this.props.token} itemId={this.props.item.id} orderId={this.props.orderId} addToOrderOn={this.state.addToOrderOn} toggleAddToOrder={this.toggleAddToOrder} updateSpecialInstructions={this.updateSpecialInstructions} addItemToOrder={this.addItemToOrder} /> : null} */}
//             </div>
//         );
//     }
// }

