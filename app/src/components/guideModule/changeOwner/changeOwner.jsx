import React, { Component } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import "./changeOwner.css"
import ERC1400 from "../../../contracts/ERC1400.json"
var contract = require("@truffle/contract");

class ChangeOwner extends Component {
  constructor(props) {
    super(props);

    var MyContract = contract(ERC1400)
    this.utils = props.drizzle.web3.utils;
    this.MyContract = MyContract;

    this.state = {
        type:"",
        pid:"",
        agentIdentity:"",
        baseURL: process.env.REACT_APP_API_ROOT,
        tookenAddress:""
    };
    this.ChangeOwner = this.ChangeOwner.bind(this)
  }
  componentWillMount(){
    //从redux仓库获取pid,适用于新建入口进入的情况
    let pid = this.props.drizzle.store.getState().pid;
    console.log("仓库取pid",pid)
    
    if( !pid && type != "new"){
      //若redux仓库中不存在pid,则从路由中取
      pid = this.props.match.params.pid;
      console.log("从路由参数取pid",pid)
    }
      var index = this.props.match.params.index;
      var type = this.props.match.params.type;
      var pidParams = this.props.match.params.pid;
      
      if(type != "new"){
        this.setState({
            pid:pid,
            params:{
                index:index,
                type:type,
                pid:pidParams
            }
        })
        if(type=="deployed"){
          //获取部署信息展示
          this.showData(index,type)
          this.setState({
            type:type
          })
        }
      }else{
        this.setState({
          params:{
            type:"new"
        }
        })
      }
  }
  async showData(index,type){
    try {
      //入库后传pid
      let url = this.state.baseURL+"/issue_project/list?status="+type;

      let response = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      let json = response.json() // parses response to JSON
      json.then(res=>{
          if(res.success){
              this.setState({
                agentIdentity:res.data[index].agentIdentity,
                tookenAddress:res.data[index].deployedToken.contractAddress
              })
              
          }else{
              console.log(type+"失败")
          }
        })
    } catch (err) {
      alert(err);
    } finally {
    }
  }
  async ChangeOwner(){
    var MyContract = contract(ERC1400)
    this.MyContract = MyContract;
    let web3 = this.props.drizzle.web3;
    
    this.MyContract.setProvider(web3.currentProvider);
    this.MyContract.defaults({
      from: this.props.drizzleState.accounts[0]
    });

    if(this.state.agentIdentity){
        console.log(this.state.agentIdentity)

        let inst = await this.MyContract.at(this.state.tookenAddress)
        await inst.changeOwner(this.state.agentIdentity).then(()=>{
            alert("owner change success")
        });
    }else{
        alert("agent identity not found,owner change fail")
    }
  }
  render(){
      return (
        <div className="change">
            <div className="header">
                <Header />
            </div>
            <div className="changeBox">
                <div className="guideBox">
                    <Guide params={this.state.params}/>
                </div>
                <div className="contentBox">
                    <div className="title">Transfer To Dealer</div>
                    <div className="article">
                        <div className="label">Agent Identity:</div>
                        <div className="text">{this.state.agentIdentity}</div>
                        <p className="button" onClick={this.ChangeOwner}>Transfer To Dealer</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
}
export default (props) => {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          return (
            <ChangeOwner {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
}