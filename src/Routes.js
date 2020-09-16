import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Login from "./core/Login";
import Pharma from "./core/Pharma";
import Shipper from "./core/Shipper";
import Wholeseller from "./core/Wholeseller";
import Distributor from "./core/Distributor";
import Admin from "./core/Admin";
import Trackshipment from "./core/Trackshipment";
import Developers from "./core/Developers";

export default function Roures() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/home" exact component={Home} />
        <Route path="/pharma" exact component={Pharma} />
        <Route path="/wholeseller" exact component={Wholeseller} />
        <Route path="/shipper" exact component={Shipper} />
        <Route path="/distributor" exact component={Distributor} />
        <Route path="/developers" exact component={Developers} />
        <Route path="/trackshipment/:id" exact component={Trackshipment} />
      </Switch>
    </BrowserRouter>
  );
}
