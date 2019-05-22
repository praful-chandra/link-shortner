import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

import logo from "../../images/logo.png";

import {getCurrentUser,logoutUser} from "../../actions/userActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: {
        reports: false,
        styles: false
      }
    };
  }

  setActive = () => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname.includes("/blog")
    ) {
      this.setState({
        active: {
          reports: true,
          styles: false
        }
      });
    } else if (window.location.pathname.includes("/style") ){
      this.setState({
        active: {
          reports: false,
          styles: true
        }
      });
    }
  };

  logoutUser = ()=>{
    this.props.logoutUser();
  }

  componentDidMount() {
    this.setActive();
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="myNavbar">
        <div className="myNavbar-logo">
          <NavLink to="/blog">
            {" "}
            <img src={logo} alt="INFRNT" />
          </NavLink>
            {" "}
        </div>

        <div className="myNavbar-links">
          <ul>
            <li onClick={this.setActive}>
              <NavLink
                to="/blog"
                className={classnames({
                  "active-navLink": this.state.active.reports
                })}
              >
                <button> Infrnt Reports</button>
              </NavLink>
            </li>
            <li onClick={this.setActive}>
              <NavLink
                to="/styles"
                className={classnames({
                  "active-navLink": this.state.active.styles
                })}
              >
                <button>Curated Styles</button>
              </NavLink>
            </li>
            <li className="myNavbar-user-auth">
                  {!this.props.user.isAuthenticated ? 
                  <a href="/api/userauth/glogin" className="btn bigger"><i className="fas fa-sign-in-alt"> signin</i></a>:
                 <button onClick={this.logoutUser}><i className="fas fa-sign-out-alt">logout</i></button> }
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {};

const mapStateToProps = state => ({
  user : state.user
});
export default connect(
  mapStateToProps,
  {getCurrentUser,
    logoutUser}
)(Navbar);
