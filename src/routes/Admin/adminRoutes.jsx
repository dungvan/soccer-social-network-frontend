import React from "react";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/Admin/UserProfile/UserProfile.jsx";
import UserList from "views/Admin/UserList/UserList.jsx";
import PostList from "views/Admin/PostList/PostList.jsx";
import TeamList from "views/Admin/TeamList/TeamList.jsx";
import PostExplore from "views/PostExplore/PostExplore";
import PostDetail from "views/PostDetail/PostDetail";
import { Switch, Route } from "react-router-dom";

import {
  Person,
  ContentPaste,
  Group,
  Pageview
} from "@material-ui/icons";
import { getCurrentUsername } from "utils";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={DashboardPage} />
      <Route path="/admin/user/:username" component={UserProfile} />
      <Route path="/admin/users" component={UserList} />
      <Route path="/admin/posts" component={PostList} />
      <Route path="/admin/teams" component={TeamList} />



      <Route path="/posts" component={PostExplore} />
      <Route path="/post/:id" component={PostDetail} />
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
