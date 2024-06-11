import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./07a_tiles_remonty.css";
import roboty from "../tmp/roboty.png";
import b_mapa from "../tmp/b_mapa.png";
import b_db from "../tmp/b_db.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

const Tiles_remonty = ({ geoData_rem }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const filteredData = geoData_rem.filter((feature) => {
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
  }, [filterValue, geoData_rem]);

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="tiles_remonty">
      <h1 className="txt_tiles_remonty7a">
        Baza danych remontowanych odcinków - dashboard
      </h1>
      <div className="button_menu7a">
        <Link to="../choice/login/a_menu">
          <button className="box_menu7a">
            <img className="icon_menu7a" src={b_menu} alt="icon_menu7a"></img>
          </button>
        </Link>
      </div>
      <div className="button_map_remonty7a">
        <Link to="../choice/login/a_menu/a_map_remonty">
          <button className="box_map_r7a">
            <img className="icon_map_r7a" src={b_mapa} alt="icon_map_r7a"></img>
          </button>
        </Link>
      </div>
      <div className="button_list_remonty7a">
        <Link to="../choice/login/a_menu/a_list_remonty">
          <button className="box_list_r7a">
            <img
              className="icon_list_r7a"
              src={b_db}
              alt="icon_list_r7a"
            ></img>
          </button>
        </Link>
      </div>
      <div className="info7a">
        <Link to="../about">
          <img className="info7ai" src={info} alt="info7ai"></img>
        </Link>
      </div>
      <div className="filter7a">
        <div className="txt_filter7a">Filtruj</div>
        <input
          type="text"
          placeholder="Wpisz"
          value={filterValue}
          onChange={handleFilterChange}
        />
      </div>
      <div className="tiles7a">
        {filteredData.map((feature, index) => (
          <Link
            key={index}
            to={`/choice/login/a_menu/a_tiles_remonty/one/${feature.id}`}
          >
            <div className="tile7a">
              <div className="tile-name7a">
                <td>Odcinek nr {parseInt(feature.id.split(".")[1])}</td>
              </div>
              <img
                className="tile_image7a"
                src={roboty}
                alt="tile_image7a"
              ></img>
              <div className="tile-odc7a">
                <td>
                  {feature.properties.odc_start} -{" "}
                  {feature.properties.odc_koniec}
                </td>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tiles_remonty;
