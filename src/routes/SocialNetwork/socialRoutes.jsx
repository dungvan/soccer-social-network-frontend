import React from "react";
import { Switch, Route } from "react-router-dom";

const SocialRoutes = () => {
  return (
    <Switch>
    <Route exact path="/" />
    <Route path="/user/:username" />
    </Switch>
  );
}
