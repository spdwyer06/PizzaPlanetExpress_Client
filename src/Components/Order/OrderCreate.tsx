import React, { Component } from 'react';

import API_URL from '../../env';
import CustomerList from '../Customer/CustomerList';



type Props = {
    token: string,
};

type State = {

};

export default class OrderCreate extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
            <div>
                <CustomerList token={this.props.token} />
            </div>
        );
    }
}

