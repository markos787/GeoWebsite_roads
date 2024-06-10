import React from "react";
import { Link } from "react-router-dom";
import "./04b_menu.css";
import slupy from "../tmp/slupy.png";
import mietek from "../tmp/mietek.png";
import b_mapa from "../tmp/b_mapa.png";
import b_db from "../tmp/b_db.png";
import info from "../tmp/info.png";

function B_menu() {
    return (
        <div className="b_menu">
            <div className="txt_menu4b">Menu</div>
            <div className="divider4b"></div>
            <div className="remonty4b">
                <img className="img_remonty4b" src={slupy} alt="img_remonty4b"></img>
                <div className="txt_remonty4b">Remonty</div>
                <div className="map4b_r">
                    <Link to='b_map_remonty'>
                        <button className="button_map_remonty4b">
                            <img className="icon_map_r4b" src={b_mapa} alt="icon_map_r4b"></img>
                        </button>
                    </Link>
                </div>
                <div className="txt_map_remonty4b">Mapa</div>
                <div className="list4b_r">
                    <Link to='b_list_remonty'>
                        <button className="button_list_remonty4b">
                            <img className="icon_list_r4b" src={b_db} alt="icon_list_r4b"></img>
                        </button>
                    </Link>
                </div>
                <div className="txt_list_remonty4b">Baza danych (lista)</div>
            </div>
            <div className="pracownicy4b">
                <img className="img_pracownicy4b" src={mietek} alt="img_pracownicy4b"></img>
                    <div className="txt_pracownicy4b">Pracownicy</div>
                    <div className="map4b_p">
                        <Link to='b_map_pracownicy'>
                            <button className="button_map_pracownicy4b">
                                <img className="icon_map_p4b" src={b_mapa} alt="icon_map_p4b"></img>
                            </button>
                        </Link>
                    </div>
                    <div className="txt_map_pracownicy4b">Mapa</div>
                    <div className="list4b_p">
                        <Link to='b_list_pracownicy'>
                            <button className="button_list_pracownicy4b">
                                <img className="icon_list_p4b" src={b_db} alt="icon_list_p4b"></img>
                            </button>
                        </Link>
                    </div>
                    <div className="txt_list_pracownicy4b">Baza danych (lista)</div>
            </div>
            <div className="info4b">
                <Link to="../about">
                <img className="info4bi" src={info} alt="info4bi"></img>
                </Link>
          </div>
        </div>
    )
}
export default B_menu;