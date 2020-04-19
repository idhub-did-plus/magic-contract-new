import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import del from "../../../assets/delete@2x (1).png"
import "./deploy.css"
import { deployFinished1400 } from "../../../store/token/actions";
import ERC1400 from "../../../contracts/ERC1400.json"
var contract = require("@truffle/contract");

class Deploy extends Component {
  constructor(props) {
    super(props);

    var MyContract = contract(ERC1400)
    this.utils = props.drizzle.web3.utils;
    this.MyContract = MyContract;

    this.state = {
        index: 2,
        deployed: false,
        arrList: [],
        partiList: [],
        name: "",
        symbol: "",
        decimal: 0,
        controllers: []
    };
    this.addToList = this.addToList.bind(this);
    this.deployCommon = this.deployCommon.bind(this);
    this.deployParti = this.deployParti.bind(this);
  }
  changeTab(index){
    this.setState({
        index: index
    })
  }
  addToList(){
    var id = this.pId.value;
    var name =  this.pName.value;
    var symbol = this.pSymbol.value;
    var decimal = this.pDecimal.value;

    const web3 = this.props.drizzle.web3;
    const utils = web3.utils;
    
    id = web3.utils.sha3(id)

    if(!name||!symbol||!decimal){
        alert("Please enter value")
    }else if(!utils.isHex(id)){
        alert("input correct partition please!")
    }else{
        var arr = new Array(id,name,symbol,decimal);
        this.setState({
            partiList: [...this.state.partiList,id],
            arrList: [...this.state.arrList,arr],
            name: name,
            symbol: symbol,
            decimal: decimal
        })
    }
  }
  delFromList(index){
    var newArrList = this.state.arrList.slice();
    newArrList.splice(index,1);
    var newPartiList = this.state.partiList.slice();
    newPartiList.splice(index,1)
    this.setState({
        partiList:newPartiList,
        arrList: newArrList
    })
  }
  deployCommon(){
    console.log(this.cName.value,this.cSymbol.value,this.cDecimal.value);
    if(!this.cName.value||!this.cSymbol.value||!this.cDecimal.value){
        alert("Please enter value")
        return
    }
    let web3 = this.props.drizzle.web3;
    this.MyContract.setProvider(web3.currentProvider);
    this.MyContract.new(
        this.cName.value,
        this.cSymbol.value,
        this.utils.toBN(this.cDecimal.value),
        this.state.controllers,
        this.props.drizzle.contracts.ComplianceServiceRegistry.address, { from: this.props.drizzleState.accounts[0] }).then(inst => {
        let payload = {
            name: this.cName.value,
            symbol: this.cSymbol.value,
            decimals: this.utils.toBN(this.cDecimal.value),
            controllers: this.state.controllers,
            registryAddress: this.props.drizzle.contracts.ComplianceServiceRegistry.address,
            contractAddress: inst.address,
            deployAccount: this.props.drizzleState.accounts[0],
            tokenType: "erc1400"
        };
        this.props.drizzle.store.dispatch(deployFinished1400(payload))
        //   this.save(payload)
        }).then(
            //部署成功
            setTimeout(()=>{
                console.log(this.props.drizzleState.deployedTokens)
            },10000)
        )
    return;
  }
  deployParti(){

    if(!this.state.partiList.length){
        alert("Please add to the list first")
        return
    }

    let web3 = this.props.drizzle.web3;
    this.MyContract.setProvider(web3.currentProvider);
    this.MyContract.new(
        this.state.name,
        this.state.symbol,
        this.utils.toBN(this.state.decimal),
        this.state.controllers,
        this.props.drizzle.contracts.ComplianceServiceRegistry.address, { from: this.props.drizzleState.accounts[0] }).then(inst => {
          let payload = {
            name: this.state.name,
            symbol: this.state.symbol,
            decimals: this.utils.toBN(this.state.decimal),
            controllers: this.state.controllers,
            registryAddress: this.props.drizzle.contracts.ComplianceServiceRegistry.address,
            contractAddress: inst.address,
            deployAccount: this.props.drizzleState.accounts[0],
            tokenType: "erc1400"
          };
          this.props.drizzle.store.dispatch(deployFinished1400(payload))
        //   this.save(payload)
        }).then(
            //部署成功
              setTimeout(()=>{
                console.log(this.props.drizzleState.deployedTokens)
              },10000)
          )
      return;
  }
//   async save(token) {
//     try {
//       let response = await fetch("http://localhost:8080/saveDeployedToken", {
//         body: JSON.stringify(token), // must match 'Content-Type' header
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, same-origin, *omit
//         headers: {
//           'user-agent': 'Mozilla/4.0 MDN Example',
//           'content-type': 'application/json'
//         },
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, cors, *same-origin
//         redirect: 'follow', // manual, *follow, error
//         referrer: 'no-referrer', // *client, no-referrer
//       })
//       let json = response.json() // parses response to JSON
//     } catch (err) {
//       alert(err);
//     } finally {

//     }
//   }
  render(){
      return (
        <div className="deploy">
            <div className="header">
                <Header />
            </div>
            <div className="deployBox">
                <div className="guideBox">
                    <Guide/>
                </div>
                <div className="contentBox">
                    <div className="titl">Deploy contract</div>
                    <div className="artical">
                        <div className="deployTabBox" style={{display: this.state.deployed ? "none" : "flex"}}>
                            <div className="common" onClick={this.changeTab.bind(this,1)}>
                                <div className="unCheck">
                                    <div className="check" style={{display: this.state.index == 1 ? "block" : "none"}}></div>
                                </div>
                                <div className="tab">Common stock</div>
                            </div>
                            <div className="parti" onClick={this.changeTab.bind(this,2)}>
                                <div className="unCheck">
                                    <div className="check" style={{display: this.state.index == 2 ? "block" : "none"}}></div>
                                </div>
                                <div className="tab">Partition</div>
                            </div>
                        </div>
                        <div className="deployedCom" style={{display: this.state.deployed&&this.state.index == 1 ? "flex" : "none"}}>
                            <div className="label">Contract type: </div>
                            <div className="text">Common stock</div>
                        </div>
                        <div className="deployedParti" style={{display: this.state.deployed&&this.state.index == 2 ? "flex" : "none"}}>
                            <div className="label">Contract type: </div>
                            <div className="text">Partition</div>
                        </div>
                        <form action="" autoComplete="off" className="comForm" style={{display: this.state.index == 1 ? "flex" : "none"}}>
                            <div className="formRow">
                                <label htmlFor="cName">Name:</label>
                                <input ref={el=>this.cName=el} type="text" id="cName"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="cSymbol">Symbol:</label>
                                <input ref={el=>this.cSymbol=el} type="text" id="cSymbol"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="cDecimal">Decimal:</label>
                                <input ref={el=>this.cDecimal=el} type="text" id="cDecimal"/>
                            </div>
                            <div className="sub" onClick={this.deployCommon}>Submit</div>
                        </form>
                        <div className="table" style={{display: this.state.index == 2&&this.state.partiList.length ? "flex" : "none"}}>
                            <div className="thead">
                                <div className="del"></div>
                                <div className="td">Partition Identifier</div>
                                <div className="td">Name</div>
                                <div className="td">Symbol</div>
                                <div className="td">Decimal</div>
                            </div>
                            {
                                this.state.arrList.map((tr,index)=>{
                                    return(
                                        <div className="tr" key={index}> 
                                            <div className="del">
                                                <img src={del} alt="删除" onClick={this.delFromList.bind(this,index)}/>
                                            </div>
                                            {
                                                tr.map((item,index)=>{
                                                    return(
                                                        <div className="td" key={index}>{item}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <form  ref={el=>this.partiForm=el} action="" autoComplete="off" className="partiForm" style={{display: this.state.index == 2&&!this.state.deployed ? "flex" : "none"}}>
                            <div className="partiList"></div>
                            <div className="formRow">
                                <label htmlFor="identifier">Identifier: </label>
                                <input ref={el=>this.pId=el} type="text" id="identifier"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pName">Name:</label>
                                <input ref={el=>this.pName=el} type="text" id="pName"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pSymbol">Symbol:</label>
                                <input ref={el=>this.pSymbol=el} type="text" id="pSymbol"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pDecimal">Decimal:</label>
                                <input ref={el=>this.pDecimal=el} type="text" id="pDecimal"/>
                            </div>
                            <div className="add" onClick={this.addToList}>+</div>
                            <div className="sub" onClick={this.deployParti}>Submit</div>
                        </form>
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
            <Deploy {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
  }