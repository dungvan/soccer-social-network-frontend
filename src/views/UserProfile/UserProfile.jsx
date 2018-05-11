import React, { Component } from "react";
import { Grid } from "material-ui";
import { connect } from "react-redux";
import { isCurrentUser } from "utils/auth-user";
import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

import avatar from "assets/img/faces/marc.jpg";
import { actions, userActions } from "../../actions";
import { postConstants } from "../../constants/post.constants";
import { isSuperAdmin } from "../../utils";

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        birthday: null,
        city: '',
        country: '',
        about: '',
        quote: ''        
      },
      password: '',
      password_confirmation: '',
      dateString: '',
      submitted: false,
      editable: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  _dateString(date) {
    let dateString = "1990-01-01";
    if (!!date) {
      date = new Date(date)
      const day = date.getDate();
      let dayString = day < 10 ? ("0"+day):day;
      const month = date.getMonth()+1;
      let monthString = month < 10 ? ("0"+month):month;
      dateString = date.getFullYear()+"-"+ monthString+"-"+dayString;
    } 
    return dateString
  }

  async componentWillMount(){
    try {
      await this.props.getByUsername(this.props.match.params.username).then(
        response => {
          this.props.dispatchSuccess(postConstants.GETONE_SUCCESS, {user: response})
          this.setState({
            user: response,
            editable: isCurrentUser(response) || isSuperAdmin(),
            dateString: this._dateString(response.birthday)
          })
        }
      )
    } catch (e) {
      if (e.bodyUsed) {
        e.data.then(
          error => {
            this.props.dispatchFailure(postConstants.GETONE_FAILURE, error, null)
          }
        )
        console.error(e)
        return
      }
      this.props.dispatchFailure(postConstants.GETONE_FAILURE, {message: e.message, errors: null}, null)
      console.error(e)
    }
  }

  handleChange(e) {
    const {name, value} = e.target;
    const {user} = this.state;
    if (name === "password" || name === "password_confirmation") {
      this.setState({[name]:value})
    }
    if (name === "birthday") {
      this.setState({user: {...user, birthday: new Date(value)}, dateString: value})
    } else {
      this.setState({user: {...user, [name]:value}})
    }
  }

  handleSubmit(e) {
    this.setState({submitted: true});
    const { user, password, password_confirmation } = this.state;
    if (password && password_confirmation) {
      this.props.update({...user, password, password_confirmation});
    } else {
      this.props.update(user);
    }
  }

  render () {
    const { user, editable, dateString, password, password_confirmation } = this.state;
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle="Edit Profile"
              cardSubtitle="Complete your profile"
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Username"
                        labelProps={{
                          shrink: true
                        }}
                        id="username"
                        inputProps={{
                          name:"user_name",
                          disabled:true,
                          value:user.user_name
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email"
                        labelProps={{
                          shrink: true
                        }}
                        id="email-address"
                        inputProps={{
                          name:"email",
                          disabled:true,
                          value:user.email
                        }}
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
                        labelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          disabled: !editable,
                          name:"first_name",
                          value: user.first_name,
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="last-name"
                        labelProps= {{
                            shrink: true
                        }}
                        inputProps={{
                          disabled: !editable,
                          name:"last_name",
                          value: user.last_name,
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Birthday"
                        id="birthday"
                        labelProps= {{
                          shrink: true
                        }}
                        inputProps={{
                          disabled: !editable,
                          name:"birthday",
                          type:"date",
                          value: dateString,
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        inputProps={{
                          disabled: !editable,
                          name:"city",
                          value: user.city,
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Country"
                        id="country"
                        inputProps={{
                          disabled: !editable,
                          name:"country",
                          value: user.country,
                          onChange: this.handleChange
                        }}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  {
                    editable &&
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Password"
                          id="password"
                          labelProps={{
                            shrink: true
                          }}
                          inputProps={{
                            name:"password",
                            type:"password",
                            value: password,
                            onChange: this.handleChange
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Confirm Password"
                          id="password-confirmation"
                          labelProps= {{
                              shrink: true
                          }}
                          inputProps={{
                            name:"password_confirmation",
                            type:"password",
                            value: password_confirmation,
                            onChange: this.handleChange
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                  }
                  {
                    editable &&
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Quote"
                          id="quote"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: !editable,
                            name:"quote",
                            value: user.quote,
                            onChange: this.handleChange
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                  }
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="About me."
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: !editable,
                          multiline: true,
                          rows: 5,
                          name:"about",
                          value: user.about,
                          onChange: this.handleChange
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                </div>
              }
              footer={<Button color="primary" onClick={this.handleSubmit} >Update Profile</Button>}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <ProfileCard
              avatar={avatar}
              subtitle={user.email}
              title={(!!user.first_name || !!user.last_name)?(user.first_name + " " + user.last_name):user.user_name}
              description={user.quote}
              footer={
                <Button color="primary" round>
                  Follow
                </Button>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading } = state.users
  return { loading }
}

export default connect(mapStateToProps, {
  update: userActions.update,
  getByUsername: userActions.getByUsername,
  dispatchSuccess: actions.success,
  dispatchFailure: actions.failure
})(UserProfile);
