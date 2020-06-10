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
        cName:"",
        cSymbol:"",
        cDeciaml:"",
        name: "",
        symbol: "",
        decimal: 0,
        controllers: [],
        baseURL:process.env.REACT_APP_API_ROOT,
        pid:"",
        dataIndex:"",
        deployedData:[],
        type:"",
        partitions:[],
        partiName:"",
        identifier:"",
        agentIdentity:""
    };
    this.addToList = this.addToList.bind(this);
    this.deployCommon = this.deployCommon.bind(this);
    this.deployParti = this.deployParti.bind(this);
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
        this.getAgentIdentity(index,type);
        this.setState({
            pid:pid,
            dataIndex:index,
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
            type:type,
            deployed:true
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
                  deployedData:res.data[index].deployedToken,
                  cName:res.data[index].deployedToken.name,
                  cSymbol:res.data[index].deployedToken.symbol,
                  cDecimal:res.data[index].deployedToken.decimals,
                  name:res.data[index].deployedToken.name,
                  symbol:res.data[index].deployedToken.symbol,
                  decimal:res.data[index].deployedToken.decimals,
                  partitions:!res.data[index].tokenConfig||!res.data[index].tokenConfig.partitions?[]:res.data[index].tokenConfig.partitions,
                  index:res.data[index].tokenConfig==null||res.data[index].tokenConfig.partitions==null?"1":"2",
                  agentIdentity:res.data[index].agentIdentity
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
async getAgentIdentity(index,type){
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
                agentIdentity:res.data[index].agentIdentity
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
handleChange(key,e){
  //处理react input text的onChange方法
    this.setState({
      [key]:e.target.value
    })
}
  changeTab(index){
    this.setState({
        index: index
    })
  }
  addToList(){
    var partiName = this.pPName.value;
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
        var parti = {
            name:partiName,
            label:id
        }
        this.setState({
            partiList: [...this.state.partiList,parti],
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
    if(!this.cName.value||!this.cSymbol.value||!this.cDecimal.value){
        alert("Please enter value")
        return
    }
    let web3 = this.props.drizzle.web3;
    this.MyContract.setProvider(web3.currentProvider);
    var controllers = [this.props.drizzleState.accounts[0],this.state.agentIdentity];
    console.log(controllers);
    this.MyContract.new(
        this.cName.value,
        this.cSymbol.value, 
        this.utils.toBN(this.cDecimal.value),
        controllers,
        this.props.drizzle.contracts.ComplianceServiceRegistry.address, { from: this.props.drizzleState.accounts[0] }).then(inst => {
        let payload = {
            name: this.cName.value,
            symbol: this.cSymbol.value,
            decimals: this.utils.toBN(this.cDecimal.value),
            controllers: controllers,
            registryAddress: this.props.drizzle.contracts.ComplianceServiceRegistry.address,
            contractAddress: inst.address,
            deployAccount: this.props.drizzleState.accounts[0],
            tokenType: "erc1400"
        };
        this.props.drizzle.store.dispatch(deployFinished1400(payload))
          this.save(payload,false)
        }).then(
            //部署成功
            setTimeout(()=>{
                console.log(this.props.drizzleState.deployedTokens)
            },10000)
        )
    return;
  }
  deployParti(){
    //判断partition列表中是否已经添加数据
    if(!this.state.partiList.length){
        alert("Please add to the list first")
        return
    }
    // console.log(this.state.partiList);
    let web3 = this.props.drizzle.web3;
    this.MyContract.setProvider(web3.currentProvider);
    var controllers = [this.props.drizzleState.accounts[0],this.state.agentIdentity];
    console.log(controllers);
    console.log(this.state.name,this.state.symbol)
    console.log(typeof(Number(this.state.decimal)));
    this.MyContract.new(
        this.state.name,
        this.state.symbol,
        Number(this.state.decimal),
        controllers,
        this.props.drizzle.contracts.ComplianceServiceRegistry.address, { from: this.props.drizzleState.accounts[0] }).then(inst => {
          //生成json数据
          let payload = {
            name: this.state.name,
            symbol: this.state.symbol,
            decimals: Number(this.state.decimal),
            controllers: controllers,
            registryAddress: this.props.drizzle.contracts.ComplianceServiceRegistry.address,
            contractAddress: inst.address,
            deployAccount: this.props.drizzleState.accounts[0],
            tokenType: "erc1400"
          };
          this.props.drizzle.store.dispatch(deployFinished1400(payload))
          this.save(payload,true);
          
        })
  }
//   调用接口存储已部署ST
  async save(token,hasPartition) {
      let url = this.state.baseURL+"/issue_project/token_deployed"
      console.log(this.state.pid)
      //拼接pid
      if(this.state.pid){
        url += ("?pid="+this.state.pid)
      }else{
        alert("pid Not Found");
        return;
      }
      console.log(token,hasPartition)
    try {
      let response = await fetch(url, {
        body: JSON.stringify(token), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', 
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // n  redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      let json = response.json() // parses response to JSON
      json.then(res=>{
        if(res.success){
            alert("部署成功")
            if(hasPartition==true){
              //存储partitionList
              let config = {
                name: this.state.name,
                symbol: this.state.symbol,
                decimals: Number(this.state.decimal),
                partitions:this.state.partiList
              }
              this.saveTokenConfig(config);
            }else{
              //状态更新
              this.props.history.push({pathname:"/"})
            }
            
        }else{
            console.log("save部署失败")
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  async saveTokenConfig(config) {
    let url = this.state.baseURL+"/issue_project/save_token_config"
    //拼接pid
    if(this.state.pid){
      url += ("?pid="+this.state.pid)
    }else{
      alert("pid Not Found");
      return;
    }
    console.log(config)

  try {
    let response = await fetch(url, {
      body: JSON.stringify(config), // must match 'Content-Type' header
      credentials: 'include', 
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
    let json = response.json() // parses response to JSON
    json.then(res=>{
        if(res.success){
            console.log("save config成功",res.data)
            //状态更新
            this.props.history.push({pathname:"/"})
        }else{
            console.log("save config失败")
        }
      })
  } catch (err) {
    alert(err);
  } finally {

  }
}
  render(){
      return (
        <div className="deploy">
            <div className="header">
                <Header />
            </div>
            <div className="deployBox">
                <div className="guideBox">
                    <Guide params={this.state.params}/>
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
                                <input ref={el=>this.cName=el} type="text" id="cName" value={this.state.cName||''} onChange={this.handleChange.bind(this,"cName")}/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="cSymbol">Symbol:</label>
                                <input ref={el=>this.cSymbol=el} type="text" id="cSymbol" value={this.state.cSymbol||''} onChange={this.handleChange.bind(this,"cSymbol")}/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="cDecimal">Decimal:</label>
                                <input ref={el=>this.cDecimal=el} type="text" id="cDecimal" value={this.state.cDecimal||''} onChange={this.handleChange.bind(this,"cDecimal")}/>
                            </div>
                            <div className="sub" onClick={this.deployCommon} style={{display:this.state.type=="deployed"?"none":"block"}}>Submit</div>
                        </form>
                        <div className="table" style={{display: this.state.index == 2&&(this.state.partiList.length||this.state.partitions.length) ? "flex" : "none"}}>
                            <div className="thead">
                                <div className="del"></div>
                                <div className="td">Partition Identifier</div>
                                <div className="td">Name</div>
                                <div className="td">Symbol</div>
                                <div className="td">Decimal</div>
                            </div>
                            {
                              this.state.deployed?(
                                  this.state.partitions.map((item,index)=>{
                                    return (
                                      <div className="tr" key={index}>
                                        <div className="del"></div>
                                        <div className="td">{item.label}</div>
                                        <div className="td">{this.state.name}</div>
                                        <div className="td">{this.state.symbol}</div>
                                        <div className="td">{this.state.decimal}</div>
                                      </div>
                                    )
                                  })
                              ):(
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
                              )
                               
                            }
                        </div>
                        <form  ref={el=>this.partiForm=el} action="" autoComplete="off" className="partiForm" style={{display: this.state.index == 2&&!this.state.deployed ? "flex" : "none"}}>
                            <div className="partiList"></div>
                            {
                                  this.state.partitions.length==0?(
                                      <div className="formRow">
                                        <label htmlFor="partiName">Partition Name: </label>
                                        <input ref={el=>this.pPName=el} type="text" id="partiName" value={this.state.partiName} onChange={this.handleChange.bind(this,"partiName")}/>
                                      </div>
                                  ):(
                                    this.state.partitions.map((item,index)=>{
                                      return (
                                          <div className="formRow" key={index}>
                                            <label htmlFor="partiName">Partition Name: </label>
                                            <input ref={el=>this.pPName=el} type="text" id="partiName" value={item.name} onChange={this.handleChange.bind(this,"partiName")}/>
                                          </div>
                                      )
                                    })
                                  )
                          }
                          {
                                  this.state.partitions.length==0?(
                                      <div className="formRow">
                                        <label htmlFor="identifier">Identifier: </label>
                                        <input ref={el=>this.pId=el} type="text" id="identifier" value={this.state.identifier} onChange={this.handleChange.bind(this,"identifier")}/>
                                      </div>
                                  ):(
                                    this.state.partitions.map((item,index)=>{
                                      return (
                                          <div className="formRow" key={index}>
                                            <label htmlFor="identifier">Identifier: </label>
                                            <input ref={el=>this.pId=el} type="text" id="identifier" value={item.label} onChange={this.handleChange.bind(this,"identifier")}/>
                                          </div>
                                      )
                                    })
                                  )
                          }
                            <div className="formRow">
                                <label htmlFor="pName">Name:</label>
                                <input ref={el=>this.pName=el} type="text" id="pName" value={this.state.name||''} onChange={this.handleChange.bind(this,"name")}/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pSymbol">Symbol:</label>
                                <input ref={el=>this.pSymbol=el} type="text" id="pSymbol" value={this.state.symbol||''} onChange={this.handleChange.bind(this,"symbol")}/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pDecimal">Decimal:</label>
                                <input ref={el=>this.pDecimal=el} type="text" id="pDecimal" value={this.state.decimal||''} onChange={this.handleChange.bind(this,"decimal")}/>
                            </div>
                            <div className="add" onClick={this.addToList} style={{display:this.state.type=="deployed"?"none":"block"}}>+</div>
                            <div className="sub" onClick={this.deployParti} style={{display:this.state.type=="deployed"?"none":"block"}}>Submit</div>
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