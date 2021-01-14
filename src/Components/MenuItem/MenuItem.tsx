import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import MenuItemEdit from './ItemEdit';

import './MenuItem.css';



type Props = {
    user: {isAdmin: boolean},
    token: string,
    item: {
        id: number,
        name: string,
        price: number
    },
    capName: (name: string) => string,
    refreshMenu: () => void
};

type State = {
    editOn: boolean
};

export default class MenuItem extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            editOn: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
    }

    async toggleEdit(){
        await this.setState({editOn: !this.state.editOn});
        // !this.state.editOn ? this.props.refreshMenu() : <></>;
    }
    

    render() {
        const {item} = this.props;

        return (
                <div>
                    {/* <h3>{this.props.item.name}</h3> */}
                    <h3>{this.props.capName(item.name)}</h3>
                    <h3>${this.props.item.price}</h3>
                    {this.props.user.isAdmin ? <Button onClick={this.toggleEdit}>Edit Item</Button> : <></>}
                    <Button>Add To Order</Button>
                    {console.log('Menu Item Token:', this.props.token)}
                    {this.state.editOn ? <MenuItemEdit refreshMenu={this.props.refreshMenu} token={this.props.token} toggleEdit={this.toggleEdit} item={this.props.item} editOn={this.state.editOn} /> : null}
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

