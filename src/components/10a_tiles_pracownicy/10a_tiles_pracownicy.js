import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./10a_tiles_pracownicy.css";
import b_mapa from "../tmp/b_mapa.png";
import b_db from "../tmp/b_db.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

const Tiles_pracownicy = ({ geoData_prac }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const filteredData = geoData_prac.filter((feature) => {
      if (filterValue) {
        const values = Object.values(feature.properties).map((value) =>
          (value || "").toString().toLowerCase()
        );
        return values.some((value) =>
          value.includes(filterValue.toLowerCase())
        );
      }
      return true;
    });

    setFilteredData(filteredData);
  }, [filterValue, geoData_prac]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="tiles_pracownicy">
      <h1 className="txt_tiles_pracownicy10a">
        Baza danych pracowników remontów - dashboard
      </h1>
      <div className="button_menu10a">
        <Link to="../choice/login/a_menu">
          <button className="box_menu10a">
            <img className="icon_menu10a" src={b_menu} alt="icon_menu10a"></img>
          </button>
        </Link>
      </div>
      <div className="button_map_pracownicy10a">
        <Link to="../choice/login/a_menu/a_map_pracownicy">
          <button className="box_map_r10a">
            <img className="icon_map_r10a" src={b_mapa} alt="icon_map_r10a"></img>
          </button>
        </Link>
      </div>
      <div className="button_list_pracownicy10a">
        <Link to="../choice/login/a_menu/a_list_pracownicy">
          <button className="box_list_r10a">
            <img
              className="icon_list_r10a"
              src={b_db}
              alt="icon_list_r10a"
            ></img>
          </button>
        </Link>
      </div>
      <div className="info10a">
        <Link to="../about">
          <img className="info10ai" src={info} alt="info10ai"></img>
        </Link>
      </div>
      <div className="filter10a">
        <div className="txt_filter10a">Filtruj</div>
        <input
          type="text"
          placeholder="Wpisz"
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>
      <div className="tiles10a">
        {filteredData.map((feature, index) => (
          <Link
            key={index}
            to={`/choice/login/a_menu/a_tiles_pracownicy/one/${feature.id}`}
          >
            <div className="tile10a">
              <div className="tile-name10a">
                <td>Pracownik nr {parseInt(feature.id.split(".")[1])}</td>
              </div>
              <img
                className="tile_image10a"
                src={feature.properties.img_source}
                alt="tile_image10a"
              ></img>
              <div className="tile-imie10a">
                <td>
                  {feature.properties.imie}{" "}
                  {feature.properties.nazwisko}
                </td>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tiles_pracownicy;
