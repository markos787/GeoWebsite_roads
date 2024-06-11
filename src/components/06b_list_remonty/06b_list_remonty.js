import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./06b_list_remonty.css";
import b_mapa from "../tmp/b_mapa.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

function B_list_remonty() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9090/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Aremonty&maxFeatures=50&outputFormat=application%2Fjson");
                setData(response.data.features);
                setFilteredData(response.data.features);
            } catch (error) {
                console.error("Error fetching GeoJSON data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const sortedData = [...filteredData].sort((a, b) => {
            const aValue = sortBy === "id" ? parseInt(a.id.split('.')[1], 10) : (a.properties[sortBy] || "");
            const bValue = sortBy === "id" ? parseInt(b.id.split('.')[1], 10) : (b.properties[sortBy] || "");
            if (sortOrder === "asc") {
                return typeof aValue === "number" ? aValue - bValue : aValue.localeCompare(bValue);
            } else {
                return typeof aValue === "number" ? bValue - aValue : bValue.localeCompare(aValue);
            }
        });

        setFilteredData(sortedData);
    }, [sortBy, sortOrder, filteredData]);

    useEffect(() => {
        const filteredData = data.filter(feature => {
            if (filterValue) {
                const values = Object.values(feature.properties).map(value => (value || "").toString().toLowerCase());
                return values.some(value => value.includes(filterValue.toLowerCase()));
            }
            return true;
        });

        setFilteredData(filteredData);
    }, [filterValue, data]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    return (
        <div className="a_list_remonty">
            <div className="database6b">
                <h1 className="txt_list_remonty6b">Baza danych remontowanych odcinków</h1>
                <div className="button_menu6b">
                    <Link to='../choice/b_menu'>
                        <button className="box_menu6b">
                            <img className="icon_menu6b" src={b_menu} alt="icon_menu6b"></img>
                        </button>
                    </Link>
                </div>
                <div className="button_map_remonty6b">
                    <Link to='../choice/b_menu/b_map_remonty'>
                        <button className="box_map_r6b">
                            <img className="icon_map_r6b" src={b_mapa} alt="icon_map_r6b"></img>
                        </button>
                    </Link>
                </div>
                <div className="info6b">
                    <Link to="../about">
                        <img className="info6bi" src={info} alt="info6bi"></img>
                    </Link>
                </div>
                <div className="sortuj6b">
                    <label htmlFor="sortBy">Sortuj według:</label>
                    <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                        <option value="">Wybierz kolumnę</option>
                        <option value="id">ID</option>
                        <option value="odc_start">Punkt początkowy</option>
                        <option value="odc_koniec">Punkt końcowy</option>
                    </select>
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Rosnąco</option>
                        <option value="desc">Malejąco</option>
                    </select>
                </div>
                <div className="filtruj6b">
                    <label htmlFor="filterValue">Filtruj według wartości:</label>
                    <input type="text" id="filterValue" value={filterValue} onChange={handleFilterChange} />
                </div>
                <table className="tabela6b">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Punkt początkowy</th>
                            <th>Punkt końcowy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((feature, index) => (
                            <tr key={index}>
                                <td>{parseInt(feature.id.split('.')[1])}</td>
                                <td>{feature.properties.odc_start}</td>
                                <td>{feature.properties.odc_koniec}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default B_list_remonty;
