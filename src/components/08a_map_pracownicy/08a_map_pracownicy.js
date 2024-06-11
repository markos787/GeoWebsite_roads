import React, { useState, useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, GeoJSON, useMapEvents, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet.pm/dist/leaflet.pm.css";
import "leaflet.pm";
import L from "leaflet"
import LeafletRuler from "./LeafletRuler";
import axios from "axios";
import "./08a_map_pracownicy.css";
import b_db from "../tmp/b_db.png";
import b_kafle from "../tmp/b_kafle.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";
import ikona from "../tmp/ikona.png";

function MeasureControl({ setShowCoordinates }) {
    useMapEvents({
        click(e) {
            setShowCoordinates(e.latlng);
        },
    });

    return null;
}

function ZoomToFeatureControl({ robotnicy }) {
    const map = useMap();
    const [featureID, setFeatureID] = useState("");

    const handleInputChange = (e) => {
        setFeatureID(e.target.value);
    };

    const handleZoomToFeature = () => {
        if (robotnicy) {
            const fullFeatureID = `robotnicy.${featureID}`;
            console.log("Searching for feature with ID:", fullFeatureID);
            const feature = robotnicy.features.find(f => f.id === fullFeatureID);
            if (feature) {
                console.log("Feature found:", feature);
                const coordinates = feature.geometry.coordinates;
                const latlng = [coordinates[1], coordinates[0]];
                map.setView(latlng, map.getZoom());
            } else {
                console.log("Feature not found");
            }
        }
    };

    return (
        <div className="zoom-control8a">
            <input
                type="text"
                value={featureID}
                onChange={handleInputChange}
                placeholder="Wprowadź ID"
            />
            <button onClick={handleZoomToFeature}>Powiększ do obiektu</button>
        </div>
    );
}

function A_map_pracownicy() {
    const [showCoordinates, setShowCoordinates] = useState(null);
    const [robotnicy, setrobotnicy] = useState(null);

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
                    setrobotnicy(dane.data);
                    console.log("Received GeoJSON data:", dane.data);
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
        <div className="a_map_pracownicy">
            <div className="actions8a">
                {showCoordinates && (
                    <div className="coordinates8a">
                        Współrzędne: {showCoordinates.lat.toFixed(6)}, {showCoordinates.lng.toFixed(6)}
                    </div>
                )}
            </div>
            <div className="length8a">Pomiary na mapie:</div>
            <div className="warstwy">Warstwy:</div>
            <div className="button_list_pracownicy8a">
                <Link to='../choice/login/a_menu/a_list_pracownicy'>
                    <button className="box_list_r8a">
                        <img className="icon_list_r8a" src={b_db} alt="icon_list_r8a"></img>
                    </button>
                </Link>

                <div className="button_tiles_pracownicy8a">
                    <Link to='../choice/login/a_menu/a_tiles_pracownicy'>
                        <button className="box_tiles_r8a">
                            <img className="icon_tiles_r8a" src={b_kafle} alt="icon_tiles_r8a"></img>
                        </button>
                    </Link>
                </div>
                <div className="button_menu8a">
                    <Link to='../choice/login/a_menu'>
                        <button className="box_menu8a">
                            <img className="icon_menu8a" src={b_menu} alt="icon_menu8a"></img>
                        </button>
                    </Link>
                </div>
                <div className="info8a">
                    <Link to="../about">
                        <img className="info8ai" src={info} alt="info8ai"></img>
                    </Link>
                </div>
            </div>
            <MapContainer
                className="map8a"
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
                        {robotnicy ? (
                            <GeoJSON data={robotnicy} onEachFeature={makePopup} />
                        ) : (
                            ""
                        )}
                    </LayersControl.Overlay>
                </LayersControl>
                <MeasureControl setShowCoordinates={setShowCoordinates} />
                <LeafletRuler />
                <ZoomToFeatureControl robotnicy={robotnicy} />
            </MapContainer>
        </div>
    );
}

export default A_map_pracownicy;
