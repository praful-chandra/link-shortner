import React, { Component } from 'react'

import Head from './ProfileHead';
import CuratedStyles from "../CuratedStyles/CuratedStyles";
import CuratedStylesContainer from "../CuratedStyles/CuratedStylesContainer";


 
  class Profile extends Component {

    data={
      name :"some style name",
      description : " some style description",
      _id : "some id"
    }
    design=[{
      coverImg : require("../../images/curator/style1.png")
    },{
      coverImg : require("../../images/curator/style2.png")
    },{
      coverImg : require("../../images/curator/style3.png")
    },{
      coverImg : require("../../images/curator/style4.png")
    },{
      coverImg : require("../../images/curator/style1.png")
    },{
      coverImg : require("../../images/curator/style2.png")
    },{
      coverImg : require("../../images/curator/style3.png")     
    },{
      coverImg : require("../../images/curator/style4.png")
    }]
  render() {
    return (
     <div>
         <Head/>

         <CuratedStylesContainer containerHeader=" " containerFooter="none">
          <CuratedStyles content={this.data} design={this.design}/>
        </CuratedStylesContainer>

        <CuratedStylesContainer containerHeader=" " containerFooter="none">
          <CuratedStyles content={this.data} design={this.design}/>
        </CuratedStylesContainer>

        <CuratedStylesContainer containerHeader=" " containerFooter="none">
          <CuratedStyles content={this.data} design={this.design}/>
        </CuratedStylesContainer>
        
     </div>
    )
  }
}


export default Profile;