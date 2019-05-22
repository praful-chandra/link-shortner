import React, { Component } from "react";

export default class curator extends Component {
  render() {
    return (
      <div className="viewProfile">
        <div className="viewProfile-body">
          <div className="viewProfile-body-name">{this.props.curator.name}{" "}
          <i className="fas fa-times-circle" style={{cursor : "pointer"}} onClick={this.props.exit}></i></div>
          <div className="profile-moreInfo bigger">
            <ul>
              <li>
                <span className="profile-moreInfo-head">Email</span>{" "}
                <span className="profile-moreInfo-body">{this.props.curator.email}</span>
              </li>
              <li>
                <span className="profile-moreInfo-head">CU Code</span>{" "}
                <span className="profile-moreInfo-body">{this.props.curator.curatorCode}</span>
              </li>
              <li>
                <span className="profile-moreInfo-head">is Init</span>{" "}
                <span className="profile-moreInfo-body">{this.props.curator.isInit ? "YES" : "NO"}</span>
              </li>
              <li>
                <span className="profile-moreInfo-head">SUBS</span>{" "}
                <span className="profile-moreInfo-body">{this.props.curator.subscribers.length}</span>
              </li>
              <li>
                <span className="profile-moreInfo-head">styles</span>{" "}
                <span className="profile-moreInfo-body">{this.props.curator.styles.length}</span>
              </li>
              <li>
                <span className="profile-moreInfo-head">designs </span>{" "}
                <span className="profile-moreInfo-body">{this.props.curator.designs.length}</span>
              </li>
            </ul>
          </div>

         
            {
              this.props.curatorStyles.map((style,si)=>
                (
                  <>
                  <div className="viewProfile-body-styles" key={`style${si}`}>
                <div className="viewProfile-body-styles-title"> {style.name} </div>
                <div className="row viewProfile-body-styles-design">

                   {this.props.curatorDesigns.map((design,di)=>{
                     if(design.styleCode === style.styleCode)
                      return(
                        <div className="col-lg-3 viewProfile-body-styles-design-card" key={`design${di}`} >
                        <img src={design.coverImg} alt=""/>
                        <div className="viewProfile-body-styles-design-card-title">{design.title}</div>
                        </div> 
                      )
                      else
                      return null
                   })}
                    
                </div>
            </div>
            <br/>
                  </>
                ))
            }

           

        </div>
      </div>
    );
  }
}
