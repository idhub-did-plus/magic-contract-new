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
        steps: "",
        legalPerson: "",
        CompRegNum: "",
        VAT: "",
        webAddr: "",
        country: "",
        city: "",
        comAddr: "",
        postalCode: "",
        establishCountry: "",
        firstName: "",
        lastName: "",
        position: "",
        phone: "",
        email: ""
    };
    this.cancelOptionBox = this.cancelOptionBox.bind(this);
    this.informSubmit = this.informSubmit.bind(this);
    
  }
  handle_Change(key,e){
      var arr = e.target.value.split("\\");
      var name = arr[arr.length-1];
      this.setState({
          [key]: name
      })
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
    document.addEventListener('click', this.cancelOptionBox)
  }
  componentWillUnmount() {
    //移除下拉框的事件监听
    document.removeEventListener("click", this.cancelOptionBox);
  }
  cancelOptionBox(e){
    if(e.target.className != "selectIcon"){
        this.setState({
            optionBox1: false,
            optionBox2: false,
            optionBox3: false,
            optionBox4: false,
            optionBox5: false
        })
    }
  }
  handleChange(key,e){
      this.setState({
        [key]:e.target.value
      })
  }
  informSubmit(){
    var data = new FormData();
    //生成表单数据
    //Project details
    data.append("company",this.company.value);
    data.append("asset_type",this.state.asset);
    data.append("Judicial",this.state.Judicial);
    data.append("financial_regulator",this.state.financialPartners);
    data.append("mini_amount",this.mini_amount.value);
    data.append("raiseBefore",this.state.raiseBefore);
    data.append("steps",this.state.steps);
    const file1 = this.file1.files[0];
    const file2 = this.file2.files[0];
    const file3 = this.file3.files[0];
    data.append("file1",file1);
    data.append("file2",file2);
    data.append("file3",file3);
    data.append("desc1",this.desc1.value);
    data.append("desc2",this.desc2.value);
    data.append("desc3",this.desc3.value);

    //Company Information
    data.append("legalPerson",this.state.legalPerson);
    data.append("CompRegNum",this.state.CompRegNum);
    data.append("VAT",this.state.VAT);
    data.append("webAddr",this.state.webAddr);

    //Company Address
    data.append("country",this.state.country);
    data.append("city",this.state.city);
    data.append("comAddr",this.state.comAddr);
    data.append("postalCode",this.state.postalCode);
    data.append("establishCountry",this.state.establishCountry);

    //Contact Person
    data.append("firstName",this.state.firstName);
    data.append("lastName",this.state.lastName);
    data.append("position",this.state.position);
    data.append("phone",this.state.phone);
    data.append("email",this.state.email);

    //ICON
    const icon = this.icon.files[0];
    data.append("icon",icon);

//     for(let item of data){
//        console.log(item)
//     }
    
    //调用后端接口，传FormData数据
    
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
             <form className="contentBox" autoComplete="off" ref={el=>this.form=el}>
                 <div className="titl">Project details</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="company" defaultValue="IC" ref={el=>this.company=el}/>
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
                        <input ref={el=>this.mini_amount=el}type="text" id="amount"/>
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
                        <div className="upload">
                            <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName1 ? "block" : "none"}}/>
                            <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName1 ? "none" : "block"}}/>
                            <input ref={el=>this.file1=el} type="file" id="file1" className="upInput" onChange={this.handle_Change.bind(this,"fileName1")}/>
                            <div className="fileName" style={{display: !this.state.fileName1 ? "none" : "block"}}>{this.state.fileName1}</div>
                        </div>
                        <label htmlFor="file1">Upload legal documents:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="description1" ref={el=>this.desc1=el}/>
                        <label htmlFor="description1">Content description: </label>
                    </div>
                    <p></p>
                    {/* 上传文件2 */}
                    <div className="uploadRow">
                        <div className="upload">
                            <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName2 ? "block" : "none"}}/>
                            <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName2 ? "none" : "block"}}/>
                            <input ref={el=>this.file2=el} type="file" id="file2" className="upInput" onChange={this.handle_Change.bind(this,"fileName2")}/>
                            <div className="fileName" style={{display: !this.state.fileName2 ? "none" : "block"}}>{this.state.fileName2}</div>
                        </div>
                        <label htmlFor="file2">Upload marketing files:</label>
                    </div>
                    <p></p>
                    <div className="informRow">
                        <input type="text" id="description2" ref={el=>this.desc2=el}/>
                        <label htmlFor="description2">Content description: </label>
                    </div>
                    <p></p>
                    {/* 上传文件3 */}
                    <div className="uploadRow">
                        <div className="upload">
                            <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName3 ? "block" : "none"}}/>
                            <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName3 ? "none" : "block"}}/>
                            <input ref={el=>this.file3=el} type="file" id="file3" className="upInput" onChange={this.handle_Change.bind(this,"fileName3")}/>
                            <div className="fileName" style={{display: !this.state.fileName3 ? "none" : "block"}}>{this.state.fileName3}</div>
                        </div>
                        <label htmlFor="file3">Upload white paper:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="description3" ref={el=>this.desc3=el}/>
                        <label htmlFor="description3">Content description: </label>
                    </div>
                    <p></p>
                </div>
                 <div className="titl">Company Information</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="legalPerson" value={this.state.legalPerson} onChange={this.handleChange.bind(this,"legalPerson")}/>
                        <label htmlFor="legalPerson">Legal Entity Name: </label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="CompRegNum" value={this.state.CompRegNum} onChange={this.handleChange.bind(this,"CompRegNum")}/>
                        <label htmlFor="CompRegNum">Company Registration Number:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="VAT" value={this.state.VAT} onChange={this.handleChange.bind(this,"VAT")}/>
                        <label htmlFor="VAT">VAT Registration Number:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="webAddr" value={this.state.webAddr} onChange={this.handleChange.bind(this,"webAddr")}/>
                        <label htmlFor="webAddr">Website address:</label>
                    </div>
                 </div>
                 <div className="titl">Company Address</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="country" value={this.state.country} onChange={this.handleChange.bind(this,"country")}/>
                        <label htmlFor="country">Country:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="city" value={this.state.city} onChange={this.handleChange.bind(this,"city")}/>
                        <label htmlFor="city">City:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="comAddr" value={this.state.comAddr} onChange={this.handleChange.bind(this,"comAddr")}/>
                        <label htmlFor="comAddr">Address:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="postalCode" value={this.state.postalCode} onChange={this.handleChange.bind(this,"postalCode")}/>
                        <label htmlFor="postalCode">Postal Code:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="establishCountry" value={this.state.establishCountry} onChange={this.handleChange.bind(this,"establishCountry")}/>
                        <label htmlFor="establishCountry">Country of Incorporation:</label>
                    </div>
                 </div>
                 <div className="titl">Contact Person</div>
                 <div className="content">
                    <div className="informRow">
                        <input type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange.bind(this,"firstName")}/>
                        <label htmlFor="firstName">Contact Person‘s First Name: </label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange.bind(this,"lastName")}/>
                        <label htmlFor="lastName">Contact Person‘s Last Name:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="position" value={this.state.position} onChange={this.handleChange.bind(this,"position")}/>
                        <label htmlFor="position">Contact Person‘s Title/Position:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="phone" value={this.state.phone} onChange={this.handleChange.bind(this,"phone")}/>
                        <label htmlFor="phone">Contact Person‘s Phone:</label>
                    </div>
                    <div className="informRow">
                        <input type="text" id="email" value={this.state.email} onChange={this.handleChange.bind(this,"email")}/>
                        <label htmlFor="email">Contact Person‘s Email:</label>
                    </div>
                 </div>
                 <div className="titl">Security Token ICON</div>
                 <div className="content">
                     {/* 上传图片 */}
                     <div className="uploadRow">
                        <div className="upload">
                            <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName4 ? "block" : "none"}}/>
                            <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName4 ? "none" : "block"}}/>
                            <input ref={el=>this.icon=el} type="file" id="file4" className="upInput" onChange={this.handle_Change.bind(this,"fileName4")}/>
                            <div className="fileName" style={{display: !this.state.fileName4 ? "none" : "block"}}>{this.state.fileName4}</div>
                        </div>
                        <label htmlFor="file4">Upload ICON:</label>
                    </div>
                 </div>
                 <div className="submit" onClick={this.informSubmit}>Submit</div>
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