import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/login";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <div className="App">
      <Router>

        <Route exact path="/" component={Login} />
        <Route  path="/dashboard" component={Dashboard} />
        
      </Router>
    </div>
  );
}

export default App;
