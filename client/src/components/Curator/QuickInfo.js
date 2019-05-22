import React, { Component } from 'react'

export default class QuickInfo extends Component {
  render() {
    return (
        <div className="curator ">
        <div className="row">
          <div className="curator-col col-md-6">
            <div className="curator-bimg">
              <div className="curator-bimg-shadow"></div>
            </div>
            <div className="curator-bimg-img">
              <img src={require("../../images/curator/best-curator.png")} alt="Best curator" />
            </div>
  
            <div className="curator-bimg-textBox">
              <ul className="curator-bimg-textBox-ul">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p className="curator-bimg-textBox-txt">
                Best <br />
                CURATOR <br />
                OF THE <br />
                Month
              </p>
            </div>
          </div>
          <div className="curator-col curator-imgGrid col-md-6">
            <div className="curator-profile">
              <div className="curator-profile-txt">
                <p className="curator-profile-txt-name">
                  SHripriya JAin
                </p>
                <p className="curator-profile-txt-det">
                  Fashion blogger and an avid youtuber with a <br />
                  Superb taste in Street Styles, curating across the globe
                </p>
                <div className="row curator-profile-pics">
                  <div className="l">
                    <img src={require("../../images/curator/style1.png")} alt="" />
                  </div>
                  <div className=" r">
                    <img src={require("../../images/curator/style2.png")}alt="" />
                  </div>
                </div>
  
                <div className="row curator-profile-pics">
                  <div className=" l">
                    <img src={require("../../images/curator/style3.png")} alt="" />
                  </div>
                  <div className=" r">
                    <img src={require("../../images/curator/style4.png")} alt="" />
                  </div>
                </div>
  
                <div className="curator-profile-btn">
                  <a href="profile/curator">shop her style</a>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        
  
  
  
      </div>
    )
  }
}
