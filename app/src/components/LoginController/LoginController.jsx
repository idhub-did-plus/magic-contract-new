
import "./login.css"
import React, { Component, Children } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { loginFinished } from "../../store/login/actions"
import { Dropdown, Button, Checkbox, Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'
import loginBG from "../../assets/loginBG.png"



export default class LoginController extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      claim: "",
      selItem: 1,
      baseURL: process.env.REACT_APP_API_ROOT,
      // baseURL:"http://dhgzq9.natappfree.cc"
    };

    // this.handleClaimChange = this.handleClaimChange.bind(this);
    this.login = this.login.bind(this);

  }
  async componentDidMount() {
    let json = await this.reentry();
    if(json != undefined &&json.success){
      this.props.drizzle.store.dispatch(loginFinished(json));
    }
    //this.props.drizzle.store.dispatch(login());

  }
  // handleClaimChange(key, text, value) {

  //   this.claim = text.value;

  // }
  handleCheck(selItem){
    this.setState({
      selItem: selItem
    })
  }
  async login(event) {
    
    if(this.state.selItem == 1){
      this.claim = "complianceManager";
      window.localStorage.setItem("claim","complianceManager");
    }else if(this.state.selItem == 2){
      this.claim = "tokenIssuer"
    }else if(this.state.selItem == 3){
      this.claim = "BD"
      window.localStorage.setItem("claim","BD");
    }else if(this.state.selItem == 4){
      this.claim = "Supervisor"
    }else{
      alert("choose claim please!")
      return
    }
    var myDate = new Date();
		var timestamp = myDate.getTime();
    let web3 = this.props.drizzle.web3;
    //console.log(web3.version);  1.2.6版本
    let identity =  this.props.drizzleState.accounts[0];
    var data = web3.utils.fromUtf8(identity + timestamp + this.claim)
    web3.eth.personal.sign(data, identity,async (error, signature)=>{
      
      let json = await this.request(identity, timestamp, this.claim, signature);
      if(json != undefined && json.success){
        alert("login success")
        this.props.drizzle.store.dispatch(loginFinished(json)); 
      }else{
        alert("login failed")
      }
    });

  }
  async request(identity, tp,claim, sig) {
    try {
      let url = this.state.baseURL+'/auth/login?identity='+identity+'&timestamp='+tp + '&claim=' + claim+ '&signature=' + sig;
      
      let response = await fetch(url, {
       
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      let json = response.json() // parses response to JSON
      return json;
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  async reentry() {

    let url = this.state.baseURL+"/auth/login?action=reentry"

    try {
      let response = await fetch(url, {
       
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      let json = response.json() // parses response to JSON
      return json;
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  render() {
    let login = this.props.drizzle.store.getState().login;
    if (login.success === true) {
      // Load the dapp.
      return Children.only(this.props.children)
    }

    return (
      <div className="loginController">
          <img className="bg" src={loginBG}></img>
          <div className="container">
              <p>Welcome!</p>
              <p>Please select your identity...</p>
              <div className="login">
                  <div className="select" onClick={this.handleCheck.bind(this,1)}>
                      Magic Circle Manager
                      <span className="icon" style={{display: this.state.selItem == 1 ? "block" : "none"}}></span>
                  </div>
                  <div className="select" onClick={this.handleCheck.bind(this,2)}>
                      Magic Circle Issuer
                      <span className="icon" style={{display: this.state.selItem == 2 ? "block" : "none"}}></span>
                  </div>
                  <div className="select" onClick={this.handleCheck.bind(this,3)}>
                      Broker Dealer
                      <span className="icon" style={{display: this.state.selItem == 3 ? "block" : "none"}}></span>
                  </div>
                  <div className="select" onClick={this.handleCheck.bind(this,4)}>
                      Magic Circle Supervisor
                      <span className="icon" style={{display: this.state.selItem == 4 ? "block" : "none"}}></span>
                  </div>
                  <div className="logBtn" onClick={this.login}></div>
              </div>
          </div>
      </div>
    )
  }
}

