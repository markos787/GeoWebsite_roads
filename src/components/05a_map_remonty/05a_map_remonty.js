import React, { useState, useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, GeoJSON, useMapEvents, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.pm/dist/leaflet.pm.css";
import "leaflet.pm";
import LeafletRuler from "./LeafletRuler";
import axios from "axios";
import "./05a_map_remonty.css";
import b_db from "../tmp/b_db.png";
import b_kafle from "../tmp/b_kafle.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

function MeasureControl({ setShowCoordinates }) {
    useMapEvents({
        click(e) {
            setShowCoordinates(e.latlng);
        },
    });
    return null;
}

function ZoomToFeatureControl({ remonty }) {
    const map = useMap();
    const [featureID, setFeatureID] = useState("");

    const handleInputChange = (e) => {
        setFeatureID(e.target.value);
    };

    const handleZoomToFeature = () => {
        if (remonty) {
            const fullFeatureID = `remonty.${featureID}`;
            console.log("Searching for feature with ID:", fullFeatureID);
            const feature = remonty.features.find(f => f.id === fullFeatureID);
            if (feature) {
                console.log("Feature found:", feature);
                const coordinates = feature.geometry.coordinates[0];
                const latlngs = coordinates.map(coord => [coord[1], coord[0]]);
                const bounds = L.latLngBounds(latlngs);
                map.fitBounds(bounds);
            } else {
                console.log("Feature not found");
            }
        }
    };

    return (
        <div className="zoom-control5a">
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

function A_map_remonty() {
    const [showCoordinates, setShowCoordinates] = useState(null);
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
                    console.log("Received GeoJSON data:", dane.data);
                });
        };
        getData();
    }, []);

    return (
        <div className="a_map_remonty">
            <div className="actions5a">
                {showCoordinates && (
                    <div className="coordinates5a">
                        Współrzędne: {showCoordinates.lat.toFixed(6)}, {showCoordinates.lng.toFixed(6)}
                    </div>
                )}
            </div>
            <div className="length5a">Pomiary na mapie:</div>
            <div className="warstwy5a">Warstwy:</div>
            <div className="button_list_remonty5a">
                <Link to='../choice/login/a_menu/a_list_remonty'>
                    <button className="box_list_r5a">
                        <img className="icon_list_r5a" src={b_db} alt="icon_list_r5a"></img>
                    </button>
                </Link>

                <div className="button_tiles_remonty5a">
                    <Link to='../choice/login/a_menu/a_tiles_remonty'>
                        <button className="box_tiles_r5a">
                            <img className="icon_tiles_r5a" src={b_kafle} alt="icon_tiles_r5a"></img>
                        </button>
                    </Link>
                </div>
                <div className="button_menu5a">
                    <Link to='../choice/login/a_menu'>
                        <button className="box_menu5a">
                            <img className="icon_menu5a" src={b_menu} alt="icon_menu5a"></img>
                        </button>
                    </Link>
                </div>
                <div className="info5a">
                    <Link to="../about">
                        <img className="info5ai" src={info} alt="info5ai"></img>
                    </Link>
                </div>
            </div>
            <MapContainer
                className="map5a"
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
                <MeasureControl setShowCoordinates={setShowCoordinates} />
                <LeafletRuler />
                <ZoomToFeatureControl remonty={remonty} />
            </MapContainer>
        </div>
    );
}

export default A_map_remonty;
