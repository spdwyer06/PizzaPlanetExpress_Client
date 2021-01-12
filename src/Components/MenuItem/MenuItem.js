import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import MenuItemEdit from './ItemEdit';

import './MenuItem.css';



export default class MenuItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            editOn: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit(){
        this.setState({editOn: !this.state.editOn});
    }
    

    render() {
        const {item} = this.props;

        return (
                <div>
                    {/* <h3>{this.props.item.name}</h3> */}
                    <h3>{this.props.capName(item.name)}</h3>
                    <h3>${this.props.item.price}</h3>
                    <Button onClick={this.toggleEdit}>Edit Item</Button>
                    {this.state.editOn ? <MenuItemEdit toggleEdit={this.toggleEdit} item={this.props.item} editOn={this.state.editOn} /> : null}
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

