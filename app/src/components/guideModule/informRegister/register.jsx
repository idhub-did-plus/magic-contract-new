import React, { Component } from "react";
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
        desc1:"",
        desc2:"",
        desc3:"",
        optionBoxIndex: 1,
        optionBox1: false,
        optionBox2: false,
        optionBox3: false,
        optionBox4: false,
        optionBox5: false,
        companyName:"",
        asset: "",
        Judicial: "",
        financialPartners: "",
        plannedRasedCapital:"",
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
        pid: "",
        baseURL:process.env.REACT_APP_API_ROOT,
        showData:[],
        type:"",
        params:{},
        fileList:[],
        claim: window.localStorage["claim"],
        comment:""
    };
    this.cancelOptionBox = this.cancelOptionBox.bind(this);
    this.informSubmit = this.informSubmit.bind(this);
    this.projectSubmit = this.projectSubmit.bind(this);
    this.readyFor =  this.readyFor.bind(this);
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
                    alert("upload success")
                }else{
                    alert("upload failed")
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
      var index = this.props.match.params.index;
      var type = this.props.match.params.type;
      var pid = this.props.match.params.pid;
      this.setState({
          type:type
      })
      if(type != "new"){
        this.setState({
            pid:pid,
            params:{
                index:index,
                type:type,
                pid:pid
            }
        })
        
        this.props.drizzle.store.dispatch(savePID(pid)); 
        
          //请求数据渲染
        this.showData(index,type)
        this.getFile(pid);
      }else{
        this.setState({
            params:{
                type:"new"
            }
        })
      }
    
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
                // console.log(res.data[index])
                this.setState({
                    showData:res.data[index]
                })
                
                    this.setState({
                        companyName:res.data[index].projectDetail.name,
                        asset: res.data[index].projectDetail.assetType,
                        Judicial: res.data[index].projectDetail.jurisdiction,
                        financialPartners: res.data[index].projectDetail.hasFinancialRegulator==true?"Yes":"No",
                        plannedRasedCapital: res.data[index].projectDetail.plannedRasedCapital,
                        raiseBefore: res.data[index].projectDetail.everRaseedFunds==true?"Yes":"No",
                        steps: res.data[index].projectDetail.stepsCompleted,
                        legalPerson: res.data[index].issuerInformation.legalEntityName,
                        CompRegNum:res.data[index].issuerInformation.registrationNumber,
                        VAT:res.data[index].issuerInformation.vatRegistrationNumber,
                        webAddr:res.data[index].issuerInformation.website,
                        country:res.data[index].issuerInformation.address.country,
                        city:res.data[index].issuerInformation.address.city,
                        comAddr:res.data[index].issuerInformation.address.address,
                        postalCode:res.data[index].issuerInformation.address.postalCode,
                        establishCountry:res.data[index].issuerInformation.address.countryOfIncorporation,
                        firstName:res.data[index].issuerInformation.contactPerson.firstName,
                        lastName:res.data[index].issuerInformation.contactPerson.lastName,
                        position:res.data[index].issuerInformation.contactPerson.title,
                        phone:res.data[index].issuerInformation.contactPerson.phone,
                        email:res.data[index].issuerInformation.contactPerson.email
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
   //获取文件
   async getFile(pid){
    try {
      //入库后传pid
      let url = this.state.baseURL+"/material/retrieve_materials?pid="+pid;

      let response = await fetch(url, {
        credentials: 'include',
        method: 'GET'
      })
      let json = response.json() // parses response to JSON
      json.then(res=>{
          if(res.success){
            //   console.log("文件成功",res.data)
              this.setState({
                fileList:res.data
              })
              this.state.fileList.map((item)=>{
                if(item.type=="lagal"){
                    this.setState({
                      fileName1: item.name,
                      desc1:item.contentDescription
                    })
                }
                if(item.type=="whitepaper文件"){
                  this.setState({
                      fileName3: item.name,
                      desc3:item.contentDescription
                    })
                }
                if(item.type=="marketting"){
                  this.setState({
                      fileName2: item.name,
                      desc2:item.contentDescription
                    })
                }
            })
          }else{
              console.log("文件失败")
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

    var jsonData = {
        legalEntityName: this.state.legalPerson,
        registrationNumber: this.state.CompRegNum,
        vatRegistrationNumber: this.state.VAT,
        website: this.state.webAddr,
        address:{
            country: this.state.country,
            city: this.state.city,
            postalCode: this.state.postalCode,
            address: this.state.comAddr,
            countryOfIncorporation: this.state.establishCountry
        },
        contactPerson:{
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            title: this.state.position,
            phone: this.state.phone,
            email: this.state.email,
        }
    }

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
                alert("pid not found , Please submit project details first");
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
            alert("submit sucessful")
        }else{
            alert("submit failed")
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
    data.append("name",this.state.companyName);
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
            alert("submit sucessful")
            console.log("pid",res.data)
            //存返回的pid值
            this.setState({
                pid: res.data
            })
          this.props.drizzle.store.dispatch(savePID(res.data)); 
          let pid = this.props.drizzle.store.getState().pid;
          console.log("仓库取pid",pid)
        }else{
            alert("submit failed")
        }
      })
    } catch (err) {
      alert(err);
    } finally {

    }
  }
  //调用准备审核接口
  async readyFor(){
    if(!this.state.pid){
        alert("PID Not Found , Please submit project details first");
        return;
    }
  try {
    //入库后传pid
    let url = this.state.baseURL+"/issue_project/submit_to_audit"
    if(this.state.pid){
        url += ("?pid="+this.state.pid)
    }

    let response = await fetch(url, {
      credentials: 'include',
      method: 'GET'
    })
    let json = response.json() // parses response to JSON
    json.then(res=>{
        if(res.success){
            alert("submit successful!")
            this.props.history.push({pathname:"/"})
        }else{
            console.log("submit failed")
        }
      })
  } catch (err) {
    alert(err);
  } finally {

  }
}
  //调用审核接口
  async review(boolean){
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
        url += "&agree="+boolean+"&comment="+this.state.comment;
        console.log(url);
        let response = await fetch(url, {
          credentials: 'include',
          method: 'GET'
        })
        let json = response.json() // parses response to JSON
        json.then(res=>{
            if(res.success){
                alert("audit successful!")
                this.props.history.push({pathname:"/"})
            }else{
                alert("audit failed")
            }
          })
      } catch (err) {
        alert(err);
      } finally {
  
      }
  }
  fileSubmit(type){
      var fileType = type;
      if(!this.state.pid){
          alert("pid not found , Please submit project details first");
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
                    alert("Upload successful")
                }else{
                    alert("upload failed")
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
                    alert("Upload successful")
                }else{
                    alert("upload failed")
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
                    alert("Upload successful")
                }else{
                    alert("upload failed")
                }
            })
        } catch (err) {
            alert(err);
        } finally {
    
        }
    }
  }
  render(){
    //   const Asset = ["产权","债务","债券","艺术","房地产","基金","其他"];
    //   const Judicial = ["美国","加拿大","亚洲","欧洲","澳大利亚","拉丁美洲","非洲","其他"];
    //   const Partners = ["Yes","No"];
    //   const RaiseBefore = ["Yes","No"];
    //   const Steps = ["聘请证券律师","筹款的最终条款","准备了法律文件","准备了营销文件"];
    
    const Asset = ["property","debt","Bond","art","real estate","fund","other"];
    const Judicial = ["USA","Canada","Asia","Europe","Australia","Latin America","Africa","other"];
    const Partners = ["Yes","No"];
    const RaiseBefore = ["Yes","No"];
    const Steps = ["Hire Securities lawyer","Fundraising final terms","Prepared legal documents","Prepared marketing documents"];
    
    return (
        <div className="register">
          <div className="navig">
            <Header/>
          </div>
          <div className="informBox">
             <div className="guideBox">
                 <Guide params={this.state.params}/>
             </div>
             <form className="contentBox" autoComplete="off" ref={el=>this.form=el}>
                 <div className="titl">Project details</div>
                 <div>
                 {
                     this.state.type=="new"&&this.state.claim=="BD"?(
                        // 新建入口进入
                        <div>
                            <div className="content">
                                <div className="informRow">
                                    <input type="text" id="company" ref={el=>this.company=el} value={this.state.companyName} onChange={this.handleChange.bind(this,"companyName")}/>
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
                                    <input ref={el=>this.mini_amount=el}type="text" id="amount" value={this.state.plannedRasedCapital} onChange={this.handleChange.bind(this,"plannedRasedCapital")}/>
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
                            <div className="submit projSub" onClick={this.projectSubmit.bind(this)}>Submit</div>
                        </div>
                     ):(
                        //从列表点击进入
                        this.state.showData.length != "0"&&(this.state.type=="deployed"||this.state.type=="audit_passed"||this.state.type=="ready_for_audit")?(
                            //只做展示 不可编辑
                            <div>
                                <div className="content">
                                    <p></p>
                                    <div className="informRow">
                                        <input type="text" id="company" value={this.state.companyName||''} readOnly/>
                                        <label htmlFor="company">Company Name: </label>
                                    </div>
                                    <p></p>
                                    <div className="informRow">
                                        <div className="select">
                                            <input type="text" id="asset" value={this.state.showData.projectDetail.assetType} readOnly/>
                                            {/* <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,1)} className="selectIcon"/> */}
                                            <label htmlFor="asset">Tokenized Asset Type: </label>
                                        </div>
                                    </div>
                                    <p></p>
                                    <div className="informRow">
                                        <div className="select">
                                            <input type="text" id="Jurisdiction" value={this.state.showData.projectDetail.jurisdiction} readOnly/>
                                            {/* <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,2)} className="selectIcon"/> */}
                                            <label htmlFor="Jurisdiction">Jurisdiction of company establishment: </label>
                                        </div>
                                    </div>
                                    <p></p>
                                    <div className="informRow">
                                        <div className="select">
                                            <input type="text" id="financialPartners" value={this.state.showData.projectDetail.hasFinancialRegulator===true?"Yes":"No"} readOnly/>
                                            {/* <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,3)} className="selectIcon"/> */}
                                            <label htmlFor="financialPartners">Are you working with a financial regulator?</label>
                                        </div>
                                    </div>
                                    <p></p>
                                    <div className="informRow">
                                        <input type="text" id="amount" value={this.state.showData.projectDetail.plannedRasedCapital} readOnly/>
                                        <label htmlFor="amount">What is the minimum amount of capital you plan to raise？</label>
                                    </div>
                                    <p></p>
                                    <div className="informRow">
                                        <div className="select">
                                            <input type="text" id="raiseBefore" value={this.state.showData.projectDetail.everRaseedFunds==true?"Yes":"No"} readOnly/>
                                            {/* <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,4)} className="selectIcon"/> */}
                                            <label htmlFor="raiseBefore">Have you raised funds before？</label>
                                        </div>
                                    </div>
                                    <p></p>
                                    <div className="informRow">
                                        <div className="select">
                                            <input type="text" id="steps" value={this.state.showData.projectDetail.stepsCompleted} readOnly/>
                                            {/* <img src={select} alt="下拉按钮" onClick={this.handleSelect.bind(this,5)} className="selectIcon"/> */}
                                            <label htmlFor="steps">Which of the following steps have you completed to raise money？</label>
                                        </div>
                                    </div>
                                    <p></p>
                                </div>
                                <div className="submit projSub" onClick={this.projectSubmit.bind(this)} style={{display: this.state.type=="editing"?"block":"none"}}>Submit</div>
                            </div>
                        ):(
                            //状态为editing 做展示 且可编辑
                            this.state.showData.length != "0"&&this.state.type=="editing"&&this.state.claim=="BD"?(
                                <div>
                                    <div className="content">
                                        <p></p>
                                        <div className="informRow">
                                            <input type="text" id="company" value={this.state.companyName||''} onChange={this.handleChange.bind(this,"companyName")}/>
                                            <label htmlFor="company">Company Name: </label>
                                        </div>
                                        <p></p>
                                        <div className="informRow">
                                            <div className="select">
                                                <input type="text" id="asset" value={this.state.asset||''} readOnly/>
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
                                                <input type="text" id="Jurisdiction" value={this.state.Judicial||''} readOnly/>
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
                                                <input type="text" id="financialPartners" value={this.state.financialPartners||''} readOnly/>
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
                                            <input ref={el=>this.mini_amount=el} type="text" id="amount" value={this.state.plannedRasedCapital||''} onChange={this.handleChange.bind(this,"plannedRasedCapital")}/>
                                            <label htmlFor="amount">What is the minimum amount of capital you plan to raise？</label>
                                        </div>
                                        <p></p>
                                        <div className="informRow">
                                            <div className="select">
                                                <input type="text" id="raiseBefore" value={this.state.raiseBefore||''} readOnly/>
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
                                                <input type="text" id="steps" value={this.state.steps||''} readOnly/>
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
                                    <div className="submit projSub" onClick={this.projectSubmit} style={{display: this.state.type=="editing"||this.state.type=="new"?"block":"none"}}>Submit</div>
                                </div>
                            ):(
                                //请求数据异常
                                <div>
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
                                </div>
                            )
                            
                        )
                     )
                 }
                 </div>
                 
                {
                    //新建入口进入
                    this.state.type=="new"&&this.state.claim=="BD"?(
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
                    ):(
                        //状态为edtiing
                        this.state.type=="editing"&&this.state.claim=="BD"?(
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
                                    <input type="text" id="description1" ref={el=>this.desc1=el} value={this.state.desc1||''} onChange={this.handleChange.bind(this,"desc1")}/>
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
                                    <input type="text" id="description2" ref={el=>this.desc2=el} value={this.state.desc2||''} onChange={this.handleChange.bind(this,"desc2")}/>
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
                                    <input type="text" id="description3" ref={el=>this.desc3=el} value={this.state.desc3||''} onChange={this.handleChange.bind(this,"desc3")}/>
                                    <label htmlFor="description3">Content description: </label>
                                </div>
                                <div className="fileSub" onClick={this.fileSubmit.bind(this,"whitepaper")}>submit</div>
                                <p></p>
                            </div>
                        ):(
                            //只做展示
                            <div className="content">
                                {/* 上传文件1 */}
                                <div className="uploadRow">
                                    <div className="upload">
                                        <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName1 ? "block" : "none"}}/>
                                        <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName1 ? "none" : "block"}}/>
                                        {/* <input ref={el=>this.file1=el} type="file" id="file1" className="upInput" onChange={this.handle_Change.bind(this,"fileName1")}/> */}
                                        <div className="fileName" style={{display: !this.state.fileName1 ? "none" : "block"}}>{this.state.fileName1}</div>
                                    </div>
                                    <label htmlFor="file1">Upload legal documents:</label>
                                </div>
                                <div className="informRow">
                                    <input type="text" id="description1" ref={el=>this.desc1=el} value={this.state.desc1||''} readOnly/>
                                    <label htmlFor="description1">Content description: </label>
                                </div>
                                <div className="fileSub" onClick={this.fileSubmit.bind(this,"lagal")} style={{display: this.state.type=="deployed"||this.state.type=="audit_passed"||this.state.type=="ready_for_audit"?"none":"block"}}>submit</div>
                                <p></p>
                                {/* 上传文件2 */}
                                <div className="uploadRow">
                                    <div className="upload">
                                        <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName2 ? "block" : "none"}}/>
                                        <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName2 ? "none" : "block"}}/>
                                        {/* <input ref={el=>this.file2=el} type="file" id="file2" className="upInput" onChange={this.handle_Change.bind(this,"fileName2")}/> */}
                                        <div className="fileName" style={{display: !this.state.fileName2 ? "none" : "block"}}>{this.state.fileName2}</div>
                                    </div>
                                    <label htmlFor="file2">Upload marketing files:</label>
                                </div>
                                <p></p>
                                <div className="informRow">
                                    <input type="text" id="description2" ref={el=>this.desc2=el} value={this.state.desc2||''}  readOnly/>
                                    <label htmlFor="description2">Content description: </label>
                                </div>
                                <div className=" fileSub" onClick={this.fileSubmit.bind(this,"marketting")} style={{display: this.state.type=="deployed"||this.state.type=="audit_passed"||this.state.type=="ready_for_audit"?"none":"block"}}>submit</div>
                                <p></p>
                                {/* 上传文件3 */}
                                <div className="uploadRow">
                                    <div className="upload">
                                        <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName3 ? "block" : "none"}}/>
                                        <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName3 ? "none" : "block"}}/>
                                        {/* <input ref={el=>this.file3=el} type="file" id="file3" className="upInput" onChange={this.handle_Change.bind(this,"fileName3")}/> */}
                                        <div className="fileName" style={{display: !this.state.fileName3 ? "none" : "block"}}>{this.state.fileName3}</div>
                                    </div>
                                    <label htmlFor="file3">Upload white paper:</label>
                                </div>
                                <div className="informRow">
                                    <input type="text" id="description3" ref={el=>this.desc3=el} value={this.state.desc3||''} readOnly/>
                                    <label htmlFor="description3">Content description: </label>
                                </div>
                                <div className="fileSub" onClick={this.fileSubmit.bind(this,"whitepaper")} style={{display: this.state.type=="deployed"||this.state.type=="audit_passed"||this.state.type=="ready_for_audit"?"none":"block"}}>submit</div>
                                <p></p>
                            </div>
                        )
                    )
                }
                
                {
                    this.state.type=="new"&&this.state.claim=="BD"?(
                        //新建入口进入
                        <div>
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
                        </div>
                    ):(
                        //从首页列表点击进入
                        this.state.showData.length!="0"&&(this.state.type=="deployed"||this.state.type=="audit_passed"||this.state.type=="ready_for_audit")?(
                            //只做展示 不可编辑
                            <div>
                                <div className="titl">Company Information</div>
                                <div className="content">
                                    <div className="informRow">
                                        <input type="text" id="legalPerson" value={this.state.legalPerson||''} onChange={this.handleChange.bind(this,"legalPerson")} readOnly/>
                                        <label htmlFor="legalPerson">Legal Entity Name: </label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="CompRegNum" value={this.state.CompRegNum||''} onChange={this.handleChange.bind(this,"CompRegNum")} readOnly/>
                                        <label htmlFor="CompRegNum">Company Registration Number:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="VAT" value={this.state.VAT||''} onChange={this.handleChange.bind(this,"VAT")} readOnly/>
                                        <label htmlFor="VAT">VAT Registration Number:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="webAddr" value={this.state.webAddr||''} onChange={this.handleChange.bind(this,"webAddr")} readOnly/>
                                        <label htmlFor="webAddr">Website address:</label>
                                    </div>
                                </div>
                                <div className="titl">Company Address</div>
                                <div className="content">
                                    <div className="informRow">
                                        <input type="text" id="country" value={this.state.country||''} onChange={this.handleChange.bind(this,"country")} readOnly/>
                                        <label htmlFor="country">Country:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="city" value={this.state.city||''} onChange={this.handleChange.bind(this,"city")} readOnly/>
                                        <label htmlFor="city">City:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="comAddr" value={this.state.comAddr||''} onChange={this.handleChange.bind(this,"comAddr")} readOnly/>
                                        <label htmlFor="comAddr">Address:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="postalCode" value={this.state.postalCode||''} onChange={this.handleChange.bind(this,"postalCode")} readOnly/>
                                        <label htmlFor="postalCode">Postal Code:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="establishCountry" value={this.state.establishCountry||''} onChange={this.handleChange.bind(this,"establishCountry")} readOnly/>
                                        <label htmlFor="establishCountry">Country of Incorporation:</label>
                                    </div>
                                </div>
                                <div className="titl">Contact Person</div>
                                <div className="content">
                                    <div className="informRow">
                                        <input type="text" id="firstName" value={this.state.firstName||''} onChange={this.handleChange.bind(this,"firstName")} readOnly/>
                                        <label htmlFor="firstName">Contact Person‘s First Name: </label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="lastName" value={this.state.lastName||''} onChange={this.handleChange.bind(this,"lastName")} readOnly/>
                                        <label htmlFor="lastName">Contact Person‘s Last Name:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="position" value={this.state.position||''} onChange={this.handleChange.bind(this,"position")} readOnly/>
                                        <label htmlFor="position">Contact Person‘s Title/Position:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="phone" value={this.state.phone||''} onChange={this.handleChange.bind(this,"phone")} readOnly/>
                                        <label htmlFor="phone">Contact Person‘s Phone:</label>
                                    </div>
                                    <div className="informRow">
                                        <input type="text" id="email" value={this.state.email||''} onChange={this.handleChange.bind(this,"email")} readOnly/>
                                        <label htmlFor="email">Contact Person‘s Email:</label>
                                    </div>
                                </div>
                                <div className="infoSub" onClick={this.informSubmit} style={{display: this.state.type=="editing"||this.state.type=="new"?"block":"none"}}>Submit</div>
                            </div>
                        ):(
                            this.state.showData.length != "0"&&this.state.type=="editing"&&this.state.claim=="BD"?(
                                //做展示 且可编辑
                                <div>
                                    <div className="titl">Company Information</div>
                                    <div className="content">
                                        <div className="informRow">
                                            <input type="text" id="legalPerson" value={this.state.legalPerson||''} onChange={this.handleChange.bind(this,"legalPerson")}/>
                                            <label htmlFor="legalPerson">Legal Entity Name: </label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="CompRegNum" value={this.state.CompRegNum||''} onChange={this.handleChange.bind(this,"CompRegNum")}/>
                                            <label htmlFor="CompRegNum">Company Registration Number:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="VAT" value={this.state.VAT||''} onChange={this.handleChange.bind(this,"VAT")}/>
                                            <label htmlFor="VAT">VAT Registration Number:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="webAddr" value={this.state.webAddr||''} onChange={this.handleChange.bind(this,"webAddr")}/>
                                            <label htmlFor="webAddr">Website address:</label>
                                        </div>
                                    </div>
                                    <div className="titl">Company Address</div>
                                    <div className="content">
                                        <div className="informRow">
                                            <input type="text" id="country" value={this.state.country||''} onChange={this.handleChange.bind(this,"country")}/>
                                            <label htmlFor="country">Country:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="city" value={this.state.city||''} onChange={this.handleChange.bind(this,"city")}/>
                                            <label htmlFor="city">City:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="comAddr" value={this.state.comAddr||''} onChange={this.handleChange.bind(this,"comAddr")}/>
                                            <label htmlFor="comAddr">Address:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="postalCode" value={this.state.postalCode||''} onChange={this.handleChange.bind(this,"postalCode")}/>
                                            <label htmlFor="postalCode">Postal Code:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="establishCountry" value={this.state.establishCountry||''} onChange={this.handleChange.bind(this,"establishCountry")}/>
                                            <label htmlFor="establishCountry">Country of Incorporation:</label>
                                        </div>
                                    </div>
                                    <div className="titl">Contact Person</div>
                                    <div className="content">
                                        <div className="informRow">
                                            <input type="text" id="firstName" value={this.state.firstName||''} onChange={this.handleChange.bind(this,"firstName")}/>
                                            <label htmlFor="firstName">Contact Person‘s First Name: </label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="lastName" value={this.state.lastName||''} onChange={this.handleChange.bind(this,"lastName")}/>
                                            <label htmlFor="lastName">Contact Person‘s Last Name:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="position" value={this.state.position||''} onChange={this.handleChange.bind(this,"position")}/>
                                            <label htmlFor="position">Contact Person‘s Title/Position:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="phone" value={this.state.phone||''} onChange={this.handleChange.bind(this,"phone")}/>
                                            <label htmlFor="phone">Contact Person‘s Phone:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="email" value={this.state.email||''} onChange={this.handleChange.bind(this,"email")}/>
                                            <label htmlFor="email">Contact Person‘s Email:</label>
                                        </div>
                                    </div>
                                    <div className="infoSub" onClick={this.informSubmit} style={{display: this.state.type=="editing"||this.state.type=="new"?"block":"none"}}>Submit</div>
                                </div>
                            ):(
                                //数据异常处理
                                <div>
                                    <div className="titl">Company Information</div>
                                    <div className="content">
                                        <div className="informRow">
                                            <input type="text" id="legalPerson" value={this.state.legalPerson||''} onChange={this.handleChange.bind(this,"legalPerson")}/>
                                            <label htmlFor="legalPerson">Legal Entity Name: </label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="CompRegNum" value={this.state.CompRegNum||''} onChange={this.handleChange.bind(this,"CompRegNum")}/>
                                            <label htmlFor="CompRegNum">Company Registration Number:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="VAT" value={this.state.VAT||''} onChange={this.handleChange.bind(this,"VAT")}/>
                                            <label htmlFor="VAT">VAT Registration Number:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="webAddr" value={this.state.webAddr||''} onChange={this.handleChange.bind(this,"webAddr")}/>
                                            <label htmlFor="webAddr">Website address:</label>
                                        </div>
                                    </div>
                                    <div className="titl">Company Address</div>
                                    <div className="content">
                                        <div className="informRow">
                                            <input type="text" id="country" value={this.state.country||''} onChange={this.handleChange.bind(this,"country")}/>
                                            <label htmlFor="country">Country:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="city" value={this.state.city||''} onChange={this.handleChange.bind(this,"city")}/>
                                            <label htmlFor="city">City:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="comAddr" value={this.state.comAddr||''} onChange={this.handleChange.bind(this,"comAddr")}/>
                                            <label htmlFor="comAddr">Address:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="postalCode" value={this.state.postalCode||''} onChange={this.handleChange.bind(this,"postalCode")}/>
                                            <label htmlFor="postalCode">Postal Code:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="establishCountry" value={this.state.establishCountry||''} onChange={this.handleChange.bind(this,"establishCountry")}/>
                                            <label htmlFor="establishCountry">Country of Incorporation:</label>
                                        </div>
                                    </div>
                                    <div className="titl">Contact Person</div>
                                    <div className="content">
                                        <div className="informRow">
                                            <input type="text" id="firstName" value={this.state.firstName||''} onChange={this.handleChange.bind(this,"firstName")}/>
                                            <label htmlFor="firstName">Contact Person‘s First Name: </label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="lastName" value={this.state.lastName||''} onChange={this.handleChange.bind(this,"lastName")}/>
                                            <label htmlFor="lastName">Contact Person‘s Last Name:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="position" value={this.state.position||''} onChange={this.handleChange.bind(this,"position")}/>
                                            <label htmlFor="position">Contact Person‘s Title/Position:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="phone" value={this.state.phone||''} onChange={this.handleChange.bind(this,"phone")}/>
                                            <label htmlFor="phone">Contact Person‘s Phone:</label>
                                        </div>
                                        <div className="informRow">
                                            <input type="text" id="email" value={this.state.email||''} onChange={this.handleChange.bind(this,"email")}/>
                                            <label htmlFor="email">Contact Person‘s Email:</label>
                                        </div>
                                    </div>
                                    <div className="infoSub" onClick={this.informSubmit} style={{display: this.state.type=="editing"||this.state.type=="new"?"block":"none"}}>Submit</div>
                                </div>
                            )
                        )
                    )
                }
                 <div className="titl">Security Token ICON</div>
                 <div className="content">
                     {/* 上传图片ICON */}
                     <div className="uploadRow">
                        <div className="upload">
                            <img className="up" src={Upload} alt="上传图标" style={{display: !this.state.fileName4 ? "block" : "none"}}/>
                            <img className="file" src={file} alt="已上传图标" style={{display: !this.state.fileName4 ? "none" : "block"}}/>
                            <input ref={el=>this.icon=el} type="file" id="file4" className="upInput" onChange={this.handle_Change.bind(this,"fileName4")} style={{display:this.state.type=="editing"||this.state.type=="new"?"block":"none"}}/>
                            <div className="fileName" style={{display: !this.state.fileName4 ? "none" : "block"}}>{this.state.fileName4}</div>
                        </div>
                        <label htmlFor="file4">Upload ICON:</label>
                    </div>
                 </div>
                 <div className="comment" style={{display: this.state.claim=="complianceManager"&&(this.state.type=="ready_for_audit")?"flex":"none"}}>
                     {/* 审核批注 */}
                    <div>Manager Comment: </div>
                    <input type="text" value={this.state.comment} onChange={this.handleChange.bind(this,"comment")}/>
                 </div>
                 <div className="submit ready" onClick={this.readyFor} style={{display: this.state.claim=="BD"&&(this.state.type=="editing"||this.state.type=="new"||this.state.type=="audit_denied")?"block":"none"}}>Submit To Audit</div>
                 <div className="submit audit" onClick={this.review.bind(this,true)} style={{display: this.state.claim=="complianceManager"&&(this.state.type=="ready_for_audit")?"block":"none"}}>Audit</div>
                 <div className="submit deny" onClick={this.review.bind(this,false)} style={{display: this.state.claim=="complianceManager"&&(this.state.type=="ready_for_audit")?"block":"none"}}>Deny</div>
             </form>
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
            <InformRegister {...drizzleContext} {...props} />
          );
        }}
      </DrizzleContext.Consumer>
  
    )
  }