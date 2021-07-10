import "./css/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Header from "./sections/header";
import { getCookie, getStorageItem } from "./helpers/index";
import { useState } from "react";

function App() {
  //datos del usuario
  const [loged, setLoged] = useState(
    getCookie("dataLogin") != "" ? getStorageItem("dataLogin") : ""
  );
  //datos del header como resultado del login
  const [infoLogged, setInfoLogged] = useState(getStorageItem("headerLogin"));
  const preventNoLogin = () => {
    if (loged == "") {
      return (
        <Route>
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        </Route>
      );
    }
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"}>
            {
              //con esto evitamos que se carge la vista al no esta logeados
              preventNoLogin()
            }
            <Header>
              <Home userInfo={loged} headerInfo={infoLogged} />
            </Header>
          </Route>
          <Route exact path={"/login"}>
            <Login setLog={setLoged} addInfoLogin={setInfoLogged} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
