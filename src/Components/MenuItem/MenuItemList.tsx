import React, { Component } from 'react';
import {Button, Container, Row} from 'reactstrap';

import API_URL from '../../env';
import MenuItem from './MenuItem';
import MenuItemCreate from './ItemCreate';

import UserModel from '../Models/UserModel';

import './menuItem.css';



type Props = {
    token: string,
    user: UserModel
    orderId: number,
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
        this.mapItems = this.mapItems.bind(this);
    }

    async componentDidMount(){
        console.log('Menu Item List User:', this.props.user);
        await this.mapItems();
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

            if(menuItems){
                await this.setState({menuItems: menuItems});
            }
            else{
                await this.setState({menuItems: []});
            }
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
            <Container>
                <Row>
                    {localStorage.getItem('userRole') == 'admin' && window.location.href == 'http://localhost:3000/menuItem/all' ? <Button id='addNewItemBtn' onClick={this.toggleCreate}>Add New Menu Item</Button> : <></>}
                </Row>
                <Row>
                    {this.state.menuItems.length > 0 ? this.state.menuItems.map((menuItem, i) => <MenuItem user={this.props.user} token={this.props.token} item={menuItem} orderId={this.props.orderId} capName={this.capitalizeName} key={i} refreshMenu={this.mapItems} />) : <h3 className='noItems'>No menu items yet</h3>}
                </Row>
                {this.state.createOn ? <MenuItemCreate user={this.props.user} token={this.props.token} createOn={this.state.createOn} toggleCreate={this.toggleCreate} capitalizeName={this.capitalizeName} /> : <></>}
            </Container>
        );
    }
}