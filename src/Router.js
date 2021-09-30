import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import { Switch, Route } from "react-router-dom";

function Router() {
  return (
    <div className="App">
      <NavBar linkList={["home", "link2"]}>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </NavBar>
    </div>
  );
}

export default Router;
