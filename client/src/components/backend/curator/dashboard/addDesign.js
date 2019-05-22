import React, { Component } from "react";
import { connect } from "react-redux";
import FormData from 'form-data';

import {addDesigns} from "../../../../actions/curatorActions";

class addDesign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      coverImg: require("../../../../images/curator/addImg.png"),
      label: "",
      price: "",
      modelSize: "",
      avaliableSize: [],
      productDetails: [],
      coverFile  :"",
      styleCode : this.props.styleCode
    };
  }

  handelCover  = e=>{
      const file = e.target.files[0];
      this.setState({
          coverImg : URL.createObjectURL(file),
          coverFile : file
      })
  }

  handelFormSubmit = e=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("title" ,this.state.title);
       formData.append("description",this.state.description);
       formData.append("designCover",this.state.coverFile);
       formData.append("styleCode",this.state.styleCode);
      formData.append("avaliableSize",this.state.avaliableSize);
      formData.append("productDetails",this.state.productDetails);
      formData.append("label",this.state.label);
      formData.append("price",this.state.price);
      formData.append("modelSize",this.state.modelSize);




    this.props.addDesigns(formData);

    
  }

  handelAddSizes = e=>{
      
      const avaliableSize = this.state.avaliableSize;


     if( avaliableSize.includes(e.target.value)){
        const index =  avaliableSize.indexOf(e.target.value);
        if (index > -1) {
            avaliableSize.splice(index, 1);
          }
     }else{
         avaliableSize.push(e.target.value)
     }

     this.setState({
         avaliableSize 
     })
  }

  handelProductDetails = e=>{
      const detail = document.getElementById("productDetails").value;

      const productDetails = this.state.productDetails;

      productDetails.push(detail);

      this.setState({
          productDetails
      })

      document.getElementById("productDetails").value = "";
      }

      handelProductDetailsDelete = i=>{
        const productDetails = this.state.productDetails;
        if (i > -1) {
            productDetails.splice(i, 1);
          }

          this.setState({
            productDetails
        })
      }

      handleOnChange =e =>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

  render() {
    return (
      <div>
        <div className="addDesign">
          <div className="authPage-signIn  adminAuth addDesign-body">
            <h1>Add Design</h1>
            <form className="authPage-signIn-form" encType="multipart/form-data" onSubmit={this.handelFormSubmit}>
              <input
                type="text"
                name="title"
                placeholder="title"
                id="DesignTitle"
                onChange={this.handleOnChange}
                required
                value={this.state.title}
              />

              <textarea
                className="bigger"
                name="description"
                id="DesignDescription"
                cols="30"
                rows="5"
                placeholder="enter description here"
                onChange={this.handleOnChange}
                value={this.state.description}

              />

              <label htmlFor="DesignCover" className="addDesign-body-label bigger">
                <img src={this.state.coverImg} alt="" />
                <p>   Design Cover</p>
              </label>
              <input
                type="file"
                name="designCover"
                id="DesignCover"
                style={{display : "none"}}
                onChange={this.handelCover}
              />

                <input
                type="text"
                name="label"
                placeholder="label"
                id="DesignLabel"
                onChange={this.handleOnChange}
                value={this.state.label}

              />
                <input
                type="number"
                name="price"
                placeholder="price"
                id="Designprice"
                onChange={this.handleOnChange}
                value={this.state.price}

              />
                    <label htmlFor="modelSize">Model is wearing size</label>
                <select name="modelSize"
                onChange={this.handleOnChange} id="modelSize" className="bigger">
                    <option value="">SElect one</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <fieldset className="bigger">      
        <legend>Avaliable Sizes</legend>      
        <input type="checkbox" name="avaliableSize" value="S" onChange={this.handelAddSizes}/>S{" "}
        <input type="checkbox" name="avaliableSize" value="M" onChange={this.handelAddSizes}/>M {" "}    
        <input type="checkbox" name="avaliableSize" value="L" onChange={this.handelAddSizes}/>L  {" "}  
        <input type="checkbox" name="avaliableSize" value="XL" onChange={this.handelAddSizes}/>XL  {" "}   
        <input type="checkbox" name="avaliableSize" value="XXL" onChange={this.handelAddSizes}/>XXL  {" "}   
        <input type="checkbox" name="avaliableSize" value="XXXL" onChange={this.handelAddSizes}/>XXXL  {" "}   
 
   
    </fieldset> 

        <div className="addDesign-body-details">
        <input type="text" name="productDetails" id="productDetails" placeholder="productDetails"/>
        <p className="btn btn-light" onClick={this.handelProductDetails}>Add</p>

        {this.state.productDetails.map((detail,i)=>(
            <div className="alert alert-info" role="alert" key={`detail${i}`}>
           {detail}
            <button type="button" class="close bigger" data-dismiss="alert" aria-label="Close" onClick={()=>this.handelProductDetailsDelete(i)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ))}

        </div>
        <input
                type="text"
                name="styleCode"
                placeholder="styleCode"
                id="styleCode"
                disabled
                value={this.state.styleCode}
              />
              <input 
                type="submit"
                className="authPage-signIn-form-btn adminAuth-btn"
                value="ADD Design"
                
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {addDesigns}
)(addDesign);
