import "../css/aside.scss";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import logo from "../img/logo.png";
import { tryLogout } from "../api/index";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Aside = ({ toggleMenu, setLog }) => {
  let history = useHistory();
  const [modal, setModal] = useState(false);
  const tryingLogout = (evt) => {
    evt.preventDefault();
    toggleMenu();
    setModal(true);
  };
  const logout = async (evt) => {
    evt.preventDefault();
    var respLogin = await tryLogout();
    if (respLogin.error === 0) {
      //una vez que el login es exitoso
      setLog(respLogin.data);
      history.push("/login");
    }
  };
  const handleClose = (evt) => {
    evt.preventDefault();
    setModal(false);
  };
  return (
    <React.Fragment>
      <div className="aside">
        <div className="background" onClick={() => toggleMenu()}></div>
        <div className="container">
          <div className="header">
            <img src={logo} alt="logo" />
          </div>
          <div className="content"></div>
          <div className="footer">
            <a href="/l" onClick={tryingLogout}>
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modalBody">
          <p>Confirma que desea cerrar sesion</p>
          <div className="actions">
            <Button
              className="confirmar"
              autoFocus
              variant="contained"
              onClick={logout}
            >
              Confirmar
            </Button>

            <Button autoFocus variant="contained" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default Aside;
