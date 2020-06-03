import React, { Component } from "react";
import { BrowserRouter as  Router, NavLink } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import "./index.css"

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
        path: "/register",
        index:"",
        type:"",
        pid:""
      };
  }
  componentWillMount(){
    var type = this.props.params.type;
    if(type=="new"){
      this.setState({
        type: "new",
        path:window.location.pathname.substr(0,3)
      })
    }else{
      var index = this.props.params.index;
      var pid = this.props.params.pid;
      this.setState({
          path:window.location.pathname.substr(0,3),
          index:index,
          type:type,
          pid:pid
      })
    }
    
  }
  render(){
    let pathRegister = {pathname:"/register/" + this.state.index+ "/" + this.state.type+ "/" + this.state.pid}
    let pathDeploy = {pathname:"/deploy/" + this.state.index+ "/" + this.state.type+ "/" + this.state.pid}
    let pathConfig = {pathname:"/configure/" + this.state.index+ "/" + this.state.type+ "/" + this.state.pid}
    let pathIssue = {pathname:"/issue/" + this.state.index+ "/" + this.state.type+ "/" + this.state.pid}
    let pathDisclosure = {pathname:"/disclosure/" + this.state.index+ "/" + this.state.type+ "/" + this.state.pid}
    
    return (
        <div className="guide">
            <ul>
              {
                this.state.type=="new"?(
                  <div>
                    <NavLink to="/register/index/new/pid" exact><li className={this.state.path == "/re" ? "active" : ""}>Information Registration</li></NavLink>
                    <NavLink to="/deploy/index/new/pid" exact><li className={this.state.path == "/de" ? "active" : ""}>Deploy Contract</li></NavLink>
                    <NavLink to="/configure/index/new/pid" exact><li className={this.state.path == "/co" ? "active" : ""}>Compliance Configuration</li></NavLink>
                    <NavLink to="/issue/index/new/pid"><li className={this.state.path == "/is" ? "active" : ""}>Security Tokenization</li></NavLink>
                    <NavLink to="/disclosure/index/new/pid"><li className={this.state.path == "/di" ? "active" : ""}>Onchain Disclosure</li></NavLink>
                  </div>
                ):(
                  <div>
                    <NavLink to={pathRegister} exact><li className={this.state.path == "/re" ? "active" : ""}>Information Registration</li></NavLink>
                    <NavLink to={pathDeploy} exact><li className={this.state.path == "/de" ? "active" : ""}>Deploy Contract</li></NavLink>
                    <NavLink to={pathConfig} exact><li className={this.state.path == "/co" ? "active" : ""}>Compliance Configuration</li></NavLink>
                    <NavLink to={pathIssue}><li className={this.state.path == "/is" ? "active" : ""}>Security Tokenization</li></NavLink>
                    <NavLink to={pathDisclosure}><li className={this.state.path == "/di" ? "active" : ""}>Onchain Disclosure</li></NavLink>
                  </div>
                )
              }
                
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