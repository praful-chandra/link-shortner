import React, { Component } from "react";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";

import {
  getCuratorStyles,
  getCuratorDesigns
} from "../../../../actions/curatorActions";

import CheckCuratorAuth from "../checkCuratorAuth";
import AddStyle from "./addStyle";
import AddDesign from "./addDesign";

class styles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curator: {
        isAuthenticated: false
      },
      addStyle : false,
      addDesign : false,
      styleCode : ""
    };
  }

componentDidMount(){
    
    
}

  componentWillReceiveProps(nextProps) {
   if(nextProps.curator !== this.state.curator){
       this.setState({
           curator : nextProps.curator
       })
   }

   
 


  }

  addStyle = ()=>{
    this.setState({
      addStyle : !this.state.addStyle
    })
  }

  addDesign = (styleCode)=>{
    this.setState({
      addDesign : !this.state.addDesign,
      styleCode
    })
  }


  styleHead = style => (
    <>
      {/* <!-- ------------------------------------------------- Desktop version -------------------------------------------------------------------------------- --> */}

      <div className="curator-landing-2-trending-wrapper wrapper-trending">
        <div className="curator-landing-trending-info">{style.name}</div>
        <div className="curator-landing-2-trending">
          <ul>
            {/* <li>Get unique link of style</li>
                <li>Add more photos/videos</li>
                <li>Check Stats</li> */}
            <li>Add Collaborators</li>
            <li onClick={()=>this.addDesign(style.styleCode)}>
              <i className="fas fa-plus" /> Add{" "}
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- ------------------------------------------------- Desktop version -------------------------------------------------------------------------------- --> */}
      {/* <!-- ------------------------------------------------- Mobile version -------------------------------------------------------------------------------- --> */}

      <div className="mobile-curatorPage">
        <div className="mobile-wrapper-trending mobile-wrapper-trending-2">
          <div className="mobile-curator-landing-trending-info">
            {style.name}
          </div>

          <div className="mobile-curator-landing-2-trending">
            <ul>
              {/* <li>Get unique link of style</li>
                  <li>Add more photos/videos</li>
                  <li>Check Stats</li> */}
              <li>Add Collaborators</li>
              <li onClick={this.addDesign}>
                <i className="fas fa-plus" />
                Add
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <!-- ------------------------------------------------- Mobile version -------------------------------------------------------------------------------- --> */}
    </>
  );

  styleCard = design => (
    <div className="col">
      <div className="curator-landing-curated-styles-card">
        <div className="curator-landing-curated-styles-card-image">
          <img
            src={design.coverImg}
            alt=""
          />
        </div>
        <div className="curator-landing-curated-styles-card-info">
          <div className="curator-landing-curated-styles-card-info-name">
            {design.name}
          </div>
          <div className="curator-landing-curated-styles-card-info-desc">
            {design.label}
          </div>
          <div className="curator-landing-curated-styles-card-info-price">
          &#8377;{design.price || "unpriced"}
          </div>
          <div className="curator-landing-curated-styles-card-info-link">
            Get unique link of design
          </div>
        </div>
      </div>
    </div>
  );

  render() {
   
      if(this.state.curator.isAuthenticated && !this.state.curator.curatorLoading && this.state.curator.myStyles === null  && this.state.curator.myDesigns === null){
          this.props.getCuratorStyles();
          this.props.getCuratorDesigns();
      }

      
      
      
    return (
      <div>
          {this.state.addStyle? <AddStyle /> : null}
          {this.state.addDesign? <AddDesign styleCode={this.state.styleCode}/> : null}

          <CheckCuratorAuth />
        <button className="btn btn-outline-secondary bigger" onClick={()=>window.location.replace("/backend/curator/dashboard")}>Back</button>

        <div className="addBtn" style={{"z-index" : "1000"}} onClick={this.addStyle}>
          {this.state.addStyle ? <i className="fas fa-times"></i> : <i className="fas fa-plus" />}
        </div>
        {this.state.addDesign ? <div className="addBtn" style={{"z-index" : "10000"}} onClick={this.addDesign}>
           <i className="fas fa-times"></i> 
        </div> : null}

            {this.state.curator.myStyles && this.state.curator.myStyles.map(style=>(
              <div>
              {this.styleHead(style)}
              <div className="row curator-landing-curated-styles-wrapper">
                  {this.state.curator.myDesigns && this.state.curator.myDesigns.map(design=>{
                    if(design.styleCode === style.styleCode)
                      return(
                        this.styleCard(design)
                      )
                      else
                      return null
                  })}
              </div>
              </div>
            ))}
            
      </div>
    );
    
  }
}

const mapStateToProps = state => ({
  styles: state.styles,
  designs: state.designs,
  curator: state.curator
});

export default connect(
  mapStateToProps,
  { getCuratorStyles, getCuratorDesigns }
)(styles);
