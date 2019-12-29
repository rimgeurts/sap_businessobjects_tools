import React from "react";
import InstanceLayout from "./layouts/InstanceLayout";
import MainLayout from "./layouts/MainLayout";
import ManageLayout from "./layouts/ManageLayout";
import ScheduleLayout from "./layouts/ScheduleLayout";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Context from "./util/Context";

const App = () => {
  const [state, setState] = React.useState({
    menu: {
      drawerMenuOpen: true
    },
    reportId: "",
    isReportIdValid: false,
    logonToken: "",
    name: "",
    password: "",
    auth: "secEnterprise",
    server: "192.168.1.71:6405",
    error: "",
    reportIdChanged: false,
    isAuthenticated: false
  });

  return (
    <Context.Provider value={{ state, setState }}>
      <Router>
        <Route exact path="/" component={InstanceLayout} />
        <Route exact path="/instances" component={InstanceLayout} />
        <Route exact path="/instances/new" component={ScheduleLayout} />
        <Route exact path="/manage" component={ManageLayout} />
        
      </Router>
    </Context.Provider>
  );
};

export default App;
