
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../../../actions';
import { Grid, InputLabel } from "material-ui";
import { CircularProgress } from 'material-ui/Progress';
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";
import { isAuthenticated } from "utils";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const {username, password} = this.state;
    const {dispatch} = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const {history, classes, loggingIn, loggedIn} = this.props;
    const {username, password} = this.state;
    return (
      <div>
        <RegularCard
          cardTitle="Login"
          cardSubtitle="Complete your form"
          content={
            <div>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    inputProps={
                      {
                        onChange: this.handleChange,
                        name: "username",
                        value: username
                      }
                    }
                    formControlProps={{
                      fullWidth: true
                    }}/>
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      value={password}
                      inputProps={
                        {
                          type: "password",
                          onChange: this.handleChange,
                          name: "password",
                          value: password
                        }
                      }
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
            </div>
          }
          footer={
            <div>
              <Button color="primary" onClick={this.handleSubmit}>Login</Button>
              {
                loggingIn && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              {
                loggedIn && history.push("/")
              }
            </div>
          }
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {loggingIn} = state.authentication;
  return {loggingIn};
}

const connectedLoginForm = connect(mapStateToProps)(LoginForm);
export { connectedLoginForm as LoginForm};
