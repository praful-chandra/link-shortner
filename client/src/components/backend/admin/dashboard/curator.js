import React, { Component } from 'react';
import CuratorProfile from "./viewprofile/curator";

export default class curator extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      view: {
        cards: true,
        profile: null,
        addProfile : false
      },
      newProfile : {
        name : "",
        email : "",
        password : ""
      },
      profile :{
        curator : null
            },
            curatorStyles :[],
            curatorDesigns :[]
    };
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
      curatorStyles ,
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



  renderCards = ()=>{
    let data= []
   this.props.allCurator.map(curator=>{
     data.push(
      <div className="col">
      <div className="profile-card">
          <div className="profile-card-body">
            <div className="profile-card-body-left" >
            <img src={curator.avatar} className="profile-card-body-left-avatar" alt=""/>
            <div className="profile-card-body-left-content">
            <div className="profile-card-body-left-name">
                {curator.name}
              </div>  
              <div className="profile-card-body-left-details">
              <ul>
                <li><i class="fas fa-tshirt"><div>{curator.styles.length} <br/> <span>styles</span></div></i></li>
                <li><i class="fas fa-pen-square"> <div>{curator.designs.length}  <br/> <span>designs</span></div> </i></li>
                <li><i class="fas fa-users"> <div>{curator.subscribers.length}  <br/> <span>Subs</span></div> </i></li>  
              </ul>
              <div className="profile-card-body-left-details-btn">
                <button className="btn btn-outline-light" onClick={()=>this.viewCurator(curator)}><span>View More</span></button>
              </div>
              </div>
            </div>
            </div>
            <div className="profile-card-body-right">
              <div className="profile-card-body-right-name">
                {curator.name}
              </div>  
              <div className="profile-card-body-right-description">
              {curator.profile || "no bio avaliable yet"}
    
              </div>
            </div>
          </div>
        </div>
      </div>
     )
   })
    return data
  }

  render() {
    
    return (
      <div className="adminDash container">
  {this.state.profile.curator ?
     <CuratorProfile 
     curator={this.state.profile.curator} 
     exit={this.closeCurator}
     curatorDesigns={this.state.curatorDesigns}
     curatorStyles={this.state.curatorStyles}
     /> : null}

{this.state.view.addProfile ? (
    <div className="adminDash-addProfile">
      <div className="container authPage-signIn adminAuth adminDash-addProfile-container">
      <i class="fas fa-times-circle adminDash-addProfile-close" style={{cursor : "pointer"}} onClick={this.viewCards}></i>              

      <h1>Add new Curator</h1>

      <form className="authPage-signIn-form" onSubmit={this.handleFormSubmit}>
  <input type="email" name="curatorEmail" placeholder="email" id="curatorEmail" onChange={this.inputChanged} required value={this.state.newProfile.email}/>
  <input type="password" name="curatorPassword" placeholder="password" id="curatorPassword" onChange={this.inputChanged} required value={this.state.newProfile.password}/>
  <input type="text" name="curatorName" placeholder="Name" id="curatorName" onChange={this.inputChanged} required value={this.state.newProfile.name}/>

  <input type="submit" className="authPage-signIn-form-btn adminAuth-btn" value="Log In"/>
</form>
      </div>

    </div>
  ) : null}
      <h3>CURATORS</h3>
      <div>
      <div className="row">
   {this.renderCards()}
      </div>
      </div>
    </div>
    )
  }
}
