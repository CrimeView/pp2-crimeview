/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Private from "./private/Private";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
import HistoricoReport from "views/historico/HistoricoReport.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import Listagem from "views/Listagem/Listagem.js";
import SectionDadosCadastrado from "views/dados/Dados";
import ConfigConta from "views/ConfigurarConta/ConfigurarConta";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/historico"
        render={(props) => <Private> <HistoricoReport {...props} /> </Private>}
      />

      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/dados"
        render={(props) => <Private> <SectionDadosCadastrado {...props} /> </Private>}
      />



<Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/configurar"
        render={(props) => <Private> <ConfigConta {...props} /> </Private>}
      />



      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/usuarios"
        render={(props) => <Listagem {...props} />}
      />
      <Route
        path="/admin"
        render={(props) => <RegisterPage {...props} />}
      />
      
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>
);
