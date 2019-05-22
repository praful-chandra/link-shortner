import React, { Component } from "react";

class CuratedStylesContainer extends Component {
  render() {
    
    return (
      <div className="curatedStyles-container">
        <div className="curatedStyles-container-title">
         {this.props.containerHeader ? this.props.containerHeader : " Check out our Curated Styles"}
        </div>

        {this.props.children}

{this.props.containerFooter !== "none" ? (
  <button className="curatedStyles-container-moreBtn">
  {this.props.containerFooter  ? this.props.containerFooter : " Check out our Curated Styles"}
  </button>
):null}
       
      </div>
    );
  }
}

export default CuratedStylesContainer;
