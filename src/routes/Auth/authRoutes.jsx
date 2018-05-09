import React from "react";
import AuthPage from "views/Auth/Auth.jsx";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  ContentPaste
} from "@material-ui/icons";

const AuthRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={AuthPage}/>
      <Redirect to="/login" />
    </Switch>
  );
}

const authSidebar = [
  {
    path: "/login",
    sidebarName: "Login",
    icon: ContentPaste,
    navbarName: "Login"
  }
]

export {
  AuthRoutes,
  authSidebar
};
