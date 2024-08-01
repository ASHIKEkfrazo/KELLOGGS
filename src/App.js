import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";import SignUp from "./pages/SignUp";
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
// import Settings from "./pages/Settings";
import Login from "./pages/Auth/Login";

import Layout from "./pages/Layout";
function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
   
      children: [
        {
          path: "", 
          element: <Dashboard />,
        },
        {
         path: 'dashboard-home',
          element: <Dashboard />,
        },
        {
          path: 'reports',
          element: <Reports />,
        },
        {
          path: 'ai-smart-view',
          element: <AiSmartView />,
        },
        {
          path: 'machine-parameter',
          element: <MachinesParameter />,
        },
        {
          path: 'system-status',
          element: <Camera />,
        },
        {
          path: 'settings',
          element: <Settings />,
        }, 
        //   {
        //   path: 'insights',
        //   element: <Insights />,
        // },
        // {
        //   path: 'Plants',
        //   element: <Organisation />,
     
        // },
        // {
        //   path: 'Plants/:id',
        //   element: <Plants />,
        // }, 
        //     {
        //   path: 'Organization-Dashboard/:id',
        //   element: <Selectdashboard />,
        // },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    }, 
    //   {
    //   path: "/resetPassword",
    //   element: <ResetPassword />,
    // },
    // {
    //   path: "/Plant",
    //   element: <Plant />,
    // },

  ]);


  return (
    <div className="App" >
      {/* <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard-home" component={Dashboard} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/ai-smart-view" component={AiSmartView} />
          <Route exact path="/machines-parameter" component={MachinesParameter} />
          <Route exact path="/camera" component={Camera} />
          <Route exact path="/settings" component={Settings} />
          <Redirect from="*" to="/dashboard-home" />
        </Main>
      </Switch> */}
               <RouterProvider router={router} />

    </div>
  );
}

export default App;