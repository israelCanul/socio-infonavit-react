import { Fragment } from "react";
import Aside from "../components/menu_aside";
const Header = (props) => {
  const toggleMenu = (evt) => {
    var body = document.querySelector("body").classList;
    body.toggle("aside_open");
    if (!body.contains("aside_open")) {
      body.add("aside_closing");
    }
    setTimeout(() => {
      if (!body.contains("aside_open") && body.contains("aside_closing")) {
        body.remove("aside_closing");
      }
    }, 300);
  };

  return (
    <Fragment>
      <Aside setLog={props.setLog} toggleMenu={toggleMenu} />
      <header className="App-header">
        <nav>
          <a
            href="#aside"
            onClick={(evt) => {
              evt.preventDefault();
              toggleMenu();
            }}
            className="icon"
          >
            <i className="fa fa-bars"></i>
          </a>
          <img src="/img/logo.png" alt="logo" />
        </nav>
      </header>
      {props.children}
    </Fragment>
  );
};

export default Header;
