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
        baseURL:process.env.REACT_APP_API_ROOT,
        params:{},
        pid:"",
        fileList:[],
        tookenAddress:"",
        controllers:[]
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
      
      console.log(this.props)
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
        console.log(res.data[index])
          if(res.success){
              this.setState({
                tookenAddress:res.data[index].deployedToken.contractAddress,
                issueByPartitionOrNot:res.data[index].tokenConfig==null||res.data[index].tokenConfig.partitions==null?false:true,
                controllers:res.data[index].deployedToken.controllers
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
      url += ("?pid="+this.state.pid+"&type="+this.type.value+"&name="+this.name.value+"&content="+this.desc.value);

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
                alert("upload success")
                this.getFileList(this.state.pid);
                //返回上传时间 返回http地址准备上链 1400 更新列表 /material/retrieve_materials?pid=
                //若返回状态onchain为false点击列表中上链按钮上链
            }else{
                console.log("upload fail")
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
  async onChain(fileId,index){
    //调用文件上链合约
      var MyContract = contract(ERC1400)
      this.MyContract = MyContract;
      let web3 = this.props.drizzle.web3;
      
      this.MyContract.setProvider(web3.currentProvider);
      this.MyContract.defaults({
        from: this.props.drizzleState.accounts[0]
      });

      var name = this.state.fileList[index].name;
      var url = this.state.baseURL+"/material/material_stream_id?id="+fileId;
      var hash = this.state.fileList[index].hash;
      name = web3.utils.sha3(name);
      hash = web3.utils.sha3(hash);
      
      console.log(name,url,hash,this.state.tookenAddress)
      
      let inst = await this.MyContract.at(this.state.tookenAddress)
      // console.log(this.state.controllers)
      // await inst.setControllers(this.state.controllers).then(()=>{
      //   //调接口存储发行信息
      //   console.log("设置controller成功")
      // });
      await inst.setDocument(name,url,hash).then(()=>{
          //调接口存储发行信息
          this.onChainTime(fileId);
      });
      // await inst.controllers().then((value)=>{
      //     //调接口存储发行信息
      //     // this.onChainTime();
      //     console.log(value)
      // });
  }
  async onChainTime(fileId){
    let url = this.state.baseURL+"/material/onchain?id="+fileId;
    try {
        let response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
          if(res.success){
              alert("onchain success",res.data)
              this.getFileList(this.state.pid)
          }else{ 
              alert("onchain failed")
          }
        })
      } catch (err) {
        alert(err);
      } finally {
  
      }
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
                                        <div className="td">{item.onchainTime}</div>
                                        <div className="td">
                                            <div className="on" style={{display: item.onchain?"block":"none"}}>已上链</div>
                                            <div className="un" onClick={this.onChain.bind(this,item.id,index)} style={{display: item.onchain?"none":"block",cursor:'pointer'}}>上链</div>
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
                                <label htmlFor="desc">File Name: </label>
                                <input type="text" id="desc" ref={el=>this.name=el} />
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