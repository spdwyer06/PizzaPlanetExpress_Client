import React, { ChangeEvent, Component } from 'react';
import {Button, Modal, Form, FormGroup, Label, Container, Row, Col, ModalHeader} from 'reactstrap';

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
            //  loginOpen: false
        }
    }
    
    // <HTMLButtonElement>
    
    // setPass(e: Event){
    // setPass(e: React.MouseEvent<HTMLButtonElement>){
    setPass(e: React.MouseEvent<HTMLElement>){
    // setPass(e: ChangeEvent<HTMLInputElement>){
        const value = (e.target as HTMLButtonElement).value;
        // console.log('Button Value:', e.target.value);
        console.log('Button Value:', value);
        let passBox = document.getElementById('password');
        // passBox.innerText += e.target.value;
        (passBox as HTMLInputElement).innerText += value;

        // this.setState((state, value) => ({
        //     password: state.password + value
        // }))

        this.setState({
            // password: this.state.password + e.target.value
            password: this.state.password + value
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
                // const robj = await res.json();
                // console.log('robj:', robj);
                // console.log('Token:', robj.token);
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
            // <Container className='loginContainer themed-container' fluid='sm'>
            <Modal isOpen={true}>
                <ModalHeader>
                    <Container>
                        <Row>
                            <Col sm='10'>
                                <h4 className='test'>Enter Your Password</h4>
                            </Col>
                            <Col sm='2'>
                                <Button onClick={this.props.toggleLogin} color='danger'>X</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <Container className='loginContainer'>
                    <Row>
                        <Col xs='3'></Col>
                        <Col className='passInput' xs='auto'>
                            <Label id='password'></Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='3'></Col>
                        <Col className='col1' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e: React.MouseEvent<HTMLElement>) => this.setPass(e)} value='1'>1</Button> : <></>}
                        </Col>
                        <Col className='col2' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='2'>2</Button> : <></>}
                        </Col>
                        <Col className='col3 numBtn' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='3'>3</Button> : <></>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='3'></Col>
                        <Col className='col1' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='4'>4</Button> : <></>}
                        </Col>
                        <Col className='col2' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='5'>5</Button> : <></>}
                        </Col>
                        <Col className='col3' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='6'>6</Button> : <></>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='3'></Col>
                        <Col className='col1' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='7'>7</Button> : <></>}
                        </Col>
                        <Col className='col2' xs='auto'>
                            {this.state.password.length < 4 ? <Button onClick={(e) => this.setPass(e)} value='8'>8</Button> : <></>}
                        </Col>
                        <Col className='col3' xs='auto'>
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
