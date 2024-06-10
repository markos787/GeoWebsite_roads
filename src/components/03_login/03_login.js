import React from "react";
import { Link } from "react-router-dom";
import "./03_login.css";
import eye from "../tmp/eye.png";
import info from "../tmp/info.png";

function Login({ showPassword, handleChange, togglePasswordVisibility }) {
  return (
    <div className="login">
      <div className="txt_title3">Geoportal utrudnień w ruchu drogowym</div>
      <div className="txt_login3">Login</div>
      <div className="txt_password3">Hasło</div>
      <div className="input_login">
        <input
          className="input_login3"
          type="text"
          placeholder="User ID/e-mail"
        />
        <div className="input_password">
          <input
            className="input_password3"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
          />
          <img
            className="visible3"
            src={eye}
            alt="visible3"
            onClick={togglePasswordVisibility}
          />
          <div className="button_login3">
            <Link to="a_menu">
              <button className="box_login3">
                <div className="txt_login_button3">Zaloguj się!</div>
              </button>
            </Link>
          </div>
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
        </div>
      </div>
    </div>
  );
}
export default Login;
