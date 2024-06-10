import React from "react";
import { Link } from "react-router-dom";
import "./01_start.css";
import budowa from "../tmp/budowa.png";

function Start() {
  return (
    <div className="start">
      <div className="txt_title1">Geoportal utrudnień w ruchu drogowym</div>
      <div className="txt_explanation1">
        System do informowania o utrudnieniach w ruchu na odcinku drogowym oraz
        o jego przyczynie
      </div>
      <img className="img1" src={budowa} alt="img1"></img>
      <div className="button_start1">
        <Link to="choice">
          <button className="box_start">
            <div className="txt_start">START</div>
          </button>
        </Link>
      </div>
      <div className="button_about1">
        <Link to="about">
          <button className="box_about">
            <div className="txt_about1">O geoportalu</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Start;
