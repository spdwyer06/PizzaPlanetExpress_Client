import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Link, useRouteMatch} from 'react-router-dom';
import {Button} from 'reactstrap';

import API_URL from '../../env';
import MenuItem from './MenuItem';
import MenuItemEdit from './ItemEdit';
import MenuItemCreate from './ItemCreate';

import './MenuItem.css';



type Props = {
    token: string,
    user: {
        isAdmin: boolean
    }
};

type State = {
    menuItems: [],
    createOn: boolean
};

export default class MenuItemList extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            menuItems: [],
            createOn: false
        }

        this.toggleCreate = this.toggleCreate.bind(this);
    }

    componentDidMount(){
        this.mapItems();
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
            // console.log('All Item 2:', menuItems);
            // console.log('First Item Name 2:', menuItems[0].name);
            // console.log('First Item Price 2:', menuItems[0].price);
    
            this.setState({menuItems: menuItems});
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    toggleCreate(){
        this.setState({createOn: !this.state.createOn});
    }

    capitalizeName = (name: string) => name[0].toUpperCase() + name.slice(1);

    render() {

        return (
            <div>
                <h1>All Menu Items</h1>
                {this.props.user.isAdmin ? <Button onClick={this.toggleCreate}>Add New Menu Item</Button> : <></>}
                {/* {console.log('State', this.state.menuItems)} */}
                {this.state.menuItems.map((menuItem, i) => <MenuItem user={this.props.user} token={this.props.token} item={menuItem} capName={this.capitalizeName} key={i} />)}
                {this.state.createOn ? <MenuItemCreate createOn={this.state.createOn} toggleCreate={this.toggleCreate} /> : <></>}
            </div>
        );
    }
}