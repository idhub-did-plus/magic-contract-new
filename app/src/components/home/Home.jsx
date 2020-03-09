import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../components/common/Header"
import add from "../../assets/add@2x.png"
import state from "../../assets/标签@2x.png"
import "./home.css"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selTab: 1
    };
  }
  handleCheck(index){
    this.setState({
      selTab: index
    })
  }
  render(){
      return (
        <div className="all">
          <div className="first">
            <Header />
          </div>
          <div className="second">
            <div className="tabBox">
                <div className="tab1" onClick={this.handleCheck.bind(this,1)}>
                    <div className={this.state.selTab == 1 ? "tab active" : "tab"}>Deployed ST</div>
                    <div className={this.state.selTab == 1 ? "underline" : ""}></div>
                </div>
                <div className="tab2" onClick={this.handleCheck.bind(this,2)}>
                    <div className={this.state.selTab == 2 ? "tab active" : "tab"}>Undeployed ST</div>
                    <div className={this.state.selTab == 2 ? "underline" : ""}></div>
                    
                </div>
            </div>
            {/* 已部署 */}
            <div className="content content1" style={{display: this.state.selTab == 1 ? "block" : "none"}}>
                <div className="listItem">
                    <div className="icon"></div>
                    <div className="box">
                        <span className="label">Symbol:</span>
                        <span className="item">bc</span>
                        <br/>
                        <span className="label">Name:</span>
                        <span className="item">BBCoin</span>
                    </div>
                    <div className="addr">TokenAddress:</div>
                    <div className="addrCont">0x413f1890Ef3223B34b6FE70Ac6c86c3DfdF56785</div>
                </div>
                {/* 新增入口 */}
                <div className="listItem">
                    <NavLink to="/register"><img className="add" src={add} alt="新增icon"/></NavLink>
                </div>
            </div>
            {/* 未部署 */}
            <div className="content content2" style={{display: this.state.selTab == 2 ? "block" : "none"}}>
                <div className="listItem">
                  <img className="state" src={state} alt="审核状态" style={{display: "block"}}/>
                  <div className="icon"></div>
                    <div className="box">
                        <span className="label">Company:</span>
                        <span className="item">Magic</span>
                        <br/>
                        <span className="label">Asset:</span>
                        <span className="item">Propetry</span>
                    </div>
                    <div className="addr">Jurisdiction of company establishment:</div>
                    <div className="addrCont">American</div>
                </div>
                {/* 新增入口 */}
                <div className="listItem">
                    <NavLink to="/register"><img className="add" src={add} alt="新增icon"/></NavLink>
                </div>
            </div>
          </div>
        </div>
    );
  }
  
}
