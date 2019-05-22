import React, { Component } from "react";
import {connect} from "react-redux";
import {getTlByCode} from "../../../../actions/tlActions";

import AddTlForm from "./addProfiles/AddTlForm";
import AddCuratorForm from "./addProfiles/addCuratorForm";
import AddWriterForm from "./addProfiles/addWriterForm";

import CuratorProfile from "./viewprofile/curator";

 class tl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: {
        cards: true,
        addProfile : false,
        addCurator :false,
        addWriter:false
      },
      tl:{
        tlLoading : false,
        selectedTl:{
          name : "tl"
        }
      },
      profile :{
        curator : null,
        writer : null
      },
      curatorStyles : [] ,
      curatorDesigns : []
    };
  }
  componentDidMount(){
 
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tl !== this.state.tl){
      this.setState({
        tl : nextProps.tl
      })
    }
    
  }




  viewProfile = (tlCode) => {
    this.props.getTlByCode(tlCode);
    this.setState({
      view:{
        ...this.state.view,
        cards : false,
        addCurator : false,
        addProfile : false,
        addWriter: false
      }
    })
  };

  viewCards= ()=>{
    this.setState({
      view : {
        cards : true,
        addProfile : false,
        addCurator : false,
        addWriter : false
      },
      tl:{
        ...this.state.tl,
        selectedTl : null
      }
    })
  }

  viewAddProfile = ()=>{
    this.setState({
      view :{
        cards : false,
        profile : null,
        addProfile : true,
        addCurator : false,
        addWriter : false
      }
    })
  }

  viewAddCurator = ()=>{
    this.setState({
      view :{
        cards : false,
        profile : null,
        addProfile : false,
        addCurator : true,
        addWriter : false
      }
    })
  }

  viewAddWriter = ()=>{
    this.setState({
      view :{
        cards : false,
        profile : null,
        addProfile : false,
        addCurator : false,
        addWriter : true
      }
    })
  }

  viewCurator=(curator)=>{

    const curatorStyles= this.props.allStyles.filter(style=>{
      return(style.curatorCode === curator.curatorCode)
    })
    const curatorDesigns= this.props.allDesigns.filter(design=>{
      return(design.curatorCode === curator.curatorCode)
    })

    this.setState({
      profile:{
        curator ,
        writer : null
      },
      curatorStyles,
      curatorDesigns
    })
  }

  closeCurator=()=>{
    this.setState({
      profile:{
        curator : null,
        writer : null
      }
    })
  }

  renderCards = () => {
   const data = [];

   this.props.allTl.map(tl=>{
     data.push(
      <div className="col" key={tl.tlCode}>
      <div className="profile-card">
        <div className="profile-card-body">
          <div className="profile-card-body-left">
            <img
              src={tl.avatar}
              className="profile-card-body-left-avatar"
              alt=""
            />
            <div className="profile-card-body-left-content">
              <div className="profile-card-body-left-name">
               { tl.name}
              </div>
              <div className="profile-card-body-left-details">
                <ul>
                  <li>
                    <i className="fas fa-tshirt">
                      {" "}
                      <div>
                       {tl.curators.length}<br /> <span>curator</span>{" "}
                      </div>{" "}
                    </i>
                  </li>
                  <li>
                    <i className="fas fa-pen-square">
                      {" "}
                      <div>
                        {tl.writers.length} <br /> <span>writer</span>
                      </div>{" "}
                    </i>
                  </li>
                  {/* <li>
                    <i className="fas fa-trophy">
                      {" "}
                      <div>
                        50 <br /> <span>other</span>
                      </div>{" "}
                    </i>
                  </li> */}
                </ul>
                <div className="profile-card-body-left-details-btn">
                  <button
                    className="btn btn-outline-light"
                    onClick={()=>this.viewProfile(tl.tlCode)}
                  >
                    <span>View More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-card-body-right">
            <div className="profile-card-body-right-name">
              {tl.name}
            </div>
            <div className="profile-card-body-right-description">
              {tl.description  || "no description avaliable yet"}
            </div>
          </div>
        </div>
      </div>
    </div>
     )
   })

   return data;
  };

  profileCard = (who)=>{


    return(
      <div className="profile-card-small">
      <div className="profile-card-small-head">{who}</div>
      <ul className="profile-card-small-list">
      { who === "writer" &&   this.props.allWriter.map(writerData=>{

        if(writerData.tlCode === this.state.tl.selectedTl.tlCode ){
          
          return(
            <li>
            <div className="profile-card-small-list-li-container">
            <div className="profile-card-small-list-li-container-name">
            <div>
                  {writerData.name}
                </div>
                                      </div>
              <div className="profile-card-small-list-li-container-Details profile-card-small-list-li-container-Details">
              <button className="btn btn-outline-light btn-block">View</button>
    
              </div>
            </div>
    
          </li>
          )
         
        } 
      })}

{ who === "curator" && this.props.allCurator.map(curatorData=>{

if(curatorData.tlCode === this.state.tl.selectedTl.tlCode ){
  
  return(
    <li>
    <div className="profile-card-small-list-li-container">
    <div className="profile-card-small-list-li-container-name">
    <div>
          {curatorData.name}
        </div>
                              </div>
      <div className="profile-card-small-list-li-container-Details profile-card-small-list-li-container-Details">
      <button className="btn btn-outline-light btn-block" onClick={()=>this.viewCurator(curatorData)}>View</button>

      </div>
    </div>

  </li>
  )
 
} 
})}
 


      </ul>
    </div>
    )
  }


 

  render() {    
    
    if(this.state.tl.tlLoading){
      return ( <h1 className="jumbotron">LOADING .....</h1> )
    }else
    return (
      <div className="adminDash container">

  {this.state.view.addProfile ? (   <AddTlForm viewCards={this.viewCards} />   ) : null}
  {this.state.view.addCurator ? <AddCuratorForm viewCards={this.viewCards} tlCode={this.state.tl.selectedTl.tlCode} /> : null}
  {this.state.view.addWriter ? <AddWriterForm viewCards={this.viewCards} tlCode={this.state.tl.selectedTl.tlCode} /> : null}

  {this.state.profile.curator ? <CuratorProfile 
  curator={this.state.profile.curator} 
  curatorDesigns={this.state.curatorDesigns}
  curatorStyles={this.state.curatorStyles}
  exit={this.closeCurator}/> : null}

        {this.state.view.cards ? (
          <>
            <h3>Team Leaders</h3>
            <div>
              <div className="row">{this.renderCards()}</div>

            </div>
            <div className="profile-card-add tl-addBtn">
                <div className="profile-card-add-btn" onClick={this.viewAddProfile}>
                <i className="fas fa-plus"></i>
                </div>
               </div>
          </>
        ) : null}
        {this.state.tl.selectedTl ? (
          <div>

            <div className="profile-head">{this.state.tl.selectedTl.name} 
             <i className="fas fa-times-circle" style={{cursor : "pointer"}} onClick={this.viewCards}></i></div>
             <div className="profile-moreInfo bigger">
              <ul>
                <li><span className="profile-moreInfo-head">Email</span>  <span className="profile-moreInfo-body">{this.state.tl.selectedTl.email}</span></li>
                <li><span className="profile-moreInfo-head">TL Code</span>  <span className="profile-moreInfo-body">{this.state.tl.selectedTl.tlCode}</span></li>
                <li><span className="profile-moreInfo-head">is Init</span>  <span className="profile-moreInfo-body">{this.state.tl.selectedTl.isInit ? "YES" : "NO"}</span></li>

              </ul>
             </div>
            <div className="row profile-card-row">
              <div className="col">
               {this.profileCard("curator")}
               <div className="profile-card-add">
                <div className="profile-card-add-btn" onClick={this.viewAddCurator}>
                <i className="fas fa-plus"></i>
                </div>
               </div>
              </div>
              <div className="col">
              {this.profileCard("writer")}
              <div className="profile-card-add">
                <div className="profile-card-add-btn" onClick={this.viewAddWriter}>
                <i className="fas fa-plus"></i>
                </div>
               </div>
              </div>
            </div>
          </div>
        ) : null}


      </div>
    );
  }
}
const mapStateToProps = state=>({
tl : state.tl
})
export default connect(mapStateToProps,{getTlByCode})(tl)