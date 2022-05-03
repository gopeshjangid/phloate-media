import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import { Provider } from "react-redux";

import "./app.scss";

import Home from "pages/Home";
import Manifesto from "pages/Manifesto";
import DearArtist from "pages/DearArtist";
import JoinUs from "pages/JoinUs";
import Contest from "pages/Contest";

import { Layout } from "./layouts/layout";

function App({ store }) {
  return (
    <Provider store={store}>
      <div className="react-lab-app">
        <HashRouter>
          <Layout>
            <Switch>
              <Route exact component={Home} path="/" />
              <Route component={Manifesto} path="/manifesto" />
              <Route component={DearArtist} path="/faq" />
              <Route component={JoinUs} path="/subscribe" />
              <Route component={Contest} path="/contest" />
            </Switch>
          </Layout>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
