import React, {Component} from 'react';

import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import API_URL from './env';

// import UserModel from './Components/Models/UserModel';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



type UserModel = {
  isManager: boolean,
  isAdmin: boolean
};

type State = {
  sessionToken: string,
  user: UserModel
  // user: {
  //   isManager: boolean,
  //   isAdmin: boolean
  // } 
  // sessionToken: Storage
}

class App extends Component<{}, State> {

  constructor(props: any) {
    super(props)
  
    this.state = {
      sessionToken: '',
      // user: {}
      user: {
        isManager: false,
        isAdmin: false
      }
    }

    this.updateToken = this.updateToken.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logOut = this.logOut.bind(this);
    // this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  // componentDidMount(){
  //   this.state.sessionToken === '' || null ? <Login updateToken={this.updateToken} /> : <button onClick={() => this.logOut()}>Log Out</button>
  // }
  
  async componentDidMount(){
    try{
      console.log('App mount() Start Token State:', this.state.sessionToken);
      if(localStorage.getItem('token')){
        // const user = 
        await this.setState({
          // Casting as string
          sessionToken: (localStorage.getItem('token') as string)
        });
      }
      // else if(localStorage.getItem('user')){
      //   this.setState({
      //     user: localStorage.getItem('user');
      //   })
      // }
      // else{
      //   this.setState({
      //     sessionToken: ''
      //   });
      // }
      console.log('App mount() End Token State:', this.state.sessionToken);
      console.log('App mount() End User State:', this.state.user);
    }
    catch(err){
      console.log('Error:', err.message);
    }
  }

  // componentDidUpdate(){
  //   console.log('App update() Start Token State:', this.state.sessionToken);
    
  //   if(!localStorage.getItem('token')){
  //     this.setState({
  //       sessionToken: ''
  //     });
  //   }

  //   console.log('App update() End Token State:', this.state.sessionToken);
  //   // else{
  //   //   this.setState({
  //   //     sessionToken: localStorage.getItem('token')
  //   //   });
  //   // }
  // }

  // isLoggedIn(){
  //   this.state.sessionToken === '' || null ? <Login updateToken={this.updateToken} /> : <button onClick={() => this.logOut()}>Log Out</button>
  // }

  // updateToken = (newToken: string): void => {
  //   localStorage.setItem('token', newToken);
  //   this.setState({
  //     sessionToken: newToken
  //   });
  // }

  updateToken = async(newToken: string) => {
    localStorage.setItem('token', newToken);
    await this.setState({
      sessionToken: newToken
    });
  }

  // updateUser(user: UserModel): void{
  //   this.setState({
  //     user: user
  //   });
  //   if(user.isAdmin){
  //     localStorage.setItem('userRole', 'admin');
  //   }
  //   else if(user.isManager){
  //     localStorage.setItem('userRole', 'manager');
  //   }
  //   else{
  //     localStorage.setItem('userRole', 'employee');
  //   }
  // }

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
        {console.log('App render() Token State:', this.state.sessionToken)}
        {console.log('App render() User State:', this.state.user)}
        {/* {this.isLoggedIn()} */}
        {/* {this.state.sessionToken === '' || null ? <Login updateToken={this.updateToken} /> : <button onClick={() => this.logOut()}>Log Out</button>} */}
        {/* <Auth updateToken={this.updateToken} /> */}
        {this.state.sessionToken === '' ? <Auth updateUser={this.updateUser} updateToken={this.updateToken} /> : <Home token={this.state.sessionToken} user={this.state.user} logout={this.logOut} />}
        {/* <Home /> */}

        {/* <MenuItemHome /> */}
      </div>
    );
  }
}

export default App;
