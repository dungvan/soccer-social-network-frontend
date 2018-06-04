import React from "react";
import { Switch, Route } from "react-router-dom";
import UserProfile from "views/UserProfile/UserProfile";
import PostExplore from "views/PostExplore/PostExplore";
import PostDetail from "views/PostDetail/PostDetail";
import Logout from "views/Auth/Logout/Logout";
import MatchExplore from "views/MatchExplore/MatchExplore";
import Match from "views/Manager/Match/Match";
import MatchProfile from "views/MatchProfile/MatchProfile";
import TeamProfile from "views/TeamProfile/TeamProfile";
import Team from "views/Manager/Team/Team";
import {
  Person,
  PowerSettingsNew,
  Group,
  FilterList
} from "@material-ui/icons";
import { getCurrentUsername } from "../../utils";
import PostProfile from "views/PostProfile/PostProfile";
import Find from "../../views/Find/Find";
import MatchesFilter from "../../views/MatchesFilter/MatchesFilter";

const SocialRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PostExplore} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/logout" component={Logout} />
      <Route path="/matches" component={MatchExplore} />
      <Route path="/managers/matches" component={Match} />
      <Route path="/managers/teams" component={Team} />
      <Route exact path="/user/:username" component={UserProfile} />
      <Route path="/user/:username/matches" component={MatchProfile} />
      <Route path="/user/:username/teams" component={TeamProfile} />
      <Route path="/user/:username/posts" component={PostProfile} />
      <Route path="/find" component={Find} />
      <Route path="/matches-filter" component={MatchesFilter} />
    </Switch>
  );
}

const socialSidebar = [
  {
    path: "/matches-filter",
    sidebarName: "Matches today",
    icon: FilterList,
    navbarName: "Matches today"
  },
  {
    path: "/user/" + getCurrentUsername(),
    sidebarName: "User Profile",
    icon: Person,
    navbarName: "User Profile"
  },
  {
    path: "/managers/teams",
    sidebarName: "Teams",
    icon: Group,
    navbarName: "Teams"
  },
  {
    path: "/managers/matches",
    sidebarName: "Matches",
    icon: Group,
    navbarName: "Matches"
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
