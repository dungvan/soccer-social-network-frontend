import React from "react";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import UserList from "views/UserList/UserList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import AuthPage from "views/Auth/Auth.jsx";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  Dashboard,
  Person,
  ContentPaste
} from "@material-ui/icons";
import { getCurrentUsername, isAuthenticated } from "../../utils";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={DashboardPage} />
      <Route path="/admin/user/:username" component={UserProfile} />
      <Route path="/admin/users" component={UserList} />
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
    navbarName: "UserList"
  }
]

export {
  AdminRoutes,
  adminSidebar
};
