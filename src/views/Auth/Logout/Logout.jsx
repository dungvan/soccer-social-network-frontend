import { Component } from "react";
import { clearLoginedUser } from "../../../utils";

class Logout extends Component {
  constructor(props) {
    super(props)
    clearLoginedUser()
    this.props.history.push('/login')
    window.location.reload()
  }
}

export default Logout;