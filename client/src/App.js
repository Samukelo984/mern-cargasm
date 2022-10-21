import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import SinglePost from "./pages/singlePost/SinglePost";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">{user ? <Home /> : <Register />}</Route>
            <Route path="/login">{user ? <Home /> : <Login />}</Route>
            <Route path="/post/:id">
              <SinglePost />
            </Route>
            <Route path="/write">{user ? <Write /> : <Login />}</Route>
            <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
