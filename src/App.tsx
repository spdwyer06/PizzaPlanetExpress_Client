import React, {Component} from 'react';

import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';

import UserModel from './Components/Models/UserModel';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



type State = {
  sessionToken: string,
  user: UserModel
}

class App extends Component<{}, State> {

  constructor(props: any) {
    super(props)
  
    this.state = {
      sessionToken: '',
      user: {
        isManager: false,
        isAdmin: false
      }
    }

    this.updateToken = this.updateToken.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  
  async componentDidMount(){
    try{
      console.log('App mount() Start Token State:', this.state.sessionToken);
      if(localStorage.getItem('token')){
        await this.setState({
          // Casting as string
          sessionToken: (localStorage.getItem('token') as string)
        });
      }
      console.log('App mount() End Token State:', this.state.sessionToken);
      console.log('App mount() End User State:', this.state.user);
    }
    catch(err){
      console.log('Error:', err.message);
    }
  }

  updateToken = async(newToken: string) => {
    localStorage.setItem('token', newToken);
    await this.setState({
      sessionToken: newToken
    });
  }

  async updateUser(user: UserModel){
    if(user.isAdmin){
      localStorage.setItem('userRole', 'admin');
    }
    else if(user.isManager){
      localStorage.setItem('userRole', 'manager');
    }
    else{
      localStorage.setItem('userRole', 'employee');
    }
    
    await this.setState({
      user: user
    });
  }
  
  logOut(){
    localStorage.clear();
    this.setState({
      sessionToken: '',
      user: {
        isManager: false,
        isAdmin: false
      }
    });
  }

  render(){
    return (
      <div className="App">
        <br id='mainApp' />
        {console.log('App render() Token State:', this.state.sessionToken)}
        {console.log('App render() User State:', this.state.user)}
        {this.state.sessionToken === '' ? <Auth updateUser={this.updateUser} updateToken={this.updateToken} /> : <Home token={this.state.sessionToken} user={this.state.user} logout={this.logOut} />}
      </div>
    );
  }
}

export default App;