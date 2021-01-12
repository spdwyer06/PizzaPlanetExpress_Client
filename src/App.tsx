import React, {Component} from 'react';

import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

type State = {
  sessionToken: string | null
  // sessionToken: Storage
}

class App extends Component<{}, State> {

  constructor(props: any) {
    super(props)
  
    this.state = {
      // sessionToken: ''
       sessionToken: ''
    }

    // this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  // componentDidMount(){
  //   this.state.sessionToken === '' || null ? <Login updateToken={this.updateToken} /> : <button onClick={() => this.logOut()}>Log Out</button>
  // }
  
  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
    }
    // this.setState({
    //   sessionToken: localStorage.getItem('token')
    // })
  }

  // componentDidUpdate(){
  //   if(!localStorage.getItem('token')){
  //     this.setState({
  //       sessionToken: null
  //     })
  //   }
  // }

  // isLoggedIn(){
  //   this.state.sessionToken === '' || null ? <Login updateToken={this.updateToken} /> : <button onClick={() => this.logOut()}>Log Out</button>
  // }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken
    });
  }
  
  logOut(){
    localStorage.clear();
    this.setState({
      sessionToken: ''
    });
  }

  render(){
    return (
      <div className="App">
        {/* {this.isLoggedIn()} */}
        {/* {this.state.sessionToken === '' || null ? <Login updateToken={this.updateToken} /> : <button onClick={() => this.logOut()}>Log Out</button>} */}
        {/* <Auth updateToken={this.updateToken} /> */}

        <Home />

        {/* <MenuItemHome /> */}
      </div>
    );
  }
}

export default App;
