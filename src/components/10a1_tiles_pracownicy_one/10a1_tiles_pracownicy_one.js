import React, { useEffect } from "react";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import L from "leaflet";
import "./10a1_tiles_pracownicy_one.css";
import b_mapa from "../tmp/b_mapa.png";
import b_db from "../tmp/b_db.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";
import ikona from "../tmp/ikona.png";

const Tiles_pracownicy_one = ({ geoData_prac }) => {
  const { id } = useParams();

  const feature = geoData_prac.find((item) => item.id === id);

  const FeatureMap = ({ feature }) => {
    const map = useMap();

    useEffect(() => {
      if (feature) {
        const bounds = L.geoJSON(feature).getBounds();
        map.fitBounds(bounds);
        map.setZoom(12);
      } else {
        map.setView([52.2322222, 21.0], 10);
      }
    }, [feature, map]);

    return null;
  };

  let DefaultIcon = L.icon({
    iconUrl: ikona,
    iconSize: [20, 32],
    iconAnchor: [16, 32],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="tiles_pracownicy_one">
      <h1 className="txt_tiles_pracownicy10a1">
        Pracownik {feature.properties.imie} {feature.properties.nazwisko}
      </h1>
      <div className="button_menu10a1">
        <Link to="../choice/login/a_menu">
          <button className="box_menu10a1">
            <img
              className="icon_menu10a1"
              src={b_menu}
              alt="icon_menu10a1"
            ></img>
          </button>
        </Link>
      </div>
      <div className="button_map_pracownicy10a1">
        <Link to="../choice/login/a_menu/a_map_pracownicy">
          <button className="box_map_r10a1">
            <img
              className="icon_map_r10a1"
              src={b_mapa}
              alt="icon_map_r10a1"
            ></img>
          </button>
        </Link>
      </div>
      <div className="button_list_pracownicy10a1">
        <Link to="../choice/login/a_menu/a_list_pracownicy">
          <button className="box_list_r10a1">
            <img
              className="icon_list_r10a1"
              src={b_db}
              alt="icon_list_r10a1"
            ></img>
          </button>
        </Link>
      </div>
      <div className="button_back10a1">
        <Link to="../choice/login/a_menu/a_tiles_pracownicy">
          <button className="box_back10a1">
            <div className="txt_back10a1">Powrót</div>
          </button>
        </Link>
      </div>
      <div className="info10a1">
        <Link to="../about">
          <img className="info10a1i" src={info} alt="info10a1i"></img>
        </Link>
      </div>
      <div className="txt_attributes10a1">
        <p className="txt_id10a1">ID</p>
        <p className="txt_imie10a1">Imię</p>
        <p className="txt_nazwisko10a1">Nazwisko</p>
        <p className="txt_zamieszkanie10a1">Zamieszkanie</p>
        <p className="txt_odc_start10a1">Odcinek początkowy</p>
        <p className="txt_odc_koniec10a1">Odcinek końcowy</p>
      </div>
      <div className="txt_values10a1">
        <p className="id10a1">{parseInt(feature.id.split(".")[1])}</p>
        <p className="imie10a1">{feature.properties.imie}</p>
        <p className="nazwisko10a1">{feature.properties.nazwisko}</p>
        <p className="zamieszkanie10a1">{feature.properties.zamieszkan}</p>
        <p className="odc_start10a1">{feature.properties.odc_start}</p>
        <p className="odc_koniec10a1">{feature.properties.odc_koniec}</p>
      </div>
      <img
        className="face10a1"
        src={feature.properties.img_source}
        alt="face10a1"
      ></img>
      <div className="map10a1">
        <MapContainer
          className="map5a"
          center={[52.2322222, 21.0]}
          zoom={10}
          style={{ height: "60vh", width: "100%" }}
        >
          <LayersControl>
            <LayersControl.BaseLayer checked name="OSM">
              <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay checked name="Pracownicy">
              {geoData_prac ? <GeoJSON data={geoData_prac} /> : ""}
            </LayersControl.Overlay>
          </LayersControl>
          {feature && <FeatureMap feature={feature} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Tiles_pracownicy_one;
