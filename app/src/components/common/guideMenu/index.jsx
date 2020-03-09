import React, { Component } from "react";
import { BrowserRouter as  Router, NavLink } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import "./index.css"

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
        path: "/register"
      };
  }
  componentWillMount(){
      this.setState({
          path:window.location.pathname
      })
  }
  render(){
    return (
        <div className="guide">
            <ul>
                <NavLink to="/register"><li className={this.state.path == "/register" ? "active" : ""}>Information Registration</li></NavLink>
                <NavLink to="/deploy"><li className={this.state.path == "/deploy" ? "active" : ""}>Deployment Contract</li></NavLink>
                <li className={this.state.path == "/configure" ? "active" : ""}>Compliance Configuration</li>
                <li className={this.state.path == "/issue" ? "active" : ""}>Security Tokenization</li>
                <li className={this.state.path == "/disclosure" ? "active" : ""}>Onchain Disclosure</li>
            </ul>
        </div>
    );
  }
  
}
export default (props) => {
  return (
    <DrizzleContext.Consumer>
      {drizzleContext => {
        return (
          <Guide {...drizzleContext} {...props} />
        );
      }}
    </DrizzleContext.Consumer>

  )
}