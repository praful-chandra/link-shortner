import React, { Component } from "react";
import "./App.scss";
import {  BrowserRouter as Router,  Route,  Switch,  Redirect} from "react-router-dom";
import { Provider } from "react-redux";


import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';


import store from "./store";

import Navbar from "./components/Navbar/Navbar";
import AdminNav from "./components/Navbar/AdminNav";
import Reports from "./components/reports";
import viewArticle from "./components/article/ViewArticle";
import Styles from "./components/Styles";
import StylePage from "./components/styles/StylePage";
import Profile from "./components/Curator/Profile";
import AuthPage from "./components/auth/Auth";
import DesignPage from "./components/design/designPage";

import Admin from "./components/backend/admin/Admin";
import AdminDashboard from "./components/backend/admin/dashboard/Dashboard";

import WriterAuth from "./components/backend/writer/writerAuth";
import writerDash from "./components/backend/writer/dashboard/writerDash";
import AddBlog from "./components/backend/writer/addBlog";

import CuratorAuth from "./components/backend/curator/curatorAuth";
import CuratorDashboard from "./components/backend/curator/dashboard/dashboard";
import CuratorStyles from "./components/backend/curator/dashboard/styles";

export default class App extends Component {
  


  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {window.location.pathname.includes("/backend") ? <AdminNav /> : <Navbar/>}

            <Route exact path="/" component={Reports} />
            <Route exact path="/blog" component={Reports} />
            <Route exact path="/blog/:id" component={viewArticle} />
            <Route exact path="/styles" component={Styles} />
            <Route exact path="/style/:id" component={StylePage} />
            <Route exact path="/curator/:id" component={Profile} />
            <Route path="/auth" component={AuthPage} />
            <Route exact path="/design/:id" component={DesignPage} />

            <Route exact path="/backend/admin" component={Admin} />
            <Route exact path="/backend/admin/dashboard"  component={AdminDashboard} />

            <Route exact path="/backend/writer" component={WriterAuth} />
            <Route exact path="/backend/writer/dashboard" component={writerDash} />
            <Route exact path="/backend/writer/addblog" component={AddBlog} />

            <Route exact path="/backend/curator" component={CuratorAuth} />
            <Route exact path="/backend/curator/dashboard" component={CuratorDashboard} />
            <Route exact path="/backend/curator/styles" component={CuratorStyles} />

          </div>
        </Router>
      </Provider>
    );
  }
}
