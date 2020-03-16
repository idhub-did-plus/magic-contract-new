import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import "./register.css"
import Upload from "../../../assets/上传@2x.png"
import file from "../../../assets/文件@2x.png"
import select from "../../../assets/下拉@2x.png"

class InformRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fileName1: "",
        fileName2: "",
        fileName3: "",
        fileName4: "",
        optionBoxIndex: 1,
        optionBox1: false,
        optionBox2: false,
        optionBox3: false,
        optionBox4: false,
        optionBox5: false,
        asset: "",
        Judicial: "",
        financialPartners: "",
        raiseBefore: "",
        steps: ""

    };
    
  }
  handleChange(index,e){
      var arr = e.target.value.split("\\");
      var name = arr[arr.length-1];
      console.log(index,name)
      if(index == 1){
          this.setState({
            fileName1: name
          })
      }else if(index == 2){
          this.setState({
            fileName2: name
          })
      }else if(index == 3){
          this.setState({
            fileName3: name
          })
      }else if(index == 4){
          this.setState({
            fileName4: name
          })
      }
  }
  handleSelect(index){
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
    }else if(index == 4){
        this.setState({
            optionBox4: !this.state.optionBox4
        })
    }else if(index == 5){
        this.setState({
            optionBox5: !this.state.optionBox5
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
            asset: e.target.innerHTML,
        })
    }else if(index == 2){
        this.setState({
            Judicial: e.target.innerHTML,
        })
    }else if(index == 3){
        this.setState({
            financialPartners: e.target.innerHTML,
        })
    }else if(index == 4){
        this.setState({
            raiseBefore: e.target.innerHTML,
        })
    }else if(index == 5){
        this.setState({
            steps: e.target.innerHTML,
        })
    }
  }
  componentWillMount(){
    //收起下拉框
    document.addEventListener('click',(e) => {
        if(e.target.className != "selectIcon"){
            this.setState({
                optionBox1: false,
                optionBox2: false,
                optionBox3: false,
                optionBox4: false,
                optionBox5: false
            })
        }
    })
  }
  render(){
      const Asset = ["产权","债务","债券","艺术","房地产","基金","其他"];
      const Judicial = ["美国","加拿大","亚洲","欧洲","澳大利亚","拉丁美洲","非洲","其他"];
      const Partners = ["Yes","No"];
      const RaiseBefore = ["Yes","No"];
      const Steps = ["聘请证券律师","筹款的最终条款","准备了法律文件","准备了营销文件"];
      return (
        <div className="register">
          <div className="navig">
            <Header/>
          </div>
          <div className="informBox">
             <div className="guideBox">
                 <Guide/>
             </div>
             <form className="contentBox" autoComplete="off">
                 <div className="titl">Project details</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="company" defaultValue="IC"/>
                        <label htmlFor="company">Company Name: </label>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <div className="select">
                            <input type="text" id="asset" value={this.state.asset} readOnly/>
                            <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,1)} className="selectIcon"/>
                            <label htmlFor="asset">Tokenized Asset Type: </label>
                        </div>
                        <ul className="optionBox" style={{display: this.state.optionBox1 ? "block" : "none"}}>
                            {
                                 Asset.map((item,index)=>{
                                    return(
                                        <li key={index} className="option" onClick={this.option.bind(this,1)}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <div className="select">
                            <input type="text" id="Jurisdiction" value={this.state.Judicial} readOnly/>
                            <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,2)} className="selectIcon"/>
                            <label htmlFor="Jurisdiction">Jurisdiction of company establishment: </label>
                        </div>
                        <ul className="optionBox" style={{display: this.state.optionBox2 ? "block" : "none"}}>
                        {
                                 Judicial.map((item,index)=>{
                                    return(
                                        <li key={index} className="option" onClick={this.option.bind(this,2)}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <div className="select">
                            <input type="text" id="financialPartners" value={this.state.financialPartners} readOnly/>
                            <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,3)} className="selectIcon"/>
                            <label htmlFor="financialPartners">Are you working with a financial regulator?</label>
                        </div>
                        <ul className="optionBox" style={{display: this.state.optionBox3 ? "block" : "none"}}>
                        {
                                 Partners.map((item,index)=>{
                                    return(
                                        <li key={index} className="option" onClick={this.option.bind(this,3)}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <input type="text" id="amount"/>
                        <label htmlFor="amount">What is the minimum amount of capital you plan to raise？</label>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <div className="select">
                            <input type="text" id="raiseBefore" value={this.state.raiseBefore} readOnly/>
                            <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,4)} className="selectIcon"/>
                            <label htmlFor="raiseBefore">Have you raised funds before？</label>
                        </div>
                        <ul className="optionBox" style={{display: this.state.optionBox4 ? "block" : "none"}}>
                        {
                                 RaiseBefore.map((item,index)=>{
                                    return(
                                        <li key={index} className="option" onClick={this.option.bind(this,4)}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <div className="select">
                            <input type="text" id="steps" value={this.state.steps} readOnly/>
                            <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,5)} className="selectIcon"/>
                            <label htmlFor="steps">Which of the following steps have you completed to raise money？</label>
                        </div>
                        <ul className="optionBox" style={{display: this.state.optionBox5 ? "block" : "none"}}>
                        {
                                 Steps.map((item,index)=>{
                                    return(
                                        <li key={index} className="option" onClick={this.option.bind(this,5)}>{item}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <p></p>
                    {/* 上传文件1 */}
                    <div className="uploadRow">
                        <div className="upload" style={{display: !this.state.fileName1 ? "block" : "none"}}>
                            <img className="up" src={Upload} alt="上传图标"/>
                            <input type="file" id="file1" className="upInput" onChange={this.handleChange.bind(this,1)}/>
                        </div>
                        <div className="uploaded" style={{display: !this.state.fileName1 ? "none" : "block"}}>
                            <img className="file" src={file} alt="已上传图标"/>
                            <input type="file" id="file1" className="upInput" onChange={this.handleChange.bind(this,1)}/>
                            <div className="fileName">{this.state.fileName1}</div>
                        </div>
                        <label htmlFor="file1">Upload legal documents:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="description1"/>
                        <label htmlFor="description1">Content description: </label>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <input type="text" id="description2"/>
                        <label htmlFor="description2">Content description: </label>
                    </div>
                    <p></p>
                    {/* 上传文件2 */}
                    <div className="uploadRow">
                        <div className="upload" style={{display: !this.state.fileName2 ? "block" : "none"}}>
                            <img className="up" src={Upload} alt="上传图标"/>
                            <input type="file" id="file2" className="upInput" onChange={this.handleChange.bind(this,2)}/>
                        </div>
                        <div className="uploaded" style={{display: !this.state.fileName2 ? "none" : "block"}}>
                            <img className="file" src={file} alt="已上传图标"/>
                            <input type="file" id="file2" className="upInput" onChange={this.handleChange.bind(this,2)}/>
                            <div className="fileName">{this.state.fileName2}</div>
                        </div>
                        <label htmlFor="file2">Upload marketing files:</label>
                    </div>
                    {/* 上传文件3 */}
                    <div className="uploadRow">
                        <div className="upload" style={{display: !this.state.fileName3 ? "block" : "none"}}>
                            <img className="up" src={Upload} alt="上传图标"/>
                            <input type="file" id="file3" className="upInput" onChange={this.handleChange.bind(this,3)}/>
                        </div>
                        <div className="uploaded" style={{display: !this.state.fileName3 ? "none" : "block"}}>
                            <img className="file" src={file} alt="已上传图标"/>
                            <input type="file" id="file3" className="upInput" onChange={this.handleChange.bind(this,3)}/>
                            <div className="fileName">{this.state.fileName3}</div>
                        </div>
                        <label htmlFor="file3">Upload white paper:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="description3"/>
                        <label htmlFor="description3">Content description: </label>
                    </div>
                    <p></p>
                </div>
                 <div className="titl">Company Information</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="legalPerson"/>
                        <label htmlFor="legalPerson">Legal Entity Name: </label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="CompRegNum"/>
                        <label htmlFor="CompRegNum">Company Registration Number:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="VAT"/>
                        <label htmlFor="VAT">VAT Registration Number:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="webAddr"/>
                        <label htmlFor="webAddr">Website address:</label>
                    </div>
                 </div>
                 <div className="titl">Company Address</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="country"/>
                        <label htmlFor="country">Country:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="city"/>
                        <label htmlFor="city">City:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="comAddr"/>
                        <label htmlFor="comAddr">Address:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="postalCode"/>
                        <label htmlFor="postalCode">Postal Code:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="establishCountry"/>
                        <label htmlFor="establishCountry">Country of Incorporation:</label>
                    </div>
                 </div>
                 <div className="titl">Contact Person</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="firstName"/>
                        <label htmlFor="firstName">Contact Person‘s First Name: </label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="lastName"/>
                        <label htmlFor="lastName">Contact Person‘s Last Name:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="position"/>
                        <label htmlFor="position">Contact Person‘s Title/Position:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="phone"/>
                        <label htmlFor="phone">Contact Person‘s Phone:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="email"/>
                        <label htmlFor="email">Contact Person‘s Email:</label>
                    </div>
                 </div>
                 <div className="titl">Security Token ICON</div>
                 <div className="content">
                     {/* 上传文件3 */}
                     <div className="uploadRow">
                        <div className="upload" style={{display: !this.state.fileName4 ? "block" : "none"}}>
                            <img className="up" src={Upload} alt="上传图标"/>
                            <input type="file" id="file4" className="upInput" onChange={this.handleChange.bind(this,4)}/>
                        </div>
                        <div className="uploaded" style={{display: !this.state.fileName4 ? "none" : "block"}}>
                            <img className="file" src={file} alt="已上传图标"/>
                            <input type="file" id="file4" className="upInput" onChange={this.handleChange.bind(this,4)}/>
                            <div className="fileName">{this.state.fileName4}</div>
                        </div>
                        <label htmlFor="file4">Upload ICON:</label>
                    </div>
                 </div>
                 <div className="submit">Submit</div>
                 <div className="submit">Review</div>
             </form>
          </div>
        </div>
    );
  }
}
export default function Register(){
    return (
        <InformRegister/>
    );
}