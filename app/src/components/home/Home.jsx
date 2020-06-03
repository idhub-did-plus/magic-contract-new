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
      selTab: 1,
      baseURL:"http://13.229.205.74:2006",
      editingData:[],
      audit_passedData:[],
      deployedData:[]
    };
  }
  handleCheck(index){
    this.setState({
      selTab: index
    })
  }
  componentWillMount(){
    //请求登记信息列表,区分状态
    this.getEditingList();
    this.getPassedList();
    //请求已部署ST列表
    this.getdeployedList()
  }
  async getEditingList() {
    try {
      let url = this.state.baseURL+"/issue_project/list?status=editing";
      let response = await fetch(url, {
        credentials: 'include', 
        method: 'GET'
      })

      let json = response.json() 
      json.then(res=>{
        if(res.success){
            this.setState({
              editingData:res.data
            })
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  async getPassedList() {
    try {
      let url = this.state.baseURL+"/issue_project/list?status=audit_passed";
      let response = await fetch(url, {
        credentials: 'include', 
        method: 'GET'
      })

      let json = response.json() 
      json.then(res=>{
        if(res.success){
            this.setState({
              audit_passedData:res.data
            })
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  async getdeployedList() {
    try {
      let url = this.state.baseURL+"/issue_project/list?status=deployed";
      let response = await fetch(url, {
        credentials: 'include', 
        method: 'GET'
      })

      let json = response.json() 
      json.then(res=>{
        if(res.success){
            console.log("获取已部署成功",res.data)
            this.setState({
              deployedData:res.data
            })
        }else{
            console.log("获取已部署失败")
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  showEditingRegInfo(index,type,pid){
    //点击跳转至对应的登记信息详情页 展示已完成登记信息
    this.props.history.push({pathname:"/register/" + index+ "/" + type+ "/" + pid});
  }
  showPassedRegInfo(index,type,pid){
    //点击跳转至对应的登记信息详情页 展示已完成登记信息
    this.props.history.push({pathname:"/register/" + index+ "/" + type+ "/" + pid});
  }
  nextStep(){
    //对于已部署ST 点击可进行后续的配置和发行操作
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
            {
                  this.state.deployedData.map((item,index)=>{
                    return(
                      <div className="listItem" onClick={this.nextStep.bind(this,index)}>
                        <div className="icon"></div>
                        <div className="box">
                            <span className="label">Symbol:</span>
                            <span className="item">{item.symbol}</span>
                            <br/>
                            <span className="label">Name:</span>
                            <span className="item">{item.name}</span>
                        </div>
                        <div className="addr">TokenAddress:</div>
                        <div className="addrCont">{item.contractAddress}</div>
                    </div>
                    )
                  })
                }
                {/* <div className="listItem">
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
                </div> */}
                {/* 新增入口 */}
                <div className="listItem">
                    <NavLink to="/register/index/new/pid"><img className="add" src={add} alt="新增icon"/></NavLink>
                </div>
            </div>
            {/* 未部署 */}
            <div className="content content2" style={{display: this.state.selTab == 2 ? "block" : "none"}}>
                {
                  this.state.editingData.map((item,index)=>{
                    return(
                      <div className="listItem" key={index} onClick={this.showEditingRegInfo.bind(this,index,"editing",item.id)}>
                        <img className="state" src={state} alt="审核状态" style={{display: item.status=="audit_passed"?"block":"none"}}/>
                        <div className="icon"></div>
                        <div className="box">
                            <span className="label">Company:</span>
                            <span className="item">{item.projectDetail.name}</span>
                            <br/>
                            <span className="label">Asset:</span>
                            <span className="item">{item.projectDetail.assetType}</span>
                        </div>
                        <div className="addr">Jurisdiction of company establishment:</div>
                        <div className="addrCont">{item.projectDetail.jurisdiction}</div>
                      </div>
                    )
                  })
                }
                {
                  this.state.audit_passedData.map((item,index)=>{
                    return(
                      <div className="listItem" key={index} onClick={this.showPassedRegInfo.bind(this,index,"audit_passed",item.id)}>
                        <img className="state" src={state} alt="审核状态" style={{display: item.status=="audit_passed"?"block":"none"}}/>
                        <div className="icon"></div>
                        <div className="box">
                            <span className="label">Company:</span>
                            <span className="item">{item.projectDetail.name}</span>
                            <br/>
                            <span className="label">Asset:</span>
                            <span className="item">{item.projectDetail.assetType}</span>
                        </div>
                        <div className="addr">Jurisdiction of company establishment:</div>
                        <div className="addrCont">{item.projectDetail.jurisdiction}</div>
                      </div>
                    )
                  })
                }
                {/* 新增入口 */}
                <div className="listItem">
                    <NavLink to="/register/index/new/pid"><img className="add" src={add} alt="新增icon"/></NavLink>
                </div>
            </div>
          </div>
        </div>
    );
  }
  
}
