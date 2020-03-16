import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import del from "../../../assets/delete@2x (1).png"
import "./deploy.css"

export default class Deploy extends Component {
  constructor(props) {
    super(props);
    this.state = {
        index: 2,
        deployed: false
    };
    this.addToList = this.addToList.bind(this);
  }
  changeTab(index){
    this.setState({
        index: index
    })
  }
  addToList(){
      
  }
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
                    <div className="titl">Deployment contract</div>
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
                                <input type="text" id="cName"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="cSymbol">Symbol:</label>
                                <input type="text" id="cSymbol"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="cDecimal">Decimal:</label>
                                <input type="text" id="cDecimal"/>
                            </div>
                            <div className="sub">Submit</div>
                        </form>
                        <div className="table" style={{display: this.state.index == 2 ? "flex" : "none"}}>
                            <div className="thead">
                                <div className="del"></div>
                                <div className="td">Identifier</div>
                                <div className="td">Name</div>
                                <div className="td">Symbol</div>
                                <div className="td">Decimal</div>
                            </div>
                            <div className="tr">
                                <div className="del">
                                    <img src={del} alt="删除"/>
                                </div>
                                <div className="td">111222222224444444444444444111122222222444444444444444411111222222224444444444444444111</div>
                                <div className="td">2</div>
                                <div className="td">3</div>
                                <div className="td">4</div>
                            </div>
                        </div>
                        <form action="" autoComplete="off" className="partiForm" style={{display: this.state.index == 2&&!this.state.deployed ? "flex" : "none"}}>
                            <div className="partiList"></div>
                            <div className="formRow">
                                <label htmlFor="identifier">Identifier: </label>
                                <input type="text" id="identifier"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pName">Name:</label>
                                <input type="text" id="pName"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pSymbol">Symbol:</label>
                                <input type="text" id="pSymbol"/>
                            </div>
                            <div className="formRow">
                                <label htmlFor="pDecimal">Decimal:</label>
                                <input type="text" id="pDecimal"/>
                            </div>
                            <div className="add" onClick={this.addToList}>+</div>
                            <div className="sub">Submit</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
}