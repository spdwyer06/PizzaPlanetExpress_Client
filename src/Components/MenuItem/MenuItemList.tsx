import React, { Component } from 'react';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import MenuItem from './MenuItem';
import MenuItemCreate from './ItemCreate';

import UserModel from '../Models/UserModel';

import './MenuItem.css';



type Props = {
    token: string,
    user: UserModel
    orderId: number,
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
                {localStorage.getItem('userRole') == 'admin' && window.location.href == 'http://localhost:3000/menuItem/all' ? <Button onClick={this.toggleCreate}>Add New Menu Item</Button> : <></>}
                {this.state.menuItems.map((menuItem, i) => <MenuItem user={this.props.user} token={this.props.token} item={menuItem} orderId={this.props.orderId} capName={this.capitalizeName} key={i} refreshMenu={this.mapItems} />)}
                {this.state.createOn ? <MenuItemCreate user={this.props.user} token={this.props.token} createOn={this.state.createOn} toggleCreate={this.toggleCreate} capitalizeName={this.capitalizeName} /> : <></>}
            </div>
        );
    }
}