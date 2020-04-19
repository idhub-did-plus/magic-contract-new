import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import select from "../../../assets/下拉@2x.png"
import arrow from "../../../assets/Group 5@2x.png"
import del from "../../../assets/delete@2x (1).png"
import "./configure.css"
import { DrizzleContext } from "@drizzle/react-plugin";

class Configure extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabIndex: 1,
        deployed: false,
        optionBoxIndex: 1,
        optionBox1: false,
        optionBox2: false,
        optionBox3: false,
        opt1: "",
        opt2: "",
        opt3: "",
        finalCondition: "",
        defaultService: "",
        and: [],
        or: []
    };
    this.Register = this.Register.bind(this);
    this.handleAddAnd = this.handleAddAnd.bind(this);
    this.handleAddOr = this.handleAddOr.bind(this);
    this.handleFinalCondition = this.handleFinalCondition.bind(this);
    this.cancelOptionBox = this.cancelOptionBox.bind(this);
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
  handleAddAnd(){
    if (!this.state.opt1 || !this.state.opt2 || !this.state.opt3) {
        alert("invalid data!")
        return
    }
    this.setState({ and: [...this.state.and, this.state.opt1 + " " + this.state.opt2 + " " + this.state.opt3] })
  }
  handleAddOr(){
    let and = this.state.and;
    let rst = "";
    for (let i = 0; i < and.length; i++) {
        if (i == 0)
            rst = and[i];
        else
            rst += (" && " + and[i]);
    }

    let or = [...this.state.or, rst + " "];
    console.log(or);
    let final = "";
    for (let i = 0; i < or.length; i++) {
        if (i == 0)
            final = or[i];
        else
            final += ("|| " + or[i]);
    }
    console.log(final)
    this.setState({ 
        or: [...this.state.or, rst + " "],
        finalCondition: final  
    })
        
    this.handleFinalCondition()
  }
  handleFinalCondition(){
    console.log("111")
  }
  Register(){
    this.contracts = this.props.drizzle.contracts;
    this.utils = this.props.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts["ComplianceServiceRegistry"].abi;
    const address = this.contracts["ComplianceServiceRegistry"].address;
    var web3 = this.props.drizzle.web3;
    var ComplianceServiceRegistry = new web3.eth.Contract(abi,address);

    var contractAddr = this.addr.innerText;
    var configuration = this.personalise.value;

    if(!this.utils.isAddress(contractAddr)){
        alert("Please deploy the contract first")
        return
    }
    if(!configuration){
        alert("Please enter configuration")
        return
    }
    if(!this.utils.isAddress(configuration)){
        alert("Please enter the address type")
        return
    }
    ComplianceServiceRegistry.methods.register(contractAddr,configuration).send({
        from: this.props.drizzleState.accounts[0],
        gas: 3000000
    }).then(function(receipt){
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        // console.log(receipt)
    });
    
  }
  componentWillMount(){
    //收起下拉框
    document.addEventListener('click', this.cancelOptionBox)
    //获取默认服务地址
    this.contracts = this.props.drizzle.contracts;
    this.utils = this.props.drizzle.web3.utils;

    // Get the contract ABI
    const abi = this.contracts["ComplianceServiceRegistry"].abi;
    const address = this.contracts["ComplianceServiceRegistry"].address;
    var web3 = this.props.drizzle.web3;
    var ComplianceServiceRegistry = new web3.eth.Contract(abi,address);
    ComplianceServiceRegistry.methods.getDefaultService().call({
        from: this.props.drizzleState.accounts[0]
    }).then((receipt)=>{
        console.log("default",receipt)
        this.setState({
            defaultService: receipt
        })
    })
  }
  componentWillUnmount() {
    //移除下拉框的事件监听
    document.removeEventListener("click", this.cancelOptionBox);
  }
  cancelOptionBox(e){
    if(e.target.className != "selIcon"){
        this.setState({
            optionBox1: false,
            optionBox2: false,
            optionBox3: false
        })
    }
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
                                <div className="td" ref={el=>this.addr=el}>0x291cC5385C302694e9B982478583c677a261B21D</div>
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
                                <div className="text">{this.state.defaultService}</div>
                            </div>
                            <div className="row">
                                <div className="label">Configuration conditions: </div>
                                <div className="text">{this.state.finalCondition}</div>
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
                                    <div className="arrow" onClick={this.handleAddAnd}>
                                        <img src={arrow} alt="向下箭头"/>
                                    </div>
                                    <div className="listBox">
                                        <ul>
                                        {
                                            this.state.and.map((e,index)=>{
                                                let remove = () => {
                                                    let n = this.state.and.slice();
                                                    n.splice(index, 1);
                
                                                    this.setState(
                                                        {
                
                                                            and: n
                                                        }
                                                    )
                                                }
                                                return(
                                                    <li key={index}>{e}<img src={del} alt="删除" onClick={remove}/></li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </div>
                                    <div className="arrow" onClick={this.handleAddOr}>
                                        <img src={arrow} alt="向下箭头"/>
                                    </div>
                                    <div className="listBox">
                                        <ul>
                                        {
                                            this.state.or.map((e,index)=>{
                                                let remove = () => {
                                                    let n = this.state.or.slice();
                                                    n.splice(index, 1);
                
                                                    this.setState(
                                                        {
                
                                                            or: n
                                                        }
                                                    )
                                                }
                                                return(
                                                    <li key={index}>{e}<img src={del} alt="删除"/></li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </div>
                                    <div className="textArea">{this.state.finalCondition}</div>
                                </div>
                            </div>
                        </div>
                        <div className="configSub" style={{display: this.state.tabIndex == 1 ? "block" : "none"}}>Submit</div>
                        <form action="" autoComplete="off" style={{display: this.state.tabIndex == 2 ? "flex" : "none"}}>
                            <div className="formRow">
                                <label htmlFor="personalise">Compliance service address: </label>
                                <input  ref={el=>this.personalise=el} type="text" id="personalise"/>
                            </div>
                            <div className="sub" onClick={this.Register}>Submit</div>
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
            <Configure {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
  }