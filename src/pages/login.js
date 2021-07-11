import "../css/login.scss";
import familia from "../img/familia.png";
import logo from "../img/logo.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { createRef, useState } from "react";
import { tryLogin } from "../api";
import { validateEmail } from "../helpers/index";
import { useHistory } from "react-router-dom";
const Login = ({ setLog, addInfoLogin }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [emailV, setEmailV] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const emailRef = createRef();
  const passRef = createRef();

  const onKeyressInputEmail = (event) => {
    if (event.key === "Enter") {
      passRef.current.focus();
    }
  };
  const onKeyressInputPass = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };
  const onBlurEmail = (evt) => {
    if (validateEmail(evt.target.value)) {
      setEmailV(false);
    } else {
      setEmailV(true);
    }
  };
  const login = async () => {
    if (email === "") {
      setError("Falta el Correo");
      return false;
    }
    if (pass === "") {
      setError("Falta la contraseña");
      return false;
    }
    setloading(true);
    var respLogin = await tryLogin(email, pass);
    if (respLogin.error === 0) {
      //una vez que el login es exitoso
      setloading(false);
      setLog(respLogin.data);
      addInfoLogin(respLogin.headers);
      history.push("/");
    } else {
      // si no es exitoso se muestra el error
      setloading(false);
      setError(respLogin.data);
    }
  };
  const handleClose = () => {
    setError("");
  };
  return (
    <div className="Home login_container">
      <div className="wrapper">
        <div className="firstPart">
          <div className="logos">
            <img src={familia} className="familia" alt="familia" />
            <img src={logo} alt="logo" />
          </div>

          <div className="gradient"></div>
        </div>
        <form className="formulario" noValidate autoComplete="off">
          <TextField
            type="email"
            inputRef={emailRef}
            onKeyPress={onKeyressInputEmail}
            onBlur={onBlurEmail}
            helperText={emailV ? "Formato Invalido" : ""}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Correo Electrónico"
          />
          <TextField
            onChange={(e) => {
              setPass(e.target.value);
            }}
            onKeyPress={onKeyressInputPass}
            autoFocus
            value={pass}
            inputRef={passRef}
            type="password"
            label="Contraseña"
          />
          <div className="remember">
            <a href="/">Olvide mi contraseña</a>
          </div>
          <div className="action">
            <Button
              variant="contained"
              onClick={() => {
                login();
              }}
              disabled={email === "" || pass === ""}
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
      {/* modales */}
      <Modal
        open={error !== "" ? true : false}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modalBody">
          <p>{error}</p>
          <Button autoFocus variant="contained" onClick={handleClose}>
            Aceptar
          </Button>
        </div>
      </Modal>
      {/* Modal loading */}
      <Modal
        open={loading}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modalLoader">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Login;
