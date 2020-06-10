import React, { Component } from "react";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import select from "../../../assets/下拉@2x.png"
import "./issue.css"
import { DrizzleContext } from "@drizzle/react-plugin";
import ERC1400 from "../../../contracts/ERC1400.json"
var contract = require("@truffle/contract");

class Issue extends Component {
  constructor(props) {
    super(props);


    this.state = {
        optionBox:false,
        partition: "",
        issued: false,
        tookenAddress:"",
        pid:"",
        baseURL:process.env.REACT_APP_API_ROOT,
        params:{},
        partitionList:[],
        partitionIndex:"",
        issueByPartitionOrNot:true,
        issueList:[]
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
  option(index,e){
    this.setState({
        optionBox: false,
        partition: e.target.innerHTML,
        partitionIndex: index
    })
  }
  async handleIssue(){
      //调用发行合约 
      var MyContract = contract(ERC1400)
      this.utils = this.props.drizzle.web3.utils;
      this.MyContract = MyContract;
      let web3 = this.props.drizzle.web3;
      this.MyContract.setProvider(web3.currentProvider);

      var amount = this.amount.value;
      var receiver = this.receiver.value;

      if(!this.utils.isAddress( this.state.tookenAddress)){
        alert("token address ot found!")
        return
      }
  
      if(!this.utils.isAddress( receiver)){
        alert("input token holder please!")
        return
      }
   
    if(this.state.partition){
      var partition = this.state.partitionList[this.state.partitionIndex].label;
      
      if(!this.utils.isHex( partition)){
        alert("input correct partition please!")
        return
      }
      console.log(partition,amount,receiver);
      let inst = await this.MyContract.at(this.state.tookenAddress)
      await inst.issueByPartition(
        partition,
        receiver,
        amount,
        "0x0000",
        { from: this.props.drizzleState.accounts[0] }).then(()=>{
          //调接口存储发行信息
          this.saveIssue(partition,amount,receiver);
        });

      return;
    }else{
      let inst = await this.MyContract.at(this.state.tookenAddress)
      await inst.issueByPartition(
        receiver,
        amount,
        "0x0000",
        { from: this.props.drizzleState.accounts[0] }).then(()=>{
          //调接口存储发行信息
          this.saveIssue(partition,amount,receiver)
        });

      return;
    }

    
      
  }
  componentWillMount(){
      //guideMenu路由配置
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
        //获取partition
        this.getPartitionList(type,index);

      }else{
        this.setState({
          params:{
            type:"new"
        }
        })
      }

    //获取pid
    //从redux仓库获取pid,适用于新建入口进入的情况
      let pid = this.props.drizzle.store.getState().pid;
      // console.log("仓库取pid",pid)
    
      if( !pid && type != "new"){
        //若redux仓库中不存在pid,则从路由中取
        pid = this.props.match.params.pid;
        // console.log("从路由参数取pid",pid)
      }
        this.setState({
            pid: pid
        })

    //获取部署的token地址
    // console.log("仓库获取部署的token列表",this.props.drizzle.store.getState().deployedTokens)
    let tookenAddr = this.props.drizzle.store.getState().deployedTokens;
    if(tookenAddr.length!=0){
      this.setState({
        tookenAddress:tookenAddr[0].contractAddress
      })
    }else{
      if(type == "deployed"){
          //对已部署ST,获取合约地址
       this.getDeployedData(index,type);
      }
    }
    

    //获取发行信息列表
        this.getIssuedList(pid);
    
    //收起下拉框
        document.addEventListener('click', this.cancelOptionBox)
  }
  async getDeployedData(index,type){
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
            console.log(res.data[index])
              this.setState({
                tookenAddress:res.data[index].deployedToken.contractAddress,
                issueByPartitionOrNot:res.data[index].tokenConfig==null||res.data[index].tokenConfig.partitions==null?false:true
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
  async saveIssue(partition,amount,receiver) {
    let url = this.state.baseURL+"/issurance/record?projectId="+this.state.pid+"&tokenAddress="+this.state.tookenAddress+"&partition="+partition
              +"&amount="+amount+"&receiverAddress="+receiver;

  try {
    let response = await fetch(url, {
      credentials: 'include',
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
    let json = response.json() // parses response to JSON
    json.then(res=>{
        if(res.success){
            console.log("存储成功")
            this.getIssuedList(this.state.pid);
        }else{
            console.log("存储失败")
        }
      })
  } catch (err) {
    alert(err);
  } finally {

  }
}
  async getPartitionList(type,index) {
    let url = this.state.baseURL+"/issue_project/list?status="+type;

  try {
    let response = await fetch(url, {
      credentials: 'include',
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    })
    let json = response.json() // parses response to JSON
    json.then(res=>{
        if(res.success){
            // console.log("获取tokenConfig成功",res.data[index].tokenConfig)
            if(res.data[index].tokenConfig){
              this.setState({
                partitionList:!res.data[index].tokenConfig||!res.data[index].tokenConfig.partitions?[]:res.data[index].tokenConfig.partitions
              })
            }
        }else{
            console.log("获取token list失败")
        }
      })
  } catch (err) {
    alert(err);
  } finally {

  }
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
            //若不为空 set issued 为true,默认为false
            if(res.data.length==0||!res.data){
              this.setState({
                issued:false
              })
            }else{
              this.setState({
                issued:true,
                issueList:res.data
              })
            }
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
                        <div className="table" style={{display: this.state.issued ? "flex":"none"}}>
                            <div className="thead">
                                <div className="td">Partition</div>
                                <div className="td">Amount</div>
                                <div className="td">Receiver address</div>
                            </div>
                            {/* map渲染issue list */}
                            {
                              this.state.issueList.map((item,index)=>{
                                return (
                                  <div className="tr" key={index}>
                                    <div className="td">{item.partition}</div>
                                    <div className="td">{item.amount}</div>
                                    <div className="td">{item.receiverAddress}</div>
                                </div>
                                )
                              })
                            }
                            
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
                                        this.state.partitionList.length != 0?(
                                          this.state.partitionList.map((item,index)=>{
                                            return(
                                                <li key={index} className="option" onClick={this.option.bind(this,index)}>{item.name}</li>
                                            )
                                          })
                                        ):(
                                          <li>If you want to issue by partition,Please add partition during deployment.</li>
                                        )
                                        
                                    }
                                </ul>
                            </div>
                            <div className="informRow">
                                <label htmlFor="amount">Amount: </label>
                                <input ref={el=>this.amount = el} type="text" id="amount"/>
                            </div>
                            <div className="informRow">
                                <label htmlFor="receiver">Receiver address:</label>
                                <input ref={el=>this.receiver = el} type="text" id="receiver"/>
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