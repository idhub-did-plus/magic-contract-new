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
        params:{}
    };
    this.fileSub = this.fileSub.bind(this);
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
    //调用文件存储方法
    this.fileSub(e);
  }
  async fileSub(event){

      let url = this.state.baseURL+"/material/upload_material";
      url += ("?content="+this.desc.value);

      var formData = new FormData();
      var file = event.target.files[0];
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
  async getFileList(){
     //请求文件列表数据
     let url = this.state.baseURL+"/material/retrieve_materials"
     //拼接pid
  }
  async onChain(){
      //接收index
      //调用上链合约
      //调用成功后调接口更新列表信息
      //调用发行合约 
      var MyContract = contract(ERC1400)
      this.utils = this.props.drizzle.web3.utils;
      this.MyContract = MyContract;
      let web3 = this.props.drizzle.web3;
      this.MyContract.setProvider(web3.currentProvider);

    //   name = web3.utils.sha3(name)
    //   uri = uri
    //   hash = document hash
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
      const Asset = ["11111111111","222222222","33333333333333"];
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
                            <div className="tr">
                                <div className="td">whitepaper</div>
                                <div className="td">whitepaper desc</div>
                                <div className="td">2020.05.30  12:24:33</div>
                                <div className="td">2020.05.30  23:45:45</div>
                                <div className="td">
                                    <div className="on" style={{display: this.state.onchain?"block":"none"}}>已上链</div>
                                    <div className="un" onClick={this.onChain.bind(this)} style={{display: this.state.onchain?"none":"block",cursor:'pointer'}}>上链</div>
                                </div>
                            </div>
                            <div className="tr">
                                <div className="td">legal</div>
                                <div className="td">legal desc</div>
                                <div className="td">2020.05.29  12:24:33</div>
                                <div className="td">2020.05.29 23:45:45</div>
                                <div className="td">
                                    <div className="on" style={{display: this.state.onchain?"block":"none"}}>已上链</div>
                                    <div className="un" style={{display: this.state.onchain?"none":"block",cursor:'pointer'}}>上链</div>
                                </div>
                            </div>
                        </div>
                        <form action="" autoComplete="off">
                            <div className="uploadRow">
                                <div className="upload" >
                                    <img className="up" src={Upload} alt="上传图标"style={{display: !this.state.fileName ? "block" : "none"}}/>
                                    <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName ? "none" : "block"}}/>
                                    <input type="file" id="file1" className="upInput" onChange={this.handleChange.bind(this)}/>
                                    <div className="fileName" style={{display: !this.state.fileName ? "none" : "block"}}>{this.state.fileName}</div>
                                </div>
                                <label htmlFor="file1">Upload documents:</label>
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