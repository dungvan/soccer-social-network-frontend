import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from 'actions';
import { Grid, InputLabel } from "material-ui";
import { CircularProgress } from 'material-ui/Progress';
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { classes, registering  } = this.props;
        const { user, submitted } = this.state;
        return (
              <div>
                <RegularCard
                  cardTitle="Register"
                  cardSubtitle="Complete your form"
                  content={
                    <div>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Username"
                            id="register-username"
                            inputProps={
                              {
                                onChange: this.handleChange,
                                name: "username",
                                value: user.username
                              }
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Email address"
                            id="email-address"
                            inputProps={
                              {
                                onChange: this.handleChange,
                                name: "email",
                                value: user.email
                              }
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </ItemGrid>
                      </Grid>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Password"
                            id="register-password"
                            inputProps={
                              {
                                type: "password",
                                onChange: this.handleChange,
                                name: "password",
                                value: user.password
                              }
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Confirm password"
                            id="password-confirmation"
                            inputProps={
                              {
                                type: "password",
                                onChange: this.handleChange,
                                name: "passwordConfirmation",
                                value: user.passwordConfirmation
                              }
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </ItemGrid>
                      </Grid>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="First Name"
                            id="first-name"
                            inputProps={
                              {
                                onChange: this.handleChange,
                                name: "firstName",
                                value: user.firstName
                              }
                            }
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Last Name"
                            id="last-name"
                            inputProps={
                              {
                                onChange: this.handleChange,
                                name: "lastName",
                                value: user.lastName
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
                      <Button color="primary" onClick={this.handleSubmit}>Register</Button>
                      {
                        registering && <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                    </div>
                  }
                />
              </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterForm = connect(mapStateToProps)(RegisterForm);
export { connectedRegisterForm as RegisterForm };