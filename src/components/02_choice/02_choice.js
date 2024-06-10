import React from "react";
import { Link } from "react-router-dom";
import "./02_choice.css";
import info from "../tmp/info.png";

function Choice() {
  return (
    <div className="choice">
      <div className="log-in2">
        <Link to="login">
          <button className="box_login2">
          </button>
          <div className="txt_login2">Zaloguj się</div>
        </Link>
      </div>
      <div className="guest2">
        <Link to="b_menu">
          <button className="box_guest2">
          </button>
          <div className="txt_guest2">Kontynuuj jako gość</div>
        </Link>
      <div className="info2">
        <Link to="../about">
          <img className="info2i" src={info} alt="info2i"></img>
        </Link>
      </div>
      </div>
    </div>
  );
}
export default Choice;
