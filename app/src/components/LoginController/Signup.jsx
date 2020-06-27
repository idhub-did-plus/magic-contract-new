import "./login.css"
import React, { Component, Children } from "react";


export default class Signup extends Component {
  constructor(props, context) {
    super(props);
    this.state = {

    };

    this.signup = this.signup.bind(this);

  }
  async componentDidMount() {
    let json = await this.reentry();
    if(json != undefined &&json.success){
      this.props.drizzle.store.dispatch(loginFinished(json));
    }
    //this.props.drizzle.store.dispatch(login());

  }
  // handleClaimChange(key, text, value) {

  //   this.claim = text.value;

  // }
  handleCheck(selItem){
    this.setState({
      selItem: selItem
    })
  }
  async signup(event) {
    
    if(this.state.selItem == 1){
      this.claim = "complianceManager";
      window.localStorage.setItem("claim","complianceManager");
    }else if(this.state.selItem == 2){
      this.claim = "tokenIssuer"
    }else if(this.state.selItem == 3){
      this.claim = "BD"
      window.localStorage.setItem("claim","BD");
    }else if(this.state.selItem == 4){
      this.claim = "Supervisor"
    }else{
      alert("choose claim please!")
      return
    }
    var myDate = new Date();
		var timestamp = myDate.getTime();
    let web3 = this.props.drizzle.web3;
    //console.log(web3.version);  1.2.6版本
    let identity =  this.props.drizzleState.accounts[0];
    var data = web3.utils.fromUtf8(identity + timestamp + this.claim)
    web3.eth.personal.sign(data, identity,async (error, signature)=>{
      
      let json = await this.request(identity, timestamp, this.claim, signature);
      if(json != undefined && json.success){
        alert("login success")
        this.props.drizzle.store.dispatch(loginFinished(json)); 
      }else{
        alert("login failed")
      }
    });

  }
  async request(identity, tp,claim, sig) {
    try {
      let url = this.state.baseURL+'/auth/login?identity='+identity+'&timestamp='+tp + '&claim=' + claim+ '&signature=' + sig;
      
      let response = await fetch(url, {
       
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
      let json = response.json() // parses response to JSON
      return json;
    } catch (err) {
      alert(err);
    } finally {

    }
  }
 
  render() {

    return (
        <div >

        <div id="u11" class="ax_default box_1">
          <div id="u11_div" class=""></div>
          <div id="u11_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>

        <div id="u12" class="ax_default text_field">
          <div id="u12_div" class=""></div>
          <input id="u12_input" type="text" value="Sign Up" class="u12_input"/>
        </div>

        <div id="u13" class="ax_default text_field">
          <div id="u13_div" class=""></div>
          <input id="u13_input" type="text" value="Please enter your information" class="u13_input"/>
        </div>
  
        <div id="u14" class="ax_default text_field">
          <div id="u14_div" class=""></div>
          <input id="u14_input" type="text" value="Please select the identity you want to register:" class="u14_input"/>
        </div>
  

        <div id="u15" class="ax_default droplist">
          <div id="u15_div" class=""></div>
          <select id="u15_input" class="u15_input">
            <option class="u15_input_option" value="Magic Circle Administrator">Magic Circle Administrator</option>
            <option class="u15_input_option" value="Magic Circle Issuer">Magic Circle Issuer</option>
            <option class="u15_input_option" selected value="Magic Circle BD">Magic Circle BD</option>
            <option class="u15_input_option" value="Magic Circle Supervisor">Magic Circle Supervisor</option>
          </select>
        </div>
  

        <div id="u16" class="ax_default text_field">
          <div id="u16_div" class=""></div>
          <input id="u16_input" type="text" value="Contact Person's First Name:" class="u16_input"/>
        </div>
 
        <div id="u17" class="ax_default text_field">
          <div id="u17_div" class=""></div>
          <input id="u17_input" type="text" value="Type your answer here..." class="u17_input"/>
        </div>

        <div id="u18" class="ax_default text_field">
          <div id="u18_div" class=""></div>
          <input id="u18_input" type="text" value="Contact Person's Last Name:" class="u18_input"/>
        </div>

        <div id="u19" class="ax_default text_field">
          <div id="u19_div" class=""></div>
          <input id="u19_input" type="text" value="Type your answer here..." class="u19_input"/>
        </div>
  
        <div id="u20" class="ax_default text_field">
          <div id="u20_div" class=""></div>
          <input id="u20_input" type="text" value="Contact Person's Title/Position:" class="u20_input"/>
        </div>
  
        <div id="u21" class="ax_default text_field">
          <div id="u21_div" class=""></div>
          <input id="u21_input" type="text" value="Type your answer here..." class="u21_input"/>
        </div>
  
        <div id="u22" class="ax_default text_field">
          <div id="u22_div" class=""></div>
          <input id="u22_input" type="text" value="Contact Person's Phone:" class="u22_input"/>
        </div>

        <div id="u23" class="ax_default text_field">
          <div id="u23_div" class=""></div>
          <input id="u23_input" type="text" value="Contact Person's Email:" class="u23_input"/>
        </div>

        <div id="u24" class="ax_default text_field">
          <div id="u24_div" class=""></div>
          <input id="u24_input" type="text" value="Type your answer here..." class="u24_input"/>
        </div>

        <div id="u25" class="ax_default text_field">
          <div id="u25_div" class=""></div>
          <input id="u25_input" type="text" value="Type your answer here..." class="u25_input"/>
        </div>
 
        <div id="u26" class="ax_default primary_button">
          <div id="u26_div" class=""></div>
          <div id="u26_text" class="text ">
            <p><span style="text-decoration:none;">Sign Up</span></p>
          </div>
        </div>

        <div id="u27" class="ax_default text_field">
          <div id="u27_div" class=""></div>
          <input id="u27_input" type="text" value="Issue Claim" class="u27_input"/>
        </div>

        <div id="u28" class="ax_default sticky_1">
          <div id="u28_div" class=""></div>
          <div id="u28_text" class="text ">
            <p>
                <span style="text-decoration:none;">快速注册BD用户没有发行主体Claim，</span>
                <span style="text-decoration:none;color:#D9001B;">只能进入ST行情页面进行查看</span>
                <span style="text-decoration:none;">；</span>
                </p>
                <p><span style="text-decoration:none;"><br/></span></p>
                <p><span style="text-decoration:none;">点击</span><span style="text-decoration:none;color:#000000;">Issue Claim按钮，系统跳转到BD用户注册界面，填写完整BD用户注册信息</span></p>
          </div>
        </div>
  

        <div id="u29" class="ax_default text_field">
          <div id="u29_div" class=""></div>
          <input id="u29_input" type="text" value="Legal Entity Name:" class="u29_input"/>
        </div>

        <div id="u30" class="ax_default text_field">
          <div id="u30_div" class=""></div>
          <input id="u30_input" type="text" value="Type your answer here..." class="u30_input"/>
        </div>
      </div>
      </div>

    )
  }
}

