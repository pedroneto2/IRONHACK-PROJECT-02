import NavBar from "./components/NavBar/NavBar";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Home from "./components/Home/Home";
import ProfessionalHome from "./components/ProfessionalHome/ProfessionalHome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import ListServices from "./components/ListServices/ListServices";
import ServiceComponents from "./components/ServiceComponent/ServiceComponent";

//import TesterComponent from "./components/TesterComponent/TesterComponent";
import WorkingSettings from "./components/WorkingSettings/WorkingSettings";
import DoubtManager from "./components/DoubtManager/DoubtManager";

import { Switch, Redirect } from "react-router-dom";

import CustomRoute from "./utils/CustomRoute";

function Routes() {
  return (
    <div className="App">
      <NavBar
        linkList={[
          "home",
          "professional-home",
          "services",
          "about",
          "test",
          "working",
        ]}
      >
        <Switch>
          <CustomRoute
            exact
            path="/services/:serviceID"
            render={(routeProps) => (
              <ServiceComponents
                serviceID={routeProps.match.params.serviceID}
              />
            )}
          />
          <CustomRoute exact path="/working" component={WorkingSettings} />
          <CustomRoute exact path="/test" component={DoubtManager} />
          <CustomRoute exact path="/services" component={ListServices} />
          <CustomRoute exact path="/about" component={About} />
          <CustomRoute exact path="/register" component={Register} />
          <CustomRoute exact path="/login" component={Login} />

          <CustomRoute
            exact
            path="/professional-home/:tab"
            render={(routeProps) => (
              <ProfessionalHome
                defaultTab={routeProps.match.params.tab}
                routeProps={routeProps}
              />
            )}
          />
          <CustomRoute
            exact
            path="/professional-home"
            render={(routeProps) => <ProfessionalHome />}
          />
          <CustomRoute exact path="/home" component={Home} />
          <CustomRoute exact path="/not-found" component={PageNotFound} />
          <CustomRoute exact path="/" component={Home} />
          <CustomRoute
            path="/:anything"
            render={() => <Redirect to="/not-found" />}
          />
        </Switch>
      </NavBar>
    </div>
  );
}

export default Routes;
