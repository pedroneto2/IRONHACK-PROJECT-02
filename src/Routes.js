import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { Switch, Route } from "react-router-dom";

function Routes() {
  return (
    <div className="App">
      <NavBar linkList={["home", "link2"]}>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
        </Switch>
      </NavBar>
    </div>
  );
}

export default Routes;
