import React, { Component } from "react";
import {connect} from "react-redux";

class CuratedStyles extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  componentDidMount(){

  }

  interval = null;

  leftSlide = e => {
    e.persist();
    let temp = () => {
      e.target.parentElement.getElementsByTagName("div")[6].scrollBy(-2, 0);
    };

    this.interval = setInterval(() => {
      temp();
    }, 1);
  };

  rightSlide = e => {
    e.persist();

    let temp = () => {
      e.target.parentElement.getElementsByTagName("div")[6].scrollBy(2, 0);
    };

    this.interval = setInterval(() => {
      temp();
    }, 1);
  };

  imgClick = (code) => {
    window.location.replace("/design/"+code);

    
  };

  clearInterval = () => {
    clearInterval(this.interval);
  };

  

  render() {
    return (
      <div className="curatedStyles-wrapper">
        {this.props.design && this.props.design.length > 5 ? (
          <i
            className="fas fa-chevron-left curatedStyles-wrapper-slider curatedStyles-wrapper-slider-left"
            onMouseDown={this.leftSlide}
            onMouseUp={this.clearInterval}
          />
        ) : null}
        <div className="curatedStyles-curatorInfo-wrapper">
          <div className="curatedStyles-curatorInfo-image">
            <img
              src={require("../../images/curator-dp.png")}
              alt="curator dp"
            />
          </div>
          <div className="curatedStyles-curatorInfo-details">
            <div className="curatedStyles-curatorInfo-details-title">
              {this.props.content.name}
            </div>
            <div className="curatedStyles-curatorInfo-details-desc">
              {this.props.content.description}
            </div>

            <div className="curatedStyles-curatorInfo-details-exploreBtn">
              <a href={"/style/" + this.props.content.styleCode}>
                Explore this Style
              </a>
            </div>
          </div>
        </div>
        <div
          className="curatedStyles-wrapper-img-container"
          id="imgScroller"
        >
          {this.props.design &&
            this.props.design.map((data, i) => {
              return (
                <div
                  key={i}
                  onClick={()=>{this.imgClick(data.designCode)}}
                  className="curatedStyles-wrapper-img-small"
                >
                  <img src={data.coverImg} alt="" />
                </div>
              );
            })}
        </div>
        {this.props.design.length > 5 ? (
          <i
            className="fas fa-chevron-right  curatedStyles-wrapper-slider curatedStyles-wrapper-slider-right"
            onMouseDown={this.rightSlide}
            onMouseUp={this.clearInterval}
          />
        ) : null}{" "}
        
      </div>
    );
  }
}
const mapStateToProps = state =>({
  styles : state.styles,
  designs : state.designs 
})
export default connect(mapStateToProps,{})(CuratedStyles);
