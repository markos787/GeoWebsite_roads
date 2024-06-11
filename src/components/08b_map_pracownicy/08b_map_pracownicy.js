import React, { useState, useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet.pm/dist/leaflet.pm.css";
import "leaflet.pm";
import L from "leaflet"
import axios from "axios";
import "./08b_map_pracownicy.css";
import b_db from "../tmp/b_db.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";
import ikona from "../tmp/ikona.png";

function B_map_pracownicy() {
    const [pracownicy, setpracownicy] = useState(null);

    const makePopup = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(`
            <h2>Dane pracownika</h2>
            <img src=${feature.properties.img_source} alt="Lamp" width="52" height="52"> </br>
            <strong>Imię: </strong>${feature.properties.imie} </br>
            <strong>Nazwisko: </strong>${feature.properties.nazwisko} </br>
            <strong>Miejsce zamieszkania: </strong>${feature.properties.zamieszkan} </br>
            <strong>Odcinek początkowy: </strong>${feature.properties.odc_start} </br>
            <strong>Odcinek końcowy: </strong>${feature.properties.odc_koniec} </br>
            `);
        }
    };

    useEffect(() => {
        const getData = () => {
          axios
            .get(
              "http://localhost:9090/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Arobotnicy&maxFeatures=50&outputFormat=application%2Fjson"
            )
            .then((dane) => {
              setpracownicy(dane.data);
            });
        };
        getData();
      }, []);

    let DefaultIcon = L.icon({
        iconUrl: ikona,
        iconSize: [20,32],
        iconAnchor: [16,32]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <div className="b_map_pracownicy">
            <div className="button_list_pracownicy8b">
                <Link to='../choice/b_menu/b_list_pracownicy'>
                    <button className="box_list_r8b">
                        <img className="icon_list_r8b" src={b_db} alt="icon_list_r8b"></img>
                    </button>
                </Link>
            <div className="button_menu8b">
                <Link to='../choice/b_menu'>
                    <button className="box_menu8b">
                        <img className="icon_menu8b" src={b_menu} alt="icon_menu8b"></img>
                    </button>
                </Link>
            </div>
            <div className="info8b">
                <Link to="../about">
                <img className="info8bi" src={info} alt="info8bi"></img>
                </Link>
          </div>
            </div>
            <MapContainer
                className="map8b"
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
                    <LayersControl.Overlay checked name="Pracownicy">
                        {pracownicy ? (
                            <GeoJSON data={pracownicy} onEachFeature={makePopup} />
                        ) : (
                        ""
                        )}
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    )
}
export default B_map_pracownicy;