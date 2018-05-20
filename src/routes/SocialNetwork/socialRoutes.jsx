import React from "react";
import { Switch, Route } from "react-router-dom";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import PostExplore from "views/PostExplore/PostExplore";
import PostDetail from "views/PostDetail/PostDetail";
import Logout from "views/Auth/Logout/Logout";
import {
  Home,
  Person,
  PowerSettingsNew
} from "@material-ui/icons";
import { getCurrentUsername } from "../../utils";

const SocialRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PostExplore} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/user/:username" component={UserProfile} />
      <Route path="/logout" component={Logout} />
    </Switch>
  );
}

const socialSidebar = [
  {
    path: "/",
    sidebarName: "Home",
    icon: Home,
    navbarName: "Home"
  },
  {
    path: "/user/" + getCurrentUsername(),
    sidebarName: "User Profile",
    icon: Person,
    navbarName: "User Profile"
  },
  {
    path: "/logout",
    sidebarName: "Logout",
    icon: PowerSettingsNew,
    navbarName: ""
  }
]

export {
  socialSidebar,
  SocialRoutes
}
