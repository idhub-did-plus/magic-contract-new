import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { DrizzleContext } from "@drizzle/react-plugin";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import "./register.css"
import Upload from "../../../assets/上传@2x.png"
import file from "../../../assets/文件@2x.png"
import select from "../../../assets/下拉@2x.png"
import { savePID } from "../../../store/pid/actions";

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
        email: "",
        pid: null,
        baseURL:"http://13.229.205.74:2006",
        showData:[]
    };
    this.cancelOptionBox = this.cancelOptionBox.bind(this);
    this.informSubmit = this.informSubmit.bind(this);
    this.review = this.review.bind(this);
    this.projectSubmit = this.projectSubmit.bind(this);
  }
  async handle_Change(key,e){
      //file input 处理方法
      var arr = e.target.value.split("\\");
      var name = arr[arr.length-1];
      this.setState({
          [key]: name
      })
      if(key=="fileName4"){
          //存储ICON
          console.log("调接口传icon")
          var iconFormData = new FormData();
          iconFormData.append("file",e.target.files[0])
          try {
            var url = this.state.baseURL+"/material/upload_material";
            if(this.state.pid){
                url += ("?pid="+this.state.pid+"&type=icon&name=icon")
            }else{
                alert("Please submit project details first");
                return;
            }
            let response = await fetch(url, {
                body: iconFormData, 
                credentials: 'include',
                method: 'POST'
            })
            let json = response.json() // parses response to JSON
            json.then(res=>{
                if(res.success){
                    console.log("上传ICON成功")
                }else{
                    console.log("上传ICON失败")
                }
            })
        } catch (err) {
            alert(err);
        } finally {
    
        }
      }
  }
  handleSelect(index){
    //下拉框处理方法
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
    //下拉框选择处理方法
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
      console.log("willmount",this.props.match.params)
      var index = this.props.match.params.index;
      var type = this.props.match.params.type;
      //请求数据渲染
      this.showData(index,type)

      // console.log(this.props)
    //测试用，勿忘删除
    // this.props.drizzle.store.dispatch(savePID("5ed4b8910e7578139e68571c"));
    let test = this.props.drizzle.store.getState().pid;
    console.log("pid",test)
    
    //点击任意位置收起下拉框
    document.addEventListener('click', this.cancelOptionBox)
  }
    //信息展示
    async showData(index,type){
      try {
        //入库后传pid
        let url = this.state.baseURL+"/issue_project/list?status="+type;

        let response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
            if(res.success){
                console.log(type+"成功",res.data[index])
                this.setState({
                    showData:res.data[index]
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
  componentWillUnmount() {
    //组件卸载前 移除下拉框的事件监听
    document.removeEventListener("click", this.cancelOptionBox);
  }
  cancelOptionBox(e){
    //点击收起下拉框
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
    //处理react input text的onChange方法
      this.setState({
        [key]:e.target.value
      })
  }
  //存储发行人信息
  informSubmit(){

    if(!this.state.pid){
        alert("PID Not Found , Please submit project details first");
        return;
    }
    var data = new FormData();
    //生成表单数据

    //Company Information
    data.append("legalEntityName",this.state.legalPerson);
    data.append("registrationNumber",this.state.CompRegNum);
    data.append("vatRegistrationNumber",this.state.VAT);
    data.append("website",this.state.webAddr);

    //Company Address
    data.append("address[country]",this.state.country);
    data.append("address[city]",this.state.city);
    data.append("address[postalCode]",this.state.postalCode);
    data.append("address[address]",this.state.comAddr);
    data.append("address[countryOfIncorporation]",this.state.establishCountry);
    
    //Contact Person
    data.append("contactPerson[firstName]",this.state.firstName);
    data.append("contactPerson[lastName]",this.state.lastName);
    data.append("contactPerson[title]",this.state.position);
    data.append("contactPerson[phone]",this.state.phone);
    data.append("contactPerson[email]",this.state.email);

    //fromdata转jsondata
    var jsonData = {};
    data.forEach((value, key) => jsonData[key] = value);

//     输出FormData
//     for(let item of data){
//        console.log(item)
//     }
    
    //调用后端接口，传json数据
    this.saveIssuerInfo(jsonData);
  }
  async saveIssuerInfo(jsonData) {
    try {
        var url = this.state.baseURL+"/issue_project/save_issuer_information";
            if(this.state.pid){
                url += ("?pid="+this.state.pid)
            }else{
                alert("Not Found PID , Please submit project details first");
                return;
            }
      let response = await fetch(url, {
        body: JSON.stringify(jsonData), 
            credentials: 'include', //支持跨域或同源请求 可携带cookies
            headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
      let json = response.json() // parses response to JSON
      json.then(res=>{
        if(res.success){
            console.log("issInfo成功")
        }else{
            console.log("issInfo失败")
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }

  //存储项目详细信息
  //初次请求返回pid 用于后续文件、发行人信息、审核接口的传参
  projectSubmit(){
    var data = new FormData();
    //生成表单数据
    //Project details
    data.append("name",this.company.value);
    data.append("assetType",this.state.asset);
    data.append("jurisdiction",this.state.Judicial);
    var hasFinancialRegulator = this.state.financialPartners=="Yes"?true:false;
    var everRaseedFunds = this.state.raiseBefore=="Yes"?true:false;
    data.append("hasFinancialRegulator",hasFinancialRegulator);
    data.append("everRaseedFunds",everRaseedFunds);
    data.append("stepsCompleted",this.state.steps);
    data.append("plannedRasedCapital",this.mini_amount.value);
    
    //fromdata转jsondata
    var jsonData = {};
    data.forEach((value, key) => jsonData[key] = value);
    
    //调用接口存储项目信息
    this.saveProjDetails(jsonData);
  }
  async saveProjDetails(jsonData) {
    try {
      let url = this.state.baseURL+"/issue_project/save_project_detail";
      if(this.state.pid){
          url += ("?pid="+this.state.pid)
      }
      let response = await fetch(url, {
        body: JSON.stringify(jsonData),
        credentials: 'include', 
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST'
      })

      let json = response.json() 
      json.then(res=>{
        if(res.success){
            console.log("pid",res.data)
            //存返回的pid值
            this.setState({
                pid: res.data
            })
          this.props.drizzle.store.dispatch(savePID(res.data)); 
          let pid = this.props.drizzle.store.getState().pid;
          console.log("仓库取pid",pid)
        }else{
            console.log("存储项目详细信息失败")
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  //调用审核接口
  async review(){
        if(!this.state.pid){
            alert("PID Not Found , Please submit project details first");
            return;
        }
      try {
        //入库后传pid
        let url = this.state.baseURL+"/issue_project/audit"
        if(this.state.pid){
            url += ("?pid="+this.state.pid)
        }
        url += "&agree="+true;

        let response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
            if(res.success){
                console.log("audit成功")
            }else{
                console.log("audit失败")
            }
          })
      } catch (err) {
        alert(err);
      } finally {
  
      }
  }
  fileSubmit(type){
      var fileType = type;
      console.log(this.state.pid);
      console.log(type);
      if(!this.state.pid){
          alert("PID Not Found , Please submit project details first");
          return;
      }
    //生成各个文件的表单数据
    //调用三次接口上传文件
    const file1 = this.file1.files[0];
    const file2 = this.file2.files[0];
    const file3 = this.file3.files[0];
    var file1Data = new FormData();
    var file2Data = new FormData();
    var file3Data = new FormData();
    file1Data.append("file",file1);
    file2Data.append("file",file2);
    file3Data.append("file",file3);
    this.saveFile(file1Data,file2Data,file3Data,fileType);
  }
  async saveFile(file1Data,file2Data,file3Data,fileType){
    if(fileType=="lagal"){
        
        //lagal文件
        try {
            var url = this.state.baseURL+"/material/upload_material";
            if(this.state.pid){
                url += ("?pid="+this.state.pid+"&type=lagal&name=lagal&content="+this.desc1.value)
            }else{
                alert("Please submit project details first");
                return;
            }
            let response = await fetch(url, {
                body: file1Data,
                credentials: 'include',
                method: 'POST',
            })
            let json = response.json() // parses response to JSON
            json.then(res=>{
                if(res.success){
                    console.log("lagal成功")
                }else{
                    console.log("lagal失败")
                }
            })
        } catch (err) {
            alert(err);
        } finally {
    
        }
    }else if(fileType=="marketting"){
      //marketting文件
        try {
            var url = this.state.baseURL+"/material/upload_material";
            if(this.state.pid){
                url += ("?pid="+this.state.pid+"&type=marketting&name=marketting&content="+this.desc2.value)
            }else{
                alert("Please submit project details first");
                return;
            }
            let response = await fetch(url, {
                body: file2Data, 
                credentials: 'include', 
                method: 'POST'
            })
            let json = response.json() // parses response to JSON
            json.then(res=>{
                if(res.success){
                    console.log("market成功")
                }else{
                    console.log("market失败")
                }
            })
        } catch (err) {
            alert(err);
        } finally {
    
        }
    }else if(fileType == "whitepaper"){
      //whitepaper文件
        try {
            var url = this.state.baseURL+"/material/upload_material";
            if(this.state.pid){
                url += ("?pid="+this.state.pid+"&type=whitepaper文件&name=whitepaper文件&content="+this.desc3.value)
            }else{
                alert("Please submit project details first");
                return;
            }
            let response = await fetch(url, {
                body: file3Data,
                credentials: 'include',
                method: 'POST'
            })
            let json = response.json() // parses response to JSON
            json.then(res=>{
                if(res.success){
                    console.log("whitepaper成功")
                }else{
                    console.log("whitepaper失败")
                }
            })
        } catch (err) {
            alert(err);
        } finally {
    
        }
    }
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
                        <input type="text" id="company" ref={el=>this.company=el}/>
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
                </div>
                <div className="submit projSub" onClick={this.projectSubmit}>Submit</div>
                <div className="content">
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
                    <div className="fileSub" onClick={this.fileSubmit.bind(this,"lagal")}>submit</div>
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
                    <div className=" fileSub" onClick={this.fileSubmit.bind(this,"marketting")}>submit</div>
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
                    <div className="fileSub" onClick={this.fileSubmit.bind(this,"whitepaper")}>submit</div>
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
                 <div className="infoSub" onClick={this.informSubmit}>Submit</div>
                 <div className="titl">Security Token ICON</div>
                 <div className="content">
                     {/* 上传图片ICON */}
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
                 <div className="submit audit" onClick={this.review}>Review</div>
             </form>
          </div>
        </div>
    );
  }
}
// export default function Register(){
//     return (
//         <InformRegister/>
//     );
// }
export default (props) => {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          return (
            <InformRegister {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
  }