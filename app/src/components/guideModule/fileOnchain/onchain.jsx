import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../common/guideHeader"
import Guide from "../../common/guideMenu"
import Upload from "../../../assets/上传@2x.png"
import file from "../../../assets/文件@2x.png"
import "./onchain.css"

export default class Online extends Component {
  constructor(props) {
    super(props);
    this.state = {
        onchain: true,
        fileName: ""
    };
  }
  handleChange(e){
    var arr = e.target.value.split("\\");
    var name = arr[arr.length-1];
    this.setState({
        fileName: name
    })
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
                    <Guide/>
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
                                <div className="td">11122222222444444444444444411</div>
                                <div className="td">2222222222222222222222222</div>
                                <div className="td">2020.01.12  12:24:33</div>
                                <div className="td">2020.12.30  23:45:45</div>
                                <div className="td">
                                    <div className="on" style={{display: this.state.onchain?"block":"none"}}>已上链</div>
                                    <div className="un" style={{display: this.state.onchain?"none":"block",cursor:'pointer'}}>上链</div>
                                </div>
                            </div>
                            <div className="tr">
                                <div className="td">11122222222444444444444444411</div>
                                <div className="td">2222222222222222222222222</div>
                                <div className="td">2020.01.12  12:24:33</div>
                                <div className="td">2020.12.30  23:45:45</div>
                                <div className="td">
                                    <div className="on" style={{display: this.state.onchain?"block":"none"}}>已上链</div>
                                    <div className="un" style={{display: this.state.onchain?"none":"block",cursor:'pointer'}}>上链</div>
                                </div>
                            </div>
                        </div>
                        <form action="" autoComplete="off">
                            <div className="informRow">
                                <label htmlFor="desc">Content description: </label>
                                <input type="text" id="desc"/>
                            </div>
                            <div className="uploadRow">
                                <div className="upload" style={{display: !this.state.fileName ? "block" : "none"}}>
                                    <img className="up" src={Upload} alt="上传图标"/>
                                    <input type="file" id="file1" className="upInput" onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="uploaded" style={{display: !this.state.fileName ? "none" : "block"}}>
                                    <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName ? "none" : "block"}}/>
                                    <input type="file" id="file1" className="upInput" onChange={this.handleChange.bind(this)}/>
                                    <div className="fileName" style={{display: !this.state.fileName ? "none" : "block"}}>{this.state.fileName}</div>
                                </div>
                                <label htmlFor="file1">Upload legal documents:</label>
                            </div>
                        </form>
                        <div className="submit">Submit</div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
}