import React, { Component } from 'react'
import {connect} from "react-redux";

import {getCurrentCurator} from "../../../actions/curatorActions";

 class checkCuratorAuth extends Component {
            constructor(props) {
            super(props)

            this.state = {
                curator : {
                    isAuthenticated : false
                }
            }
            }


    componentDidMount(){
        
        if(localStorage.jwtToken && !this.state.curator.isAuthenticated){
  
        this.props.getCurrentCurator(localStorage.jwtToken);
        
        }else{
          window.location.replace("/backend/curator");

        }
         
       }

       componentWillReceiveProps(nextProps){

        if(nextProps.curator !== this.state.curator && !nextProps.curator.curatorLoading){
        
          if(!nextProps.curator.isAuthenticated)  
          window.location.replace("/backend/curator");
         
        }

       }

  render() {
    return null
  }
}

const mapStateToProps = state=>({
curator : state.curator
})

export default connect(mapStateToProps,{getCurrentCurator})(checkCuratorAuth)