import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { DatePicker, TextField } from 'material-ui';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullName: '',
                birthday: null,
                username: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
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

    handleBirthdayChange(event, date) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                birthday: date
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.fullName && user.username && user.email && user.password && user.passwordConfirmation && user.birthday) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <div>
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="Username"
                        name="username"
                        value={user.username}
                        errorText={submitted && !user.username ? "Username is Required": null}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="Email"
                        name="email"
                        value={user.email}
                        errorText={submitted && !user.email ? "Email is Required": null}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <TextField
                        style={{width: '100%'}}
                        floatingLabelText="Full Name"
                        name="fullName"
                        value={user.fullName}
                        errorText={submitted && !user.fullName ? "Full Name is Required": null}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <DatePicker
                        floatingLabelText="Birthday"
                        name="birthday"
                        value={user.birthday}
                        errorText={submitted && user.birthday=== null ? "Birthday is Required": null}
                        onChange={this.handleBirthdayChange} />
                </div>
                <div>
                    <TextField
                        style={{width: '100%'}}
                        type="password"
                        floatingLabelText="Password"
                        name="password"
                        value={user.password}
                        errorText={submitted && !user.password ? "Password is Required": null}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <TextField
                        style={{width: '100%'}}
                        type="password"
                        floatingLabelText="Password Confirmation"
                        name="passwordConfirmation" value={user.passwordConfirmation}
                        errorText={submitted && !user.passwordConfirmation ? "Password Confirmation is Required": null}
                        onChange={this.handleChange} />
                </div>
                <div className="form-group" style={{paddingTop:'24px'}} >
                    <button className="btn btn-primary" onClick={this.handleSubmit} >Register</button>
                    {registering && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
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

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as Register };