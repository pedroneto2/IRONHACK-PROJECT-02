import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TesterComponent from "./components/TesterComponent/TesterComponent";

import { Switch } from "react-router-dom";

import CustomRoute from "./utils/CustomRoute";

function Routes() {
  return (
    <div className="App">
      <NavBar linkList={["home", "test"]}>
        <Switch>
          <CustomRoute exact path="/test" component={TesterComponent} />
          <CustomRoute exact path="/register" component={Register} />
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/home" component={Home} />
          <CustomRoute exact path="/" component={Home} />
        </Switch>
      </NavBar>
    </div>
  );
}

export default Routes;
