import React from "react";
import DashboardPage from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import UserList from "views/Admin/UserList/UserList";
import PostList from "views/Admin/PostList/PostList";
import TeamList from "views/Admin/TeamList/TeamList";
import PostExplore from "views/PostExplore/PostExplore";
import PostDetail from "views/PostDetail/PostDetail";
import Logout from "views/Auth/Logout/Logout";
import MatchExplore from "views/MatchExplore/MatchExplore";
import { Switch, Route } from "react-router-dom";

import {
  Person,
  ContentPaste,
  Group,
  Pageview,
  PowerSettingsNew
} from "@material-ui/icons";
import { getCurrentUsername } from "utils";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={DashboardPage} />
      <Route path="/user/:username" component={UserProfile} />
      <Route path="/admin/users" component={UserList} />
      <Route path="/admin/posts" component={PostList} />
      <Route path="/admin/teams" component={TeamList} />
      <Route exact path="/" component={PostExplore} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/logout" component={Logout} />
      <Route path="/matches" component={MatchExplore} />
    </Switch>
  );
}

const adminSidebar = [
  {
    path: "/user/" + getCurrentUsername(),
    sidebarName: "User Profile",
    icon: Person,
    navbarName: "User Profile"
  },
  {
    path: "/admin/users",
    sidebarName: "User List",
    icon: ContentPaste,
    navbarName: "User List"
  },
  {
    path: "/admin/posts",
    sidebarName: "Post List",
    icon: Pageview,
    navbarName: "Post List"
  },
  {
    path: "/admin/teams",
    sidebarName: "Team List",
    icon: Group,
    navbarName: "Team List"
  },
  {
    path: "/logout",
    sidebarName: "Logout",
    icon: PowerSettingsNew,
    navbarName: ""
  }
]

export {
  AdminRoutes,
  adminSidebar
};
