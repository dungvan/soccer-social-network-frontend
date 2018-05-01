import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Router, Route, NavLink } from 'react-router-dom';
import { HeaderTitle } from './components/header-title';
import { Login } from './components/login';
import { Register } from './components/register';
import { history } from './utils';
import { alertActions } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => {this.setState({ open: false }); console.log("test")}

  render() {
    return (
        <Router history={history}>
          <MuiThemeProvider>
            <div>
              <Drawer
                open={this.state.open}
                docked={false}
                onRequestChange={(open) => this.setState({open})}
              >
                <AppBar
                  title="Socker Social"
                  onLeftIconButtonClick={this.handleToggle}
                />
                <NavLink to='/'>
                  <MenuItem onClick={this.handleClose}>
                    <p>Home</p>
                  </MenuItem>
                </NavLink>
                <NavLink to='/posts'>
                  <MenuItem onClick={this.handleClose}>
                    <p>Posts</p>
                  </MenuItem>
                </NavLink>
              </Drawer>
              <AppBar
                title={<HeaderTitle />}
                onLeftIconButtonClick={this.handleToggle}
              />
              <Route exact path='/' />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
            </div>
          </MuiThemeProvider>
        </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
