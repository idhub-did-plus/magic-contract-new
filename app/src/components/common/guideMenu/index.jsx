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
                <NavLink to="/register" exact><li className={this.state.path == "/register" ? "active" : ""}>Information Registration</li></NavLink>
                <NavLink to="/deploy" exact><li className={this.state.path == "/deploy" ? "active" : ""}>Deployment Contract</li></NavLink>
                <NavLink to="/configure" exact><li className={this.state.path == "/configure" ? "active" : ""}>Compliance Configuration</li></NavLink>
                <NavLink to="/issue"><li className={this.state.path == "/issue" ? "active" : ""}>Security Tokenization</li></NavLink>
                <NavLink to="/disclosure"><li className={this.state.path == "/disclosure" ? "active" : ""}>Onchain Disclosure</li></NavLink>
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