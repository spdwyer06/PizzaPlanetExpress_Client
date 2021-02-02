import React, { Component } from 'react';
import {Button, Modal, Label, Container, Row, Col} from 'reactstrap';

import Backspace from './backspace.png';
import API_URL from '../../env';

import './Auth.css';



type UserModel = {
    isManager: boolean,
    isAdmin: boolean
  };

type Props = {
    updateToken: (token: string) => void,
    updateUser: (user: UserModel) => void,
    toggleLogin: () => void,
    loginOpen: boolean 
};

type State = {
    password: string
};

export default class Login extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
    
        this.state = {
            password: '',
        }
    }
    
    async setPass(e: React.MouseEvent<HTMLElement>){
        const value = (e.target as HTMLButtonElement).value;

        await this.setState({
            password: this.state.password + value
        }, () => console.log('Password State:', this.state.password));

        let passBox = document.getElementById('password');
        (passBox as HTMLInputElement).innerText += value;
    } 
    
    removeLastNum(){
        let passBox = (document.getElementById('password') as HTMLInputElement);
        let pass = passBox.innerText.slice(0, -1);
        passBox.innerText = pass;
        this.setState({
            password: pass
        }, () => console.log('New Password State:', this.state.password));
    }

    async login(){
        const url = `${API_URL}/user/login`;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        try{
            const res = await fetch(url, options);
            if(res.status != 500){
                console.log('Went through', res.body);
                const r = await res.json();
                const user = r.user;
                const token = r.token;
                console.log('User:', user);
                console.log('Token:', token);
                await this.props.updateToken(token);
                await this.props.updateUser(user);
                this.props.toggleLogin();
            }
            else{
                console.log('Login failed');
            }
        }
        catch(err){
            console.log('Error:', err.message);
        }
    }

    render(){
        return(
            <Modal contentClassName='loginModal' isOpen={true}>
                <Container>
                    <Row>
                        <Col className='text-right'>
                            <Button id='loginCancelBtn' onClick={this.props.toggleLogin} color='danger'>X</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='3'></Col>
                        <Col xs='auto'>
                            {this.state.password != '' ? <Label id='password'></Label> : null}
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col xs='3'></Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e: React.MouseEvent<HTMLElement>) => this.setPass(e)} value='1'>1</Button> : <></>}
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='2'>2</Button> : <></>}
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='3'>3</Button> : <></>}
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col xs='3'></Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='4'>4</Button> : <></>}
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='5'>5</Button> : <></>}
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='6'>6</Button> : <></>}
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col xs='3'></Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='7'>7</Button> : <></>}
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='8'>8</Button> : <></>}
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length < 4 ? <Button id='loginNumBtn' onClick={(e) => this.setPass(e)} value='9'>9</Button> : <></>}
                        </Col>
                    </Row>
                    <Row className='rowSpacing'>
                        <Col xs='3'></Col>
                        <Col xs='auto'>
                            <Button id='loginNumBtn' onClick={() => this.removeLastNum()}><img id='backspace' src={Backspace} /></Button>
                        </Col>
                        <Col xs='auto'>
                            {this.state.password.length == 4 ? <Button type='submit' id='loginBtn' onClick={() => this.login()}>Login</Button> : <></>}
                        </Col>
                    </Row>
                </Container>
            </Modal>
        );
    }
}