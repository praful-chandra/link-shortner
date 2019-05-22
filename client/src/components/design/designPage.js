import React, { Component } from 'react';
import {connect} from "react-redux";


import {getDesignByCode} from "../../actions/designActions";


 class designPage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       selectedDesign : null
    }
  }
  

componentDidMount(){

  this.props.getDesignByCode(this.props.match.params.id)
  
}

componentWillReceiveProps(nextprops){
  if(nextprops.designs.selectedDesign && !nextprops.designs.designLoading){

    this.setState({
      selectedDesign : nextprops.designs.selectedDesign
    })
  }
}

  render() {
if(this.state.selectedDesign)
    return (
      <div>
         <div className="product-hero-wrapper">
        <div className="row">
            <div className="product-hero-img-main col-md-5">
                <img onclick="zoomProd()" src={this.state.selectedDesign.coverImg} alt=""/>
            </div>
            <div className="product-hero-img-others col-md-2">
            {this.state.selectedDesign.otherImages && this.state.selectedDesign.otherImages.map((images,k)=>{
              if(k < 4)
              return <div className="row" key={`otherImg${k}`}><img onclick="zoomProd()" src={images} alt=""/></div>
              else
              return null
            })}
                
            
            </div>
            <div className="product-hero-desc col-md-5">
                <div className="product-hero-desc-title">{this.state.selectedDesign.title}</div>
                <div className="product-hero-desc-label">{this.state.selectedDesign.label}</div>
                <div className="product-hero-desc-price">₹ {this.state.selectedDesign.price}</div>
                <div className="product-hero-desc-desc">{this.state.selectedDesign.description}</div>
                <div className="product-hero-desc-modelSize">Model is wearing size {this.state.selectedDesign.modelSize}</div>
                <select name="" id="" className="product-hero-desc-size">
                    {this.state.selectedDesign.avaliableSize.map((Sizes,i)=>{
                      return <option value={Sizes} key={`size${i}`}>{Sizes}</option>

                    })}
                </select>
                <br/>
                <div className="product-hero-desc-addbag">
                    <i className="fas fa-shopping-bag"></i>
                    Add to BAG
                </div>
                <div className="product-hero-desc-wishlist">
                    <i className="fas fa-heart"></i>
                    Wishlist
                </div>
                <div className="product-hero-desc-prodDetails">
                    <h3>Product Details</h3>
                    <ul>
                        {this.state.selectedDesign.productDetails.map((detail,i)=>{
                          return <li key={`detail${i}`}> - {detail}</li>
                        })}
                    </ul>
                 
                </div>
                <div className="product-hero-desc-curator">
                    <div className="product-hero-desc-curator-img">
                        <img src={this.state.selectedDesign.curatorImg} alt=""/>
                    </div>
              <div className="product-hero-desc-curator-right">
                    <div className="product-hero-desc-curator-name">
                            Curated by <span>Shripriya Jain </span>

                    </div>
                    <div className="product-hero-desc-curator-descp">
                            An avid instagrammer and you-tuber and <br/>
                            Fashion stylist.  Renowned for style selection <br/>
                            in vintage and street wear.
                    </div>
              </div>


                </div>
                <div className="product-hero-desc-curator-2">
                        Also part of curated looks by <span>Abhilasha Singh</span>
                </div>
            </div>
        </div>
    </div> 
      </div>
    )
    else
    return null
  }
}

const mapStateToProps = state =>({
designs : state.designs
})

export default connect(mapStateToProps,{getDesignByCode})(designPage)