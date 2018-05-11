import React from "react";
import { Switch, Route } from "react-router-dom";

const ManagerRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" />
      <Route path="/teams" />
      <Route path="/matches" />
      <Route path="/tournaments" />
    </Switch>
  );
}
  