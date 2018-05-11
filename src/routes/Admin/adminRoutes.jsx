import React from "react";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import UserList from "views/UserList/UserList.jsx";
import PostList from "views/PostList/PostList";
import TeamList from "views/TeamList/TeamList";
import { Switch, Route } from "react-router-dom";

import {
  Person,
  ContentPaste,
  Group,
  Pageview
} from "@material-ui/icons";
import { getCurrentUsername } from "../../utils";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={DashboardPage} />
      <Route path="/admin/user/:username" component={UserProfile} />
      <Route path="/admin/users" component={UserList} />
      <Route path="/admin/posts" component={PostList} />
      <Route path="/admin/teams" component={TeamList} />
    </Switch>
  );
}

const adminSidebar = [
  {
    path: "/admin/user/" + getCurrentUsername(),
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
  }
]

export {
  AdminRoutes,
  adminSidebar
};
