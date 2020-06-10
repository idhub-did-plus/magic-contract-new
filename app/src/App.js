import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

// import "./App.css";
import drizzle from "./store/MyDrizzleAndStore"

import LoginController from "./components/LoginController/LoginController";
import Home from "./components/home/Home"
import InformRegister from "./components/guideModule/informRegister/register"
import Deploy from "./components/guideModule/tokenDeploy/deploy"
import Configure from "./components/guideModule/tokenComplianceConfigure/configure"
import Issue from "./components/guideModule/tokenIssue/issue"
import Onchain from "./components/guideModule/fileOnchain/onchain"
import ChangeOwner from "./components/guideModule/changeOwner/changeOwner"

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
                      <Route path="/register/:index/:type/:pid" component={InformRegister}/>
                      <Route path="/deploy/:index/:type/:pid" component={Deploy} exact/>
                      <Route path="/configure/:index/:type/:pid" component={Configure} exact/>
                      <Route path="/issue/:index/:type/:pid" component={Issue} exact/>
                      <Route path="/disclosure/:index/:type/:pid" component={Onchain} exact/>
                      <Route path="/changeOwner/:index/:type/:pid" component={ChangeOwner} exact/>
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
