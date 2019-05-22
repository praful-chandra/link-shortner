import React, { Component } from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {updateCurator} from "../../../../actions/curatorActions";

class dashboard extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            editProfile : false,
           curator : {
               isAuthenticated : false,
               curatorLoading : true
           }
        }
      }

      formData = new FormData();

  
      componentDidMount(){
          this.setState({
              curator : this.props.curator
          })
      }

      
  
      componentWillReceiveProps(nextProps){
          console.log(nextProps);
          
          if(nextProps.curator !== this.state.curator){
              this.setState({
                  curator : nextProps.curator
              })
          }
          }

      uploadAvatar = (e)=>{
        let file = e.target.files[0];
        this.formData.append("avatar",file);
        this.setState({
            curator :{
                ...this.state.curator,
                curator:{
                    ...this.state.curator.curator,
                    avatar : URL.createObjectURL(file)
                }
            }
        })
      }    

      handleBioChange=(e)=>{
          this.setState({
            curator :{
                ...this.state.curator,
                curator:{
                    ...this.state.curator.curator,
                    profile : e.target.value
                }
            }
          })
      }
      
      handleSaveProfile = (e)=>{
          e.preventDefault();
          this.formData.append("profile",this.state.curator.curator.profile);
          this.props.updateCurator(this.formData);
          this.setState({
              editProfile : false
          })

      }

      toggleEdit = ()=>{
        this.setState({
            editProfile : true
        })
      }

      viewStyles = ()=>{
          window.location.replace("/backend/curator/styles");
          
      }

    curatorData = () => {
        const currentCurator = this.state.curator.curator;
        return(
            <div>
           
           <div className="curatorPage-hero curator-landing container">
                        <div className="row">
                            <div className="col-md-5 mobile-curatorPage-hero-img ">
                                <div className="curatorPage-hero-image-wrapper curator-landing-hero-image-wrapper">
                                    <img src={this.state.curator.curator.avatar} alt="add avatar" />
                                </div>
                
                                <ul className="curatorPage-hero-image-dots curator-landing-hero-image-dots">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="col-md-7 curatorPage-hero-right-desktop">
                                <div className="curatorPage-hero-title ">
                                    <div className="curatorPage-hero-title-name curator-landing-hero-title-name">{currentCurator.name}</div>
                                    <div className="curator-landing-editProfile curator-landing-hero-title-editProfile" onClick={this.toggleEdit} > <i className="fas fa-pencil-alt"></i> edit profile</div>
                                </div>
            
                                <div className="curatorPage-hero-divider curatorPage-hero-divider-top curator-landing-hero-divider"> </div>
                                <div className="curatorPage-hero-text">
                                     <textarea className="curatorPage-hero-text-p1" 
                                     value={currentCurator.profile  ||   "no bio avaliable"} 
                                     disabled />
                                    
    
                
                                </div>
                
                                <div className="curatorPage-hero-divider curatorPage-hero-divider-bottom curator-landing-hero-divider"> </div>
                                <table className="curator-landing-hero-table">
                                    <tbody>
                                    <tr>
                                        <td>Styles Curated</td>
                                        <td>{currentCurator.styles.length}</td>
                                        <td>Followers</td>
                                        <td>{currentCurator.subscribers.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Labels</td>
                                        <td>null</td>
                                        <td>views</td>
                                        <td>null</td>
                                    </tr>
                                    <tr>
                                        <td>Designs</td>
                                        <td>{currentCurator.designs.length}</td>
                                        <td>Designs sold</td>
                                        <td>null</td>
                                    </tr>
                                    <tr>
                                        <td>Accessories</td>
                                        <td>null</td>
                                        <td>total sales amount</td>
                                        <td>null</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="curator-landing-hero-btn" onClick={this.viewStyles}>Styles and designs</div>
                            </div>
                            {/* <!-- ------------------------------------------------- Mobile version -------------------------------------------------------------------------------- --> */}
                
                            <div className="mobile-curatorPage mobile-curatorPage-box">
                                <div className="mobile-curatorPage-hero-title">
                                    <div className="curatorPage-hero-title-name curator-landing-hero-title-name">{currentCurator.name}</div>
                                    <div className="curator-landing-editProfile curator-landing-hero-title-editProfile" onClick={this.toggleEdit}> <i className="fas fa-pencil-alt"></i> edit profile</div>
                                </div>
                                <div className="mobile-curatorPage-hero-text">
                                <textarea className="curatorPage-hero-text-p1" 
                                     value={currentCurator.profile  ||   "no bio avaliable"} 
                                     disabled />   
                
                                </div>
                                <table className="curator-landing-hero-table ">
                                    <tbody>
                                    <tr>
                                        <td>Styles Curated</td>
                                        <td>{currentCurator.styles.length}</td>
                                        <td>Followers</td>
                                        <td>{currentCurator.subscribers.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Labels</td>
                                        <td>null</td>
                                        <td>views</td>
                                        <td>null</td>
                                    </tr>
                                    <tr>
                                        <td>Designs</td>
                                        <td>{currentCurator.designs.length}</td>
                                        <td>Designs sold</td>
                                        <td>null</td>
                                    </tr>
                                    <tr>
                                        <td>Accessories</td>
                                        <td>null</td>
                                        <td>total sales amount</td>
                                        <td>null</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="curator-landing-hero-btn" onClick={this.viewStyles}>Styles and designs</div>
                                    <br/>
                            </div>
                            {/* <!-- ------------------------------------------------- Mobile version -------------------------------------------------------------------------------- --> */}
                
                        </div>
                
                
                    </div>
          
        
            </div>
          );
    }
    
    editCuratorData = ()=>{
        const currentCurator = this.state.curator.curator;

       return (
        <div>
         <div className="curatorPage-hero curator-landing container">
                    <div className="row">
                        <div className="col-md-5 mobile-curatorPage-hero-img ">
                            <div className="curatorPage-hero-image-wrapper curator-landing-hero-image-wrapper">
                                <form method="post" encType="multipart/form-data">
                                  <label htmlFor="avatarUpload">
                                  <img className="curator-landing-hero-image-wrapper-edit"  src={currentCurator.avatar} alt="add avatar" />
                                  <div className="curator-landing-hero-image-wrapper-edit-overlay">
                                  <i className="fas fa-plus-circle"></i>
                                  <br/>
                                  change image
                                  </div>
                                  </label>
    
                                  <input id="avatarUpload" type="file" style={{display:"none"}} onChange={this.uploadAvatar}/>
                                </form>
    
                            </div>
            
                            <ul className="curatorPage-hero-image-dots curator-landing-hero-image-dots">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <div className="col-md-7 curatorPage-hero-right-desktop">
                            <div className="curatorPage-hero-title ">
                                <div className="curatorPage-hero-title-name curator-landing-hero-title-name">{currentCurator.name}</div>
                                <div className="curator-landing-editProfile curator-landing-hero-title-editProfile" onClick={this.handleSaveProfile}> <i className="fas fa-save"></i> Save profile</div>
                            </div>
        
                            <div className="curatorPage-hero-text-edit ">
                                 <textarea name="bio"  cols="40" rows="10" value={this.state.curator.curator.profile} onChange={this.handleBioChange}/>          
            
                            </div>
            
                            
                        </div>
                        {/* <!-- ------------------------------------------------- Mobile version -------------------------------------------------------------------------------- --> */}
            
                        <div className="mobile-curatorPage mobile-curatorPage-box">
                            <div className="mobile-curatorPage-hero-title">
                                <div className="curatorPage-hero-title-name curator-landing-hero-title-name">{currentCurator.name}</div>
                                <div className="curator-landing-editProfile curator-landing-hero-title-editProfile" onClick={this.editProfile}> <i className="fas fa-pencil-alt"></i> edit profile</div>
                            </div>
                            <div className="mobile-curatorPage-hero-text">
                            <textarea name="bio"  cols="40" rows="10" 
                            value={this.state.bio} onChange={this.handleBioChange}/>          

            
            
            
                            </div>
                            
            
                        </div>
                        {/* <!-- ------------------------------------------------- Mobile version -------------------------------------------------------------------------------- --> */}
            
                    </div>
            
            
                </div>
        </div>
    
      );
       }

  render(){

      if(!this.props.curator.isAuthenticated)
      return(<Redirect to="/backend/curator" />)
       if(this.state.curator.curatorLoading)
       return( <h1 className="jumbotron">LOADING ....</h1> )
       else
      return(
          <div>
        {this.state.editProfile ? this.editCuratorData() :this.curatorData()}

                      
         
          </div>
      )
     
  }
}
 
const mapStateToProps = state=>({
    curator : state.curator
})

export default connect(mapStateToProps,{updateCurator})(dashboard)