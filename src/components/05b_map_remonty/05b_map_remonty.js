import React, { useState, useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet.pm/dist/leaflet.pm.css";
import "leaflet.pm";
import axios from "axios";
import "./05b_map_remonty.css";
import b_db from "../tmp/b_db.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

function B_map_remonty() {
    const [remonty, setremonty] = useState(null);

    const makePopup = (feature, layer) => {
      if (feature.properties) {
        layer.bindPopup(`
          <h2>Dane remontowanego odcinka</h2>
          <strong>Odcinek początkowy: </strong>${feature.properties.odc_start} </br>
          <strong>Odcinek końcowy: </strong>${feature.properties.odc_koniec} </br>
          `);
      }
    };

    useEffect(() => {
        const getData = () => {
          axios
            .get(
              "http://localhost:9090/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Aremonty&maxFeatures=50&outputFormat=application%2Fjson"
            )
            .then((dane) => {
              setremonty(dane.data);
            });
        };
        getData();
      }, []);

    return (
        <div className="b_map_remonty">
            <div className="button_list_remonty5b">
                <Link to='../choice/b_menu/b_list_remonty'>
                    <button className="box_list_r5b">
                        <img className="icon_list_r5b" src={b_db} alt="icon_list_r5b"></img>
                    </button>
                </Link>
            <div className="button_menu5b">
                <Link to='../choice/b_menu'>
                    <button className="box_menu5b">
                        <img className="icon_menu5b" src={b_menu} alt="icon_menu5b"></img>
                    </button>
                </Link>
            </div>
            <div className="info5b">
                <Link to="../about">
                <img className="info5bi" src={info} alt="info5bi"></img>
                </Link>
          </div>
            </div>
            <MapContainer
                className="map5b"
                center={[52.2322222, 21.0]}
                zoom={10}
                style={{ height: "100vh", width: "100%" }}
            >
                <LayersControl>
                    <LayersControl.BaseLayer checked name="OSM">
                        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Google">
                        <TileLayer url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Google Satellite">
                        <TileLayer url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay checked name="Remontowane odcinki">
                        {remonty ? (
                            <GeoJSON data={remonty} onEachFeature={makePopup} />
                        ) : (
                        ""
                        )}
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    )
}
export default B_map_remonty;