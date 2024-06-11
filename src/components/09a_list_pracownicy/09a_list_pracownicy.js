import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./09a_list_pracownicy.css";
import b_mapa from "../tmp/b_mapa.png";
import b_kafle from "../tmp/b_kafle.png";
import b_menu from "../tmp/b_lista.png";
import info from "../tmp/info.png";

function A_list_pracownicy() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9090/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Arobotnicy&maxFeatures=50&outputFormat=application%2Fjson");
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
        <div className="a_list_pracownicy">
            <div className="database9a">
                <h1 className="txt_list_pracownicy9a">Baza danych pracowników remontów</h1>
                <div className="button_menu9a">
                    <Link to='../choice/login/a_menu'>
                        <button className="box_menu9a">
                            <img className="icon_menu9a" src={b_menu} alt="icon_menu9a"></img>
                        </button>
                    </Link>
                </div>
                <div className="button_map_pracownicy9a">
                    <Link to='../choice/login/a_menu/a_map_pracownicy'>
                        <button className="box_map_r9a">
                            <img className="icon_map_r9a" src={b_mapa} alt="icon_map_r9a"></img>
                        </button>
                    </Link>
                </div>
                <div className="button_tiles_pracownicy9a">
                    <Link to='../choice/login/a_menu/a_tiles_pracownicy'>
                        <button className="box_tiles_r9a">
                            <img className="icon_tiles_r9a" src={b_kafle} alt="icon_tiles_r9a"></img>
                        </button>
                    </Link>
                </div>
                <div className="info9a">
                    <Link to="../about">
                        <img className="info9ai" src={info} alt="info9ai"></img>
                    </Link>
                </div>
                <div className="sortuj9a">
                    <label htmlFor="sortBy">Sortuj według:</label>
                    <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                        <option value="">Wybierz kolumnę</option>
                        <option value="id">ID</option>
                        <option value="imie">Imię</option>
                        <option value="nazwisko">Nazwisko</option>
                        <option value="zamieszkan">Miejsce zamieszkania</option>
                        <option value="odc_start">Punkt początkowy</option>
                        <option value="odc_koniec">Punkt końcowy</option>
                    </select>
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Rosnąco</option>
                        <option value="desc">Malejąco</option>
                    </select>
                </div>
                <div className="filtruj9a">
                    <label htmlFor="filterValue">Filtruj według wartości:</label>
                    <input type="text" id="filterValue" value={filterValue} onChange={handleFilterChange} />
                </div>
                <table className="tabela9a">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Miejsce zamieszkania</th>
                            <th>Punkt początkowy</th>
                            <th>Punkt końcowy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((feature, index) => (
                            <tr key={index}>
                                <td>{parseInt(feature.id.split('.')[1])}</td>
                                <td>{feature.properties.imie}</td>
                                <td>{feature.properties.nazwisko}</td>
                                <td>{feature.properties.zamieszkan}</td>
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
export default A_list_pracownicy;
