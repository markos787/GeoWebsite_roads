import React from "react";
import { Link } from "react-router-dom";
import "./04a_menu.css";
import slupy from "../tmp/slupy.png";
import mietek from "../tmp/mietek.png";
import b_mapa from "../tmp/b_mapa.png";
import b_db from "../tmp/b_db.png";
import b_kafle from "../tmp/b_kafle.png";
import info from "../tmp/info.png";

function A_menu() {
    return (
        <div className="a_menu">
            <div className="txt_menu4a">Menu</div>
            <div className="divider4a"></div>
            <div className="remonty4a">
                <img className="img_remonty4a" src={slupy} alt="img_remonty4a"></img>
                <div className="txt_remonty4a">Remonty</div>
                <div className="map4a_r">
                    <Link to='a_map_remonty'>
                        <button className="button_map_remonty4a">
                            <img className="icon_map_r4a" src={b_mapa} alt="icon_map_r4a"></img>
                        </button>
                    </Link>
                </div>
                <div className="txt_map_remonty4a">Mapa</div>
                <div className="list4a_r">
                    <Link to='a_list_remonty'>
                        <button className="button_list_remonty4a">
                            <img className="icon_list_r4a" src={b_db} alt="icon_list_r4a"></img>
                        </button>
                    </Link>
                </div>
                <div className="txt_list_remonty4a">Baza danych (lista)</div>
                <div className="tiles4a_r">
                    <Link to='a_tiles_remonty'>
                        <button className="button_tiles_remonty4a">
                            <img className="icon_tiles_r4a" src={b_kafle} alt="icon_tiles_r4a"></img>
                        </button>
                    </Link>
                </div>
                <div className="txt_tiles_remonty4a">Baza danych (obiekty)</div>

            </div>
            <div className="pracownicy4a">
                <img className="img_pracownicy4a" src={mietek} alt="img_pracownicy4a"></img>
                    <div className="txt_pracownicy4a">Pracownicy</div>
                    <div className="map4a_p">
                        <Link to='a_map_pracownicy'>
                            <button className="button_map_pracownicy4a">
                                <img className="icon_map_p4a" src={b_mapa} alt="icon_map_p4a"></img>
                            </button>
                        </Link>
                    </div>
                    <div className="txt_map_pracownicy4a">Mapa</div>
                    <div className="list4a_p">
                        <Link to='a_list_pracownicy'>
                            <button className="button_list_pracownicy4a">
                                <img className="icon_list_p4a" src={b_db} alt="icon_list_p4a"></img>
                            </button>
                        </Link>
                    </div>
                    <div className="txt_list_pracownicy4a">Baza danych (lista)</div>
                    <div className="tiles4a_p">
                        <Link to='a_tiles_pracownicy'>
                            <button className="button_tiles_pracownicy4a">
                                <img className="icon_tiles_p4a" src={b_kafle} alt="icon_tiles_p4a"></img>
                            </button>
                        </Link>
                    </div>
                    <div className="txt_tiles_pracownicy4a">Baza danych (obiekty)</div>
            </div>
            <div className="info4a">
            <Link to="../about">
              <img className="info4ai" src={info} alt="info4ai"></img>
            </Link>
          </div>
        </div>
    )
}
export default A_menu;