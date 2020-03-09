import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Header from "../../../components/common/guideHeader"
import Guide from "../../../components/common/guideMenu"
import "./deploy.css"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
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
                    <div className="content">
                        <div className="tabBox">
                            <div className="tab1">
                                <div className="check"></div>
                                <div className="unCheck"></div>
                                <div className="tab">Common stock</div>
                            </div>
                            <div className="tab2">
                                <div className="check"></div>
                                <div className="unCheck"></div>
                                <div className="tab">Partition</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
}