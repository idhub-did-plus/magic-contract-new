import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import select from "../../../assets/下拉@2x.png"
import arrow from "../../../assets/Group 5@2x.png"
import del from "../../../assets/delete@2x (1).png"
import "./configure.css"

export default class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabIndex: 2,
        deployed: false,
        optionBoxIndex: 1,
        optionBox1: false,
        optionBox2: false,
        optionBox3: false,
        opt1: "",
        opt2: "",
        opt3: ""
    };
  }
  changeTab(index){
    this.setState({
        tabIndex: index
    })
  }
  select(index){
    if(index == 1){
        this.setState({
            optionBox1: !this.state.optionBox1
        })
    }else if(index == 2){
        this.setState({
            optionBox2: !this.state.optionBox2
        })
    }else if(index == 3){
        this.setState({
            optionBox3: !this.state.optionBox3
        })
    }
  }
  option(index,e){
    this.setState({
       optionBox1: false,
       optionBox2: false,
       optionBox3: false,
       optionBox4: false,
       optionBox5: false
    })
    if(index == 1){
      this.setState({
          opt1: e.target.innerHTML,
      })
  }else if(index == 2){
      this.setState({
          opt2: e.target.innerHTML,
      })
  }else if(index == 3){
      this.setState({
          opt3: e.target.innerHTML,
      })
  }
}
  componentWillMount(){
    //收起下拉框
    document.addEventListener('click',(e) => {
        if(e.target.className != "selIcon"){
            this.setState({
                optionBox1: false,
                optionBox2: false,
                optionBox3: false
            })
        }
    })
  }
  render(){
      return (
        <div className="configure">
            <div className="header">
                <Header />
            </div>
            <div className="deployBox">
                <div className="guideBox">
                    <Guide/>
                </div>
                <div className="configureContentBox">
                    <div className="titl">Compliance configuration</div>
                    <div className="section">
                        <div className="table">
                            <div className="tr">
                                <div className="td">Token address: </div>
                                <div className="td">0X4c000E507bE6663e264a1A21507a69Bfa5035D95</div>
                            </div>
                        </div>
                        <div className="configureTabBox">
                            <div className="defaultService" onClick={this.changeTab.bind(this,1)}>
                                <div className="unCheck">
                                    <div className="check" style={{display: this.state.tabIndex == 1 ? "block" : "none"}}></div>
                                </div>
                                <div className="tab">Default service address</div>
                            </div>
                            <div className="personalise" onClick={this.changeTab.bind(this,2)}>
                                <div className="unCheck">
                                    <div className="check" style={{display: this.state.tabIndex == 2 ? "block" : "none"}}></div>
                                </div>
                                <div className="tab">Compliance Service Address</div>
                            </div>
                        </div>
                        <div className="configureContent" style={{display: this.state.tabIndex == 1 ? "block" : "none"}}>
                            <div className="row">
                                <div className="label">Default service address: </div>
                                <div className="text">0xdcD304E70b36F7cB0f615aC82F01A62A1eAFD9Be</div>
                            </div>
                            <div className="row">
                                <div className="label">Configuration conditions: </div>
                                <div className="text">country==US</div>
                            </div>
                            <div className="row">
                                <div className="label condition">Boolean condition: </div>
                                <div className="text">
                                    <div className="selectBox">
                                        <div className="selBox">
                                            <div className="select">
                                                <div className="showOpt">{this.state.opt1}</div>
                                                <img src={select} alt="下拉按钮" className="selIcon" onClick={this.select.bind(this,1)}/>
                                            </div>
                                            <div className="option" style={{display: this.state.optionBox1 ? "block" : "none"}}>
                                                <div className="opt" onClick={this.option.bind(this,1)}>residence</div>
                                                <div className="opt" onClick={this.option.bind(this,1)}>nationality</div>
                                            </div>
                                        </div>
                                        <div className="selBox">
                                            <div className="select">
                                                <div className="showOpt">{this.state.opt2}</div>
                                                <img src={select} alt="下拉按钮" className="selIcon" onClick={this.select.bind(this,2)}/>
                                            </div>
                                            <div className="option" style={{display: this.state.optionBox2 ? "block" : "none"}}>
                                                <div className="opt" onClick={this.option.bind(this,2)}>==</div>
                                                <div className="opt" onClick={this.option.bind(this,2)}>!=</div>
                                            </div>
                                        </div>
                                        <div className="selBox">
                                            <div className="select">
                                                <div className="showOpt">{this.state.opt3}</div>
                                                <img src={select} alt="下拉按钮" className="selIcon" onClick={this.select.bind(this,3)}/>
                                            </div>
                                            <div className="option" style={{display: this.state.optionBox3 ? "block" : "none"}}>
                                                <div className="opt" onClick={this.option.bind(this,3)}>stCompliance-0.0.1-US</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="arrow">
                                        <img src={arrow} alt="向下箭头"/>
                                    </div>
                                    <div className="listBox">
                                        <ul>
                                            <li>country == USA<img src={del} alt=""/></li>
                                            <li>country == USA<img src={del} alt=""/></li>
                                            <li>country == USA<img src={del} alt=""/></li>
                                            <li>country == USA<img src={del} alt=""/></li>
                                        </ul>
                                    </div>
                                    <div className="arrow">
                                        <img src={arrow} alt="向下箭头"/>
                                    </div>
                                    <div className="listBox">
                                        <ul>
                                            <li>country == USA || country == USA<img src={del} alt=""/></li>
                                            <li>country == USA || country == USA<img src={del} alt=""/></li>
                                            <li>country == USA || country == USA<img src={del} alt=""/></li>
                                        </ul>
                                    </div>
                                    <div className="textArea">(country == USA || country == USA)&&(country == USA || country == USA)&&(country == USA || country == USA)</div>
                                </div>
                            </div>
                        </div>
                        <div className="configSub" style={{display: this.state.tabIndex == 1 ? "block" : "none"}}>Submit</div>
                        <form action="" autoComplete="off" style={{display: this.state.tabIndex == 2 ? "flex" : "none"}}>
                            <div className="formRow">
                                <label htmlFor="personalise">Compliance service address: </label>
                                <input type="text" id="personalise"/>
                            </div>
                            <div className="sub">Submit</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
}