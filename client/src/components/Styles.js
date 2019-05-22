import React, { Component } from "react";
import {connect} from 'react-redux';
import CuratedStyles from "./CuratedStyles/CuratedStyles";
import CuratedStylesContainer from "./CuratedStyles/CuratedStylesContainer";
import QuickInfo from "./Curator/QuickInfo";

import {getAllStyles} from "../actions/styleActions";
import {getAllDesigns} from "../actions/designActions";


class Styles extends Component {

constructor(props) {
  super(props)

  this.state = {
     allStyles:[],
     allDesigns:[]
  }
}




  componentDidMount(){
    
this.props.getAllStyles();
this.props.getAllDesigns();

 
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.styles && !nextProps.styles.styleLoading)
    this.setState({
      allStyles : nextProps.styles.allStyles
    })

    if(nextProps.designs && !nextProps.designs.designLoading)
    this.setState({
      allDesigns : nextProps.designs.allDesigns
    })
  }




  render() {

    

    return(
      <>

      {this.state.allStyles.map((style,i)=>{

        let styleDesigns = []
        this.state.allDesigns.filter(design=>{
          if(design.styleCode === style.styleCode){
            styleDesigns.push(design)
          }
          return null
        })

        
        
        return(
          <CuratedStylesContainer containerHeader=" " key={`style${i}`} containerFooter="none">
   <CuratedStyles content={style} design={styleDesigns} />
    </CuratedStylesContainer>
        )
      })}

      {/* <CuratedStylesContainer containerHeader=" " containerFooter="none" key={this.data._id}>
   <CuratedStyles content={this.data} design={this.design} />
    </CuratedStylesContainer>

    <CuratedStylesContainer containerHeader=" " containerFooter="none" key={this.data._id}>
   <CuratedStyles content={this.data} design={this.design} />
    </CuratedStylesContainer>

      <QuickInfo />

    <CuratedStylesContainer containerHeader=" " containerFooter="none" key={this.data._id}>
   <CuratedStyles content={this.data} design={this.design} />
    </CuratedStylesContainer>

    <CuratedStylesContainer containerHeader=" " containerFooter="none" key={this.data._id}>
   <CuratedStyles content={this.data} design={this.design} />
    </CuratedStylesContainer> */}

    {/* <QuickInfo /> */}
      </>
    )
  }
}

const mapStateToProps = (state)=>(
  {
    styles : state.styles,
    designs : state.designs
  }
)

export default connect(mapStateToProps,{getAllStyles,getAllDesigns})(Styles);
