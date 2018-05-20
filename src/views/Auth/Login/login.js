
import React from 'react';
import {connect} from 'react-redux';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { actions, userActions } from 'actions';
import { Grid } from "material-ui";
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";
import { userConstants } from '../../../constants';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      formErrors: {},
      errorMessage: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({submitted: true});
    const { username, password } = this.state;
    const {formErrors, isValid} = this._validate({ username, password })
    this.setState({ formErrors, errorMessage: [] })
    if (!isValid) {
      return
    }

    try {
      await this.props.login(username, password)
      this.props.history.push("/")
      window.location.reload()
    } catch(e) {
      if (e.bodyUsed) {
        e.data.then(error => {
          this.props.dishpathFailure(userConstants.LOGIN_FAILURE, error)
          this.setState({errorMessage: error.errors})
        });
        return
      }
      this.props.dishpathFailure(userConstants.LOGIN_FAILURE, {message: e.message, errors: null})
    }
  }

  _validate(formData) {
    const formErrors = {}
    if(validator.isEmpty(formData.username)) {
      formErrors.username = "This field is required"
    }
    if(validator.isEmpty(formData.password)) {
      formErrors.password = "This field is required"
    }

    return {
      formErrors,
      isValid: isEmpty(formErrors) ? true : false
    }
  }

  render() {
    const {loggingIn} = this.props;
    const {username, password, formErrors, errorMessage} = this.state;
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
                        value: username,
                      }
                    }
                    error={!!formErrors.username}
                    errorLabel={formErrors.username}
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
                      error={!!formErrors.password}
                      errorLabel={formErrors.password}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                {
                  errorMessage.map((message, index) => {
                    return <p key={index} style={{color:"red"}}>{message}</p>
                  })
                }
            </div>
          }
          footer={
            <div>
              <Button color="primary" onClick={this.handleSubmit}>Login</Button>
              {
                loggingIn && <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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

const connectedLoginForm = connect(mapStateToProps, {
  login: userActions.login,
  dishpathFailure: actions.failure 
})(LoginForm);
export { connectedLoginForm as LoginForm};
