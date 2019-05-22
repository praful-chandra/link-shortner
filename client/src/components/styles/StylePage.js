import React, { Component } from "react";
import {connect} from 'react-redux';
import CuratedStylesContainer from "../CuratedStyles/CuratedStylesContainer";
import CuratedStyles from "../CuratedStyles/CuratedStyles";


import {getStyleByCode} from "../../actions/styleActions";
import {getDesignByCode,getAllDesigns} from "../../actions/designActions";
class StylePage extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       selectedStyle : null,
      styleDesigns : []  
    }
  }
  
  

  
  componentDidMount(){

    this.props.getStyleByCode(this.props.match.params.id)
    this.props.getAllDesigns();

  }

  componentWillReceiveProps(nextProps){
if(nextProps.styles.selectedStyle){
  
  this.setState({
    selectedStyle : nextProps.styles.selectedStyle
  })
}

if(nextProps.designs && !nextProps.designs.designLoading){
  let styleDesigns = nextProps.designs.allDesigns.filter(design=>{
    return (design.styleCode === this.props.match.params.id)
  })
  this.setState({
    styleDesigns
  })
}
  }

  redirectToProduct = (designCode)=>{
    
    window.location.replace("/design/"+designCode);
    
  }

  render() {

    
    const arrowRight = require("../../images/style/arrow-right.png");
    const arrowLeft = require("../../images/style/arrow-left.png");


    const firstTile = (design) =>(
      <div className="style-hero" key={design.designCode}>
      <div className="style-hero-imgContainer">
        <img src={design.coverImg} alt="" />
      </div>
      <div className="style-hero-arrow">
        <img src={arrowRight} alt="" />
      </div>
      <div className="style-hero-desc">
        <div className="style-hero-desc-left">
          <p>
            {design.description}
          </p>
        </div>
        <div className="style-hero-desc-right">
          <p className="style-hero-desc-right-name">
            {design.name}
          </p>
          <p className="style-hero-desc-right-label">
            {design.label}
          </p>
          <p className="style-hero-desc-right-price">₹ {design.price}</p>
          <p className="style-hero-desc-right-bag" onClick={()=>{this.redirectToProduct(design.designCode)}}>
            <i className="fas fa-shopping-bag" />
             Add to bag
          </p>
          <p className="style-hero-desc-right-heart">
            <i className="fas fa-heart" />
            210
          </p>
        </div>
      </div>
    </div>
    )

    const secondTile = (design)=>(
      <div className="style-hero-2 " key={design.designCode}>
              <div className="style-hero-desc style-hero-2-desc">
                <div className="style-hero-desc-left">
                  <p>
                   {design.description}
                  </p>
                </div>
                <div className="style-hero-desc-right">
                  <p className="style-hero-desc-right-name">
                    {design.name}
                  </p>
                  <p className="style-hero-desc-right-label">
                    {design.label}
                  </p>
                  <p className="style-hero-desc-right-price">₹ {design.price}</p>
                  <p className="style-hero-desc-right-bag" onClick={()=>{this.redirectToProduct(design.designCode)}}>
                    <i className="fas fa-shopping-bag" />
                    Add to bag
                  </p>
                  <p className="style-hero-desc-right-heart">
                    <i className="fas fa-heart" />
                    210
                  </p>
                </div>
              </div>

              <div className="style-hero-2-arrow">
                <img src={arrowLeft} alt="" />
              </div>
              <div className="style-hero-imgContainer style-hero-2-image">
                <img src={design.coverImg} alt="" />
              </div>
            </div>
    )

    const mobileTile = (design)=>(
      <div className="mobile-style-hero-container" key={`Mobile${design.designCode}`}>
      <div className="style-hero-imgContainer">
        <img src={design.coverImg} alt="" />
      </div>

      <div className="style-hero-desc">
        <div className="style-hero-desc-left">
          <p>
           {design.description}
          </p>
        </div>
        <div className="style-hero-desc-right">
          <p className="style-hero-desc-right-name">{design.name}</p>
          <p className="style-hero-desc-right-label">{design.label}</p>
          <p className="style-hero-desc-right-price">{design.price}</p>
          <p className="style-hero-desc-right-bag" onClick={()=>{this.redirectToProduct(design.designCode)}}>
            <i className="fas fa-shopping-bag" />
            Add to bag
          </p>
          <p className="style-hero-desc-right-heart">
            <i className="fas fa-heart" />
            210
          </p>
        </div>
      </div>
    </div>
    )

  
    



    if(this.state.selectedStyle)
    return (
      <div>
        
        {/* --------------------------------------------------- Desktop version ----------------------------------------------------------------------------- */}
        <div className="style-desktop">
          <div className="style-hero">
            <div className="style-hero-text">
              <img
                className="style-hero-text-arrowRight"
                src={arrowRight}
                alt=""
              />
              <span>{this.state.selectedStyle.name}</span>
            </div>

            {this.state.styleDesigns.map((design,i)=>{
              
              if(i % 2 === 0){
                return firstTile(design)
              }else
              return secondTile(design)
            })}


          </div>

          {/* <CuratedStylesContainer containerHeader={`latest styes by some curator`} containerFooter="none">
              
          <CuratedStyles content={data} design={design}  />

              

            </CuratedStylesContainer> */}
        </div>
        {/* --------------------------------------------------- Desktop version ----------------------------------------------------------------------------- */}

        {/* --------------------------------------------------- Mobile version ----------------------------------------------------------------------------- */}

        <div className="mobile-style-wrapper">
          <div className="mobile-style-hero-text">
          {this.state.selectedStyle.name}
          </div>

          {this.state.styleDesigns.map((design,i)=>{
              
              return mobileTile(design)
            })}
    
        
        </div>
        
        {/* --------------------------------------------------- Mobile version ----------------------------------------------------------------------------- */}
      </div>
    )
    else
      return null
    

  }
}

const mapStateToProps= (state)=>({
  styles : state.styles,
  designs : state.designs
})

export default connect(mapStateToProps,{getStyleByCode,getDesignByCode,getAllDesigns})(StylePage);
