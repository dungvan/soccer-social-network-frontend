import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardPage from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import UserList from "views/Admin/UserList/UserList";
import PostList from "views/Admin/PostList/PostList";
import TeamList from "views/Admin/TeamList/TeamList";
import PostExplore from "views/PostExplore/PostExplore";
import PostDetail from "views/PostDetail/PostDetail";
import Logout from "views/Auth/Logout/Logout";
import MatchExplore from "views/MatchExplore/MatchExplore";
import Match from "views/Manager/Match/Match";
import MatchProfile from "views/MatchProfile/MatchProfile";
import TeamProfile from "views/TeamProfile/TeamProfile";
import Team from "views/Manager/Team/Team";
import MatchList from "views/Admin/MatchList/MatchList";
import Tournament from "views/Manager/Tournament/Tournament";


const ManagerRoutes = () => {
  return (
    <Switch>
    <Route exact path="/" component={PostExplore} />
    <Route path="/post/:id" component={PostDetail} />
    <Route path="/logout" component={Logout} />
    <Route path="/matches" component={MatchExplore} />
    <Route path="/managers/matches" component={Match} />
    <Route path="/managers/teams" component={Team} />
    <Route path="/managers/tournaments" component={Tournament} />
    <Route exact path="/user/:username" component={UserProfile} />
    <Route path="/user/:username/matches" component={MatchProfile} />
    <Route path="/user/:username/teams" component={TeamProfile} />
    </Switch>
  );
}
