import React, { Component } from "react";
import { BrowserRouter as  Router, NavLink } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import "./index.css"

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }
  async handleLogin(){
    //退出登录
    try {
      let response = await fetch(process.env.REACT_APP_API_ROOT+'/auth/logout', {
        credentials: 'include', // include, same-origin, *omit
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      })
      let json = response.json() // parses response to JSON
      json.then(res=>{
        if(res.success){
            window.location.reload();
            // this.props.history.push("/");
        }else{
          console.log("注销失败")
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  render(){
    return (
      <ul className="topmenu">
          <NavLink to="/">
              <div className="logoBox">
                  <div className="logo"></div>
                  <div className="text">MAGIC CIRCLE</div>
              </div>
              
          </NavLink>
          <li>
              <a className="icon"></a>
              <p>{this.props.drizzleState.accounts[0]}</p>
              <div className="inOut" onClick={this.handleLogin}>Sign out</div>
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