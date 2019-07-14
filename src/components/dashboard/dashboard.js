import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCompass,
  faLink,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import ViewLink from "./viewLink/viewLink";

export default class dashboard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       viewLink : false
    }
  }
  
  viewLinkStats= ()=>{
      this.setState({
        viewLink : !this.state.viewLink
      })
  }

  logout = ()=>{
    window.location.replace("/")
  }

  render() {
    return (
      <>
             {this.state.viewLink ? 
              <ViewLink 
              closeLinkStats={this.viewLinkStats}/>
            : null}

      <div className="dashboard">
        {/* Left Panel */}
        <div className="dashboard-left">
          <div className="dashboard-left-topBar">
            <div className="dashboard-left-topBar-logo">
              <img src={require("../../images/logo.png")} alt="" />
            </div>
            <div className="dashboard-left-topBar-search">
              <input
                type="text"
                name="search"
                id="link-searchBar"
                placeholder="Search Links"
              />
              <button>
                {" "}
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
        
          </div>
          <div className="dashboard-left-add">
            <input
              type="text"
              name="add"
              id="add"
              placeholder="Paste your Link here to shorten"
            />
            <button>GO</button>
          </div>
          <div className="dashboard-left-list">
            <div className="dashboard-left-list-head">
              ALL LINKS
            </div>
            <ul>
            <li onClick={this.viewLinkStats}> click here for demo <span>something</span> </li>
            <li>something <span>something</span> </li>
            <li>something <span>something</span> </li>
            <li>something <span>something</span> </li>
            <li>something <span>something</span> </li>
            </ul>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="dashboard-divider">
          <div className="dashboard-divider-line" />
        </div>

        {/* right panel */}
        <div className="dashboard-right">
          <div className="dashboard-right-profile">
            <div className="dashboard-right-profile-image">
              <img src={require("../../images/curator.png")} alt="" />
            </div>
            <div className="dashboard-right-profile-name">Some curator</div>
            <div className="dashboard-right-profile-type">Curator</div>
          </div>
          <ul className="dashboard-right-stats">
            <li>
              <div className="dashboard-right-stats-icon">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="dashboard-right-stats-count">77</div>
              <div className="dashboard-right-stats-name">Total Views</div>
            </li>
            <li>
              <div className="dashboard-right-stats-icon">
                <FontAwesomeIcon icon={faCompass} />
              </div>
              <div className="dashboard-right-stats-count">77</div>
              <div className="dashboard-right-stats-name">Top Location</div>
            </li>{" "}
            <li>
              <div className="dashboard-right-stats-icon">
                <FontAwesomeIcon icon={faLink} />
              </div>
              <div className="dashboard-right-stats-count">77</div>
              <div className="dashboard-right-stats-name">Total Links</div>
            </li>
          </ul>
          <div className="dashboard-right-topLinks-title">Top Links</div>
          <ul className="dashboard-right-topLinks">
            <li className="dashboard-right-topLinks-item">
              Top Links <span>77</span>{" "}
            </li>
            <li className="dashboard-right-topLinks-item">
              Top Links <span>77</span>{" "}
            </li>
            <li className="dashboard-right-topLinks-item">
              Top Links <span>77</span>{" "}
            </li>
            <li className="dashboard-right-topLinks-item">
              Top Links <span>77</span>{" "}
            </li>
            <li className="dashboard-right-topLinks-item">
              Top Links <span>77</span>{" "}
            </li>
          </ul>

          <div className="dashboard-right-accountLinks">
            <div className="dashboard-right-accountLinks-item">Account</div>
            <div className="dashboard-right-accountLinks-item" onClick={this.logout}>Logout</div>
          </div>
        </div>
      </div>
      </>
    );
  }
}
