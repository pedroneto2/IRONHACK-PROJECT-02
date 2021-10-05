import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./components/About/About";

import TesterComponent from "./components/TesterComponent/TesterComponent";

import { Switch } from "react-router-dom";

import CustomRoute from "./utils/CustomRoute";

function Routes() {
  return (
    <div className="App">
      <NavBar linkList={["home", "about", "test"]}>
        <Switch>
          <CustomRoute exact path="/test" component={TesterComponent} />
          <CustomRoute exact path="/about" component={About} />
          <CustomRoute exact path="/register" component={Register} />
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/home" component={Home} />
          <CustomRoute exact path="/" component={Home} />
          <CustomRoute path="/:notFound" component={PageNotFound} />
        </Switch>
      </NavBar>
    </div>
  );
}

export default Routes;
