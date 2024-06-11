import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./03_login.css";
import eye from "../tmp/eye.png";
import info from "../tmp/info.png";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === "user" && password === "password") {
      navigate("/choice/login/a_menu");
    } else {
      setError("Nieprawidłowy login lub hasło");
    }
  };

  const showPasswordHandler = () => {
    setShowPassword(true);
  };

  const hidePasswordHandler = () => {
    setShowPassword(false);
  };

  return (
    <div className="login">
      <div className="txt_title3">Geoportal utrudnień w ruchu drogowym</div>
      <div className="txt_login3">Login</div>
      <div className="txt_password3">Hasło</div>
      <form onSubmit={handleSubmit}>
        <div className="input_login">
          <input
            className="input_login3"
            type="text"
            placeholder="Login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>
        <div className="input_password">
          <input
            className="input_password3"
            type={showPassword ? "text" : "password"}
            placeholder="Hasło"
            value={password}
            onChange={handlePasswordChange}
          />
          <img
            className="visible3"
            src={eye}
            alt="visible3"
            onMouseDown={showPasswordHandler}
            onMouseUp={hidePasswordHandler}
            onMouseLeave={hidePasswordHandler}
          />
        </div>
        <div className="button_login3">
          <button className="box_login3" type="submit">
            <div className="txt_login_button3">Zaloguj się!</div>
          </button>
        </div>
        {error && <div className="error_message">{error}</div>}
        <div className="button_back3">
          <Link to="../choice">
            <button className="box_back3">
              <div className="txt_back_button3">Powrót</div>
            </button>
          </Link>
        </div>
        <div className="info3">
          <Link to="../about">
            <img className="info3i" src={info} alt="info3i"></img>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
