import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {logOutAdmin} from "../../actions/adminActions";
import {logOutCurator} from "../../actions/curatorActions";
import {logOutWriter} from "../../actions/writerActions";
import logo from "../../images/curatorLogo.png";

class AdminNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  logOutAdmin = ()=>{
    this.props.logOutAdmin();
  }
  logOutCurator = ()=>{
    this.props.logOutCurator();
  }
  logOutwriter = ()=>{
    this.props.logOutWriter();
  }
  render() {
    return (
      <div className="myNavbar">
        <div className="myNavbar-logo">
          <NavLink to="/admin/auth">
            {" "}
            <img src={logo}  alt="INFRNT" />
          </NavLink>
        </div>
        <div className="myNavbar-links myNavbar-curator">
          <ul>
          
            <li>
              {this.props.admin && this.props.admin.isAuthenticated ? (<i className="fas fa-sign-out-alt myNavbar-links-login-icon" onClick={this.logOutAdmin} > logOut </i>) : null}
              {this.props.curator && this.props.curator.isAuthenticated ? (<i className="fas fa-sign-out-alt myNavbar-links-login-icon" onClick={this.logOutCurator} > logOut </i>) : null}
              {this.props.writer && this.props.writer.isAuthenticated ? (<i className="fas fa-sign-out-alt myNavbar-links-login-icon" onClick={this.logOutwriter} > logOut </i>) : null}

            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin : state.admin,
  curator: state.curator,
  writer : state.writer
});

export default connect(
  mapStateToProps,
  { logOutAdmin,
    logOutCurator,
    logOutWriter }
)(AdminNav);
