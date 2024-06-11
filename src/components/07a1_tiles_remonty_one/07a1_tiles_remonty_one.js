import React, { useEffect } from "react";
import { LayersControl, MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import L from "leaflet";
import "./07a1_tiles_remonty_one.css";
import b_mapa from "../tmp/b_mapa.png";
import b_db from "../tmp/b_db.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

const Tiles_remonty_one = ({ geoData_rem }) => {
    const { id } = useParams();

    const feature = geoData_rem.find((item) => item.id === id);

    const FeatureMap = ({ feature }) => {
        const map = useMap();

        useEffect(() => {
            if (feature) {
                const bounds = L.geoJSON(feature).getBounds();
                map.fitBounds(bounds);
            }
        }, [feature, map]);

        return null;
    };

    return (
        <div className="tiles_remonty_one">
            <h1 className="txt_tiles_remonty7a1">
                Remont {feature.properties.odc_start} - {feature.properties.odc_koniec}
            </h1>
            <div className="button_menu7a1">
                <Link to="../choice/login/a_menu">
                    <button className="box_menu7a1">
                        <img className="icon_menu7a1" src={b_menu} alt="icon_menu7a1"></img>
                    </button>
                </Link>
            </div>
            <div className="button_map_remonty7a1">
                <Link to="../choice/login/a_menu/a_map_remonty">
                    <button className="box_map_r7a1">
                        <img className="icon_map_r7a1" src={b_mapa} alt="icon_map_r7a1"></img>
                    </button>
                </Link>
            </div>
            <div className="button_list_remonty7a1">
                <Link to="../choice/login/a_menu/a_list_remonty">
                    <button className="box_list_r7a1">
                        <img className="icon_list_r7a1" src={b_db} alt="icon_list_r7a1"></img>
                    </button>
                </Link>
            </div>
            <div className="button_back7a1">
                <Link to="../choice/login/a_menu/a_tiles_remonty">
                    <button className="box_back7a1">
                        <div className="txt_back7a1">Powrót</div>
                    </button>
                </Link>
            </div>
            <div className="info7a1">
                <Link to="../about">
                    <img className="info7a1i" src={info} alt="info7a1i"></img>
                </Link>
            </div>
            <div className="txt_attributes7a1">
                <p className="txt_id7a1">ID</p>
                <p className="txt_nazwa7a1">Nazwa</p>
                <p className="txt_odc_start7a1">Odcinek początkowy</p>
                <p className="txt_odc_koniec7a1">Odcinek końcowy</p>
            </div>
            <div className="txt_values7a1">
                <p className="id7a1">{parseInt(feature.id.split('.')[1])}</p>
                <p className="nazwa7a1">Remont {feature.properties.odc_start} - {feature.properties.odc_koniec}</p>
                <p className="odc_start7a1">{feature.properties.odc_start}</p>
                <p className="odc_koniec7a1">{feature.properties.odc_koniec}</p>
            </div>
            <div className="map7a1">
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
                        <LayersControl.Overlay checked name="Remontowane odcinki">
                            {geoData_rem ? (
                                <GeoJSON data={geoData_rem} />
                            ) : (
                                ""
                            )}
                        </LayersControl.Overlay>
                    </LayersControl>
                    {feature && <FeatureMap feature={feature} />}
                </MapContainer>
            </div>
        </div>
    );
};

export default Tiles_remonty_one;
