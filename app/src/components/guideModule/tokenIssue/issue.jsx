import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import select from "../../../assets/下拉@2x.png"
import "./issue.css"
import { DrizzleContext } from "@drizzle/react-plugin";

class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
        optionBox:false,
        partition: "",
        deployed: true,
        tookenAddress:"",
        pid:"",
        baseURL:"http://13.229.205.74:2006",
        params:{}
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleIssue = this.handleIssue.bind(this);
    this.cancelOptionBox = this.cancelOptionBox.bind(this);
  }
  handleSelect(){
    this.setState({
        optionBox: !this.state.optionBox
    })
  }
  option(e){
    this.setState({
        optionBox: false,
        partition: e.target.innerHTML
    })
  }
  handleIssue(){
      var partition = this.state.partition;
      var amount = this.amount.value;
      var receiver = this.receiver.value;
      console.log(partition);
      console.log(amount);
      console.log(receiver);
  }
  componentWillMount(){
      //路由配置
      var index = this.props.match.params.index;
      var type = this.props.match.params.type;
      var pidParams = this.props.match.params.pid;
      
      if(type != "new"){
        this.setState({
            params:{
                index:index,
                type:type,
                pid:pidParams
            }
        })
      }else{
        this.setState({
          params:{
            type:"new"
        }
        })
      }
    //获取partition
    

    //获取pid
        let pid = this.props.drizzle.store.getState().pid;
        console.log("仓库取pid",pid)
        this.setState({
            pid: pid
        })

    //获取部署的token地址
        console.log("仓库获取部署的已部署token列表",this.props.drizzle.store.getState().deployedTokens)
        let tookenAddr = this.props.drizzle.store.getState().deployedTokens;
        if(tookenAddr.length!=0){
            this.setState({
                tookenAddr:tookenAddr[0].contractAddress
            })
        }
    

    //获取发行信息列表
        // this.getIssuedList(pid);
    
    //收起下拉框
        document.addEventListener('click', this.cancelOptionBox)
  }
  async getIssuedList(pid) {
    let url = this.state.baseURL+"/issurance/list"
    //拼接pid
    if(pid){
      url += ("?pid=" + pid)
    }else{
      alert("pid Not Found , can't get list");
      return;
    }

  try {
    let response = await fetch(url, {
      credentials: 'include',
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
    let json = response.json() // parses response to JSON
    json.then(res=>{
        if(res.success){
            console.log("获取发行列表成功",res.data)
        }else{
            console.log("获取发行列表失败")
        }
      })
  } catch (err) {
    alert(err);
  } finally {

  }
}
  componentWillUnmount(){
      document.removeEventListener('click', this.cancelOptionBox)
  }
  cancelOptionBox(e){
    if(e.target.className != "selectIcon"){
        this.setState({
            optionBox: false
        })
    }
  }
  render(){
      const Asset = ["11111111111","222222222","33333333333333"];
      return (
        <div className="issue">
            <div className="header">
                <Header />
            </div>
            <div className="issueBox">
                <div className="guideBox">
                    <Guide params={this.state.params}/>
                </div>
                <div className="contentBox">
                    <div className="titl">Security tokenizaiton</div>
                    <div className="stContent">
                        <div className="addrTable">
                            <div className="tr">
                                <div className="td">Token address: </div>
                                <div className="td">{this.state.tookenAddress}</div>
                            </div>
                        </div>
                        <div className="table" style={{display: this.state.deployed ? "flex":"none"}}>
                            <div className="thead">
                                <div className="td">Partition</div>
                                <div className="td">Amount</div>
                                <div className="td">Receiver address</div>
                            </div>
                            <div className="tr">
                                <div className="td">0X4c000E507bE6663e264a1A21507a69Bfa5035D950X4c000E507bE6663e264a1A21507a69Bfa5035D95</div>
                                <div className="td">2000</div>
                                <div className="td">0X4c000E507bE6663e264a1A21507a69Bfa5035D95</div>
                            </div>
                        </div>
                        <form action="" autoComplete="off">
                            <div className="informRow">
                                <div className="select">
                                    <input type="text" id="partition" value={this.state.partition} readOnly/>
                                    <img src={select} alt="下拉按钮" onClick={this.handleSelect} className="selectIcon"/>
                                    <label htmlFor="partition">Select partition: </label>
                                </div>
                                <ul className="optionBox" style={{display: this.state.optionBox ? "block" : "none"}}>
                                    {
                                        Asset.map((item,index)=>{
                                            return(
                                                <li key={index} className="option" onClick={this.option.bind(this)}>{item}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="informRow">
                                <label htmlFor="amount">Amount: </label>
                                <input ref={(el)=>this.amount = el} type="text" id="amount"/>
                            </div>
                            <div className="informRow">
                                <label htmlFor="receiver">Receiver address:</label>
                                <input ref={(el)=>this.receiver = el} type="text" id="receiver" defaultValue="0x08229c18a228989ce016c37fEEB1F875Bab0b4C8"/>
                            </div>
                        </form>
                        <div className="submit" onClick={this.handleIssue}>Submit</div>
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
            <Issue {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
  }