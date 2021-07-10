import { Fragment } from "react";
const Header = (props) => {
  return (
    <Fragment>
      <header className="App-header">
        <nav>
          <a href="/" className="icon">
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
