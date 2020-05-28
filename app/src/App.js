import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

// import "./App.css";
import drizzle from "./store/MyDrizzleAndStore"
import ComponentContainer from "./components/ComponentContainer";

import TokenManage from "./components/TokenManage/TokenManage"
import Compliance from "./components/tokenComplianceConfigure/compliance"
import ERC1400Deploy from "./components/token/Erc1400DeployComponent"
import ERC1400Issue from "./components/token/TokenIssueComponent"
// import Configure from "./components/compliance/ComplianceComponent"

import LoginController from "./components/LoginController/LoginController";
import Home from "./components/home/Home"
import InformRegister from "./components/guideModule/informRegister/register"
import Deploy from "./components/guideModule/tokenDeploy/deploy"
import Configure from "./components/guideModule/tokenComplianceConfigure/configure"
import Issue from "./components/guideModule/tokenIssue/issue"
import Onchain from "./components/guideModule/fileOnchain/onchain"

class App extends Component {
  render() {

    const newl =
      <DrizzleContext.Provider drizzle={drizzle}>
      
          <DrizzleContext.Consumer>
            {drizzleContext => {
              const { drizzle, drizzleState, initialized } = drizzleContext;

              if (!initialized) {
                return "Loading...";
              }
              return (
                <LoginController drizzle={drizzle} drizzleState={drizzleState}>
                  {/* <ComponentContainer drizzle={drizzle} drizzleState={drizzleState} /> */}
                  <Router>
                    
                  {/* <div>{drizzleState.login.claim}</div> */}
                      <Route path="/" component={Home} exact/>
                      <Route path="/register" component={InformRegister} exact/>
                      <Route path="/deploy" component={Deploy} exact/>
                      <Route path="/configure" component={Configure} exact/>
                      <Route path="/issue" component={Issue} exact/>
                      <Route path="/disclosure" component={Onchain} exact/>
                  </Router>
                </LoginController>
              );
            }}
          </DrizzleContext.Consumer>
      
      </DrizzleContext.Provider>;
    return (
      newl

    );
  }
}

export default App;
