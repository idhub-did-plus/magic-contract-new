import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../common/guideHeader"
import Guide from "../../common/guideMenu"
import Upload from "../../../assets/上传@2x.png"
import file from "../../../assets/文件@2x.png"
import "./onchain.css"

import { DrizzleContext } from "@drizzle/react-plugin";
import ERC1400 from "../../../contracts/ERC1400.json"
var contract = require("@truffle/contract");

class Online extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onchain: false,
        fileName: "",
        baseURL:"http://13.229.205.74:2006",
        params:{},
        pid:"",
        fileList:[]
    };
    this.fileSub = this.fileSub.bind(this);
  }
  componentWillMount(){
      //从redux仓库获取pid,适用于新建入口进入的情况
    let pid = this.props.drizzle.store.getState().pid;
    // console.log("仓库取pid",pid)
    
    if( !pid && type != "new"){
      //若redux仓库中不存在pid,则从路由中取
      pid = this.props.match.params.pid;
    //   console.log("从路由参数取pid",pid)
    }
    if(type!="new"){
        this.setState({
            pid:pid
        })
    }
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
      //获取文件列表
      this.getFileList(pid);

      console.log(this.props)
  }
  handleChange(e){
    //file input onChange处理方法
    //处理文件名及文件存储
    var arr = e.target.value.split("\\");
    var name = arr[arr.length-1];
    this.setState({
        fileName: name 
    })
  }
  async fileSub(){
      let file = this.file.files[0];
      let url = this.state.baseURL+"/material/upload_material";
      url += ("?pid="+this.state.pid+"&type="+this.type.value+"&name="+this.type.value+"&content="+this.desc.value);

      var formData = new FormData();
      formData.append("file",file);
      try {
        let response = await fetch(url, {
            body: formData,
            credentials: 'include',
            method: 'POST',
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
            if(res.success){
                console.log("上传成功")
                this.getFileList(this.state.pid);
                //返回上传时间 返回http地址准备上链 1400 更新列表 /material/retrieve_materials?pid=
                //若返回状态onchain为false点击列表中上链按钮上链
            }else{
                console.log("上传失败")
            }
        })
    } catch (err) {
        alert(err);
    } finally {

    }
  }
  async getFileList(pid){
     //请求文件列表数据
     let url = this.state.baseURL+"/material/retrieve_materials"
     //拼接pid
     if(pid){
        url += ("?pid="+pid)
      }else{
        alert("pid Not Found");
        return;
      }
      try {
        let response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
          if(res.success){
              console.log("获取文件列表成功",res.data)
              this.setState({
                fileList:res.data
              })
              //存数据渲染 获得文件哈希
              //成功后 点击上链 /material/material_stream_id 获取url用于上链
          }else{ 
              console.log("获取文件列表失败")
          }
        })
      } catch (err) {
        alert(err);
      } finally {
  
      }
  }
  async getURL(fileId,index){
    let url = this.state.baseURL+"/material/material_stream_id?id="+fileId;
    try {
        let response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
          if(res.success){
              console.log("获取URL成功",res.data)
              var uri = "";
              //得到后上链
            //   this.onChain(uri,index)
          }else{ 
              console.log("获取URL失败")
          }
        })
      } catch (err) {
        alert(err);
      } finally {
  
      }
  }
  async onChain(uri,index){
      //调用上链合约 成功后调用onchain接口
      var MyContract = contract(ERC1400)
      this.utils = this.props.drizzle.web3.utils;
      this.MyContract = MyContract;
      let web3 = this.props.drizzle.web3;
      this.MyContract.setProvider(web3.currentProvider);

      var name = this.state.fileList[index].name;
      var url = uri;
      var hash = this.state.fileList[index].hash;

    //成功后 调用this.getFileList(this.state.pid);更新
    //   let inst = await this.MyContract.at(this.state.tookenAddress)
    //   console.log(inst)
    //   await inst.setDocument(
    //     name,
    //     uri,
    //     hash,
    //     { from: this.props.drizzleState.accounts[0] }).then(()=>{
    //       //调接口存储发行信息
    //       this.saveIssue(partition,amount,receiver)
    //     });

      return;
  }
  render(){
      return (
        <div className="onchain">
            <div className="header">
                <Header />
            </div>
            <div className="onchainBox">
                <div className="guideBox">
                    <Guide params={this.state.params}/>
                </div>
                <div className="contentBox">
                    <div className="titl">Onchain Disclosure</div>
                    <div className="onchainContent">
                        <div className="table">
                            <div className="thead">
                                <div className="td">Filename</div>
                                <div className="td">Content description</div>
                                <div className="td">Upload time</div>
                                <div className="td">Wind up time</div>
                                <div className="td"></div>
                            </div>
                            {
                                this.state.fileList.map((item,index)=>{
                                    return (
                                    <div className="tr" key={index}>
                                        <div className="td">{item.name}</div>
                                        <div className="td">{item.contentDescription}</div>
                                        <div className="td">{item.uploadTime}</div>
                                        <div className="td">2020.05.30  23:45:45</div>
                                        <div className="td">
                                            <div className="on" style={{display: item.onchain?"block":"none"}}>已上链</div>
                                            <div className="un" onClick={this.getURL.bind(this,item.id,index)} style={{display: item.onchain?"none":"block",cursor:'pointer'}}>上链</div>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <form action="" autoComplete="off">
                            <div className="uploadRow">
                                <div className="upload" >
                                    <img className="up" src={Upload} alt="上传图标"style={{display: !this.state.fileName ? "block" : "none"}}/>
                                    <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName ? "none" : "block"}}/>
                                    <input type="file" id="file1" className="upInput" ref={el=>this.file=el} onChange={this.handleChange.bind(this)}/>
                                    <div className="fileName" style={{display: !this.state.fileName ? "none" : "block"}}>{this.state.fileName}</div>
                                </div>
                                <label htmlFor="file1">Upload documents:</label>
                            </div>
                            <div className="informRow">
                                <label htmlFor="desc">File Type: </label>
                                <input type="text" id="desc" ref={el=>this.type=el} placeholder="lagal/marketting/whitepaper/token_icon/other"/>
                            </div>
                            <div className="informRow">
                                <label htmlFor="desc">Content description: </label>
                                <input type="text" id="desc" ref={el=>this.desc=el}/>
                            </div>
                        </form>
                        <div className="submit" onClick={this.fileSub}>Submit</div>
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
            <Online {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
  }