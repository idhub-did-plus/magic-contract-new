import React, { Component } from "react";
import { BrowserRouter as  Router, NavLink } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import "./index.css"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inOut:""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillMount(){
    if(document.cookie){
      this.setState({
        inOut:"Sign out"
      })
    }else{
      this.setState({
        inOut:"Sign In"
      })
    }
  }
  handleLogin(){
    if(this.state.inOut == "Sign out"){
      document.cookie = "mysession=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.reload()
    }
  }
  render(){
    return (
      <ul className="topmenu">
          <NavLink to="/">
              <div style={{width:'44px',height:'44px',marginLeft:'100px'}} className="logo">
              </div>
              <p className="logoText">MAGIC CIRCLE</p>
          </NavLink>
          <li>
              <a className="icon"></a>
              <p>{this.props.drizzleState.accounts[0]}</p>
              <div className="inOut" onClick={this.handleLogin}>{this.state.inOut}</div>
          </li>
      </ul>
    );
  }
  
}
export default (props) => {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        return (
          <Header {...drizzleContext} {...props} />
        );
      }}
    </DrizzleContext.Consumer>

  )
}