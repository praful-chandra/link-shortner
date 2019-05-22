import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { getAllTl } from "../../../../actions/tlActions";
import { getAllWriters } from "../../../../actions/writerActions";
import { getAllCurators } from "../../../../actions/curatorActions";
import { getAllStyles } from "../../../../actions/styleActions";
import { getAllDesigns } from "../../../../actions/designActions";  

import LeftDash from "./leftDash"; 
import Tl from "./tl";
import Curator from "./curator";
import Writer from "./writer";
import Notification from "./notifications";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderPanel: {
        tl: true,
        curator: false,
        writer: false,
        notifications: false
      },
      allTl: [],
      allWriters: [],
      allCurators: [],
      allStyles :[],
      allDesigns :[]
    };
  }

  componentDidMount() {
    this.props.getAllTl();
    this.props.getAllWriters();
    this.props.getAllCurators();
    this.props.getAllDesigns();
    this.props.getAllStyles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tl) {
      this.setState({
        allTl: nextProps.tl.allTl
      });
    }

    if (nextProps.writer) {
      this.setState({
        allWriters: nextProps.writer.allWriters
      });
    }

    if (nextProps.curator) {
      this.setState({
        allCurators: nextProps.curator.allCurator
      });
    }

    if (nextProps.styles) {
      
      this.setState({
        allStyles: nextProps.styles.allStyles
      });
    }

    if (nextProps.designs) {
      this.setState({
        allDesigns: nextProps.designs.allDesigns
      });
    }
  }

  panelToRender = data => {
    if (data !== this.state.renderPanel)
      this.setState({
        renderPanel: data
      });
  };

  renderPanel = () => {
    const panel = this.state.renderPanel;

    if (panel.tl)
      return (
        <Tl
          allTl={this.state.allTl}
          allWriter={this.state.allWriters}
          allCurator={this.state.allCurators}
          allStyles={this.state.allStyles}
        allDesigns={this.state.allDesigns}
        />
      );
    else if (panel.curator)
      return <Curator allCurator={this.state.allCurators}
       allStyles={this.state.allStyles}
        allDesigns={this.state.allDesigns} />;
    else if (panel.writer) return <Writer />;
    else if (panel.notifications) return <Notification />;
    else return null;
  };

  render() {
    return (
      <div className="adminDash">
        {!this.props.admin.isAuthenticated ? (
          <Redirect to="/backend/admin" />
        ) : null}

        <LeftDash render={this.panelToRender} />
        <div className="adminDash-right">{this.renderPanel()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
  tl: state.tl,
  writer: state.writer,
  curator: state.curator,
  styles : state.styles,
  designs : state.designs
});

export default connect(
  mapStateToProps,
  { getAllTl,
     getAllWriters, 
     getAllCurators ,
    getAllStyles,
  getAllDesigns}
)(Dashboard);
