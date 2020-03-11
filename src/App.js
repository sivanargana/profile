import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import Skills from './main/Skills';
export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div className="header">
          </div>
          <div className="sidebar">
            <NavLink to="/" exact>
              <i className="las la-inbox"></i>
              <strong>Dashboard</strong>
            </NavLink>
            <NavLink to="/skills" >
              <i className="las la-lightbulb"></i>
              <strong>Skills</strong>
            </NavLink>
            <NavLink to="/experience">
              <i className="las la-briefcase"></i>
              <strong>Experrience</strong>
            </NavLink>
            <NavLink to="/services">
              <i className="las la-cog"></i>
              <strong>Services</strong>
            </NavLink>
            <NavLink to="/awards">
              <i className="las la-trophy"></i>
              <strong>Awards</strong>
            </NavLink>
            <NavLink to="/projects">
              <i className="las la-copy"></i>
              <strong>Projects</strong>
            </NavLink>
          </div>
          <div className="body">
            <Switch>
              <Route path="/" exact>Dashboard</Route>
              <Route path="/skills"><Skills /></Route>
              <Route path="/experience">experience</Route>
              <Route path="/services">services</Route>
              <Route path="/awards">awards</Route>
              <Route path="/projects">projects</Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}
export default App
