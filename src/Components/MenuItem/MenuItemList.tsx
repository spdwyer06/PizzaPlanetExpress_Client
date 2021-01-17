import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Link, useRouteMatch} from 'react-router-dom';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import MenuItem from './MenuItem';
import MenuItemEdit from './ItemEdit';
import MenuItemCreate from './ItemCreate';

import MenuItemModel from '../Models/MenuItemModel';

import './MenuItem.css';
import UserModel from '../Models/UserModel';



type Props = {
    token: string,
    user: UserModel
    // user: {
    //     isAdmin: boolean
    // },
    orderId: number,
    orderItems: MenuItemModel[],
    updateOrderItems: (item: MenuItemModel) => void
};

type State = {
    menuItems: [],
    createOn: boolean,
    count: number
};

export default class MenuItemList extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            menuItems: [],
            createOn: false,
            count: 0
        }

        this.toggleCreate = this.toggleCreate.bind(this);
        this.mapItems = this.mapItems.bind(this);
    }

    async componentDidMount(){
        console.log('Menu Item List Count Start:', this.state.count);
        console.log('Menu Item List User:', this.props.user);
        await this.mapItems();
        console.log('Menu Item List Count End:', this.state.count);
    }

    // componentDidUpdate(prevProps: Props, prevState: State){
    //     console.log('Running MenuItemList .componentDidUpdate()');
    //     if(prevState.menuItems != this.state.menuItems){
    //         console.log('Stuff has changed');
    //         // this.mapItems();
    //     }
    //     // this.mapItems();
    // }
    
    async mapItems(){
        try{
            const url = `${API_URL}/menuItem/all`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            };
            const allItems = await fetch(url, options);
            const itemsJson = await allItems.json();
            const menuItems = itemsJson.Menu_Items;
            // console.log('All Item 2:', menuItems);
            // console.log('First Item Name 2:', menuItems[0].name);
            // console.log('First Item Price 2:', menuItems[0].price);
    
            // this.setState({menuItems: menuItems});

            this.setState({
                menuItems: menuItems,
                count: menuItems.length
            });
        }
        catch(err){
            console.log('Map Error:', err.message);
        }
    }

    toggleCreate(){
        this.setState({createOn: !this.state.createOn});
        !this.state.createOn ? this.mapItems() : <></>;
    }

    capitalizeName = (name: string) => name[0].toUpperCase() + name.slice(1);

    render() {

        return (
            <div>
                <h1>All Menu Items</h1>
                {/* {this.props.user.isAdmin ? <Button onClick={this.toggleCreate}>Add New Menu Item</Button> : <></>} */}
                {localStorage.getItem('userRole') == 'admin' ? <Button onClick={this.toggleCreate}>Add New Menu Item</Button> : <></>}
                {/* {console.log('State', this.state.menuItems)} */}
                {this.state.menuItems.map((menuItem, i) => <MenuItem user={this.props.user} token={this.props.token} item={menuItem} orderId={this.props.orderId} updateOrderItems={this.props.updateOrderItems} capName={this.capitalizeName} key={i} refreshMenu={this.mapItems} />)}
                {this.state.createOn ? <MenuItemCreate user={this.props.user} token={this.props.token} createOn={this.state.createOn} toggleCreate={this.toggleCreate} /> : <></>}
            </div>
        );
    }
}