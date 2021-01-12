import React, { Component } from 'react';
import {Button, Modal, Form, FormGroup, Label, Container, Row, Col} from 'reactstrap';

import Backspace from './backspace.png';
import API_URL from '../../env';

import './Auth.css';



export default class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             password: '',
             loginOpen: false
        }
    }
    
    
    setPass(e){
        console.log('Button Value:', e.target.value);
        let passBox = document.getElementById('password');
        passBox.innerText += e.target.value;
        this.setState({
            password: this.state.password + e.target.value
        }, () => console.log('Password State:', this.state.password));
        // if(this.state.password.length == 3){
        //     const numBtns = Array.from(document.querySelectorAll('button'));
        //     console.log('Num Btns:', numBtns.length);
        //     const btns = numBtns.slice(0, -1);
        //     btns.forEach(btn => {
        //         btn.style.display = 'none';
        //     });
        // }
    } 
    
    removeLastNum(){
        let passBox = document.getElementById('password');
        let pass = passBox.innerText.slice(0, -1);
        passBox.innerText = pass;
        this.setState({
            password: pass
        }, () => console.log('New Password State:', this.state.password));
    }

    login(){
        this.props.updateToken();
        // this.props.loginOpen = false;
        this.props.toggleLogin();
        console.log('Login Props', this.props.loginOpen);
    }

    render(){
        return(
            // <Container className='loginContainer themed-container' fluid='sm'>
            <Modal isOpen={true}>
            <Container className='loginContainer'>
                <Row>
                    <Col xs='3'></Col>
                    <Col className='headerCol' xs='auto'>
                        <h4 className='test'>Enter Your Password</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs='3'></Col>
                    <Col className='passInput' xs='auto'>
                        <Label id='password'></Label>
                    </Col>
                </Row>
                <Row>
                    <Col xs='3'></Col>
                    <Col className='col1' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='1'>1</Button> : <></>}
                    </Col>
                    <Col className='col2' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='2'>2</Button> : <></>}
                    </Col>
                    <Col className='col3 numBtn' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='3'>3</Button> : <></>}
                    </Col>
                </Row>
                <Row>
                    <Col xs='3'></Col>
                    <Col className='col1' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='4'>4</Button> : <></>}
                    </Col>
                    <Col className='col2' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='5'>5</Button> : <></>}
                    </Col>
                    <Col className='col3' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='6'>6</Button> : <></>}
                    </Col>
                </Row>
                <Row>
                    <Col xs='3'></Col>
                    <Col className='col1' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='7'>7</Button> : <></>}
                    </Col>
                    <Col className='col2' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='8'>8</Button> : <></>}
                    </Col>
                    <Col className='col3' xs xs='auto'>
                        {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='9'>9</Button> : <></>}
                    </Col>
                </Row>
                <Row>
                    <Col xs='3'></Col>
                    <Col className='col1' xs='auto'>
                        <Button onClick={() => this.removeLastNum()}><img id='backspace' src={Backspace} /></Button>
                    </Col>
                    <Col className='col2' xs='auto'>
                        {this.state.password.length == 4 ? <Button type='submit' className='loginBtn' onClick={() => this.login()}>Login</Button> : <></>}
                    </Col>
                </Row>
            </Container>
            </Modal>
        );
    }
}
