import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "../node_modules/antd/dist/antd"
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Reports from "./pages/Reports";
import AiSmartView from "./pages/AiSmartView";
import Dashboard from "./pages/Dashboard";
import MachinesParameter from "./pages/MachinesParameter";
import Camera from "./pages/Camera";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App" >
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/ai-smart-view" component={AiSmartView} />
          <Route exact path="/machines-parameter" component={MachinesParameter} />
          <Route exact path="/camera" component={Camera} />
          <Route exact path="/settings" component={Settings} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;