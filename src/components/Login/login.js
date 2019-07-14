import React, { Component } from 'react'
import {Redirect} from "react-router-dom";

export default class login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isAuthenticated  : false
        }
    }
    

    login = (e) =>{
        e.preventDefault();
        
        this.setState({
            isAuthenticated : true
        })
    }

    render() {
        if(!this.state.isAuthenticated)
        return (
            <div className="login-wrapper">
                <div className="login-body">
                        <div className="login-body-circle login-body-circle-1"></div>
                        <div className="login-body-circle login-body-circle-2"></div>
                </div>
                <div className="login-content">

                    <div className="login-content-left">
                        <div className="login-content-left-logo">
                            <img src={require("../../images/logo.png")} alt=""/>
                        </div>

                            <form  className="login-content-left-form" onSubmit={this.login}>
                                <label htmlFor="login-form-email">E-mail</label>
                                <input type="email" name="email" id="login-form-email"/>
                                <label htmlFor="login-form-password">Password</label>
                                <input type="password" name="password" id="login-form-password"/>

                                <button type="submit">LOGIN</button>
                            </form>

                    </div>

                    <div className="login-content-right">
                        <span>
                        MANAGE AND SHORTEN YOUR LINKS 
                        </span>
                    </div>

                    </div>
            
            </div>
        )
        else{
            return(
                <Redirect to="/dashboard"/>
            )
        }
    }
}
