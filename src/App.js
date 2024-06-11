import "./App.css";
import Start from "./components/01_start/01_start";
import Choice from "./components/02_choice/02_choice";
import Login from "./components/03_login/03_login";
import A_menu from "./components/04a_menu/04a_menu";
import B_menu from "./components/04b_menu/04b_menu";
import A_map_remonty from "./components/05a_map_remonty/05a_map_remonty";
import B_map_remonty from "./components/05b_map_remonty/05b_map_remonty";
import A_list_remonty from "./components/06a_list_remonty/06a_list_remonty";
import B_list_remonty from "./components/06b_list_remonty/06b_list_remonty";
import Tiles_remonty from "./components/07a_tiles_remonty/07a_tiles_remonty";
import Tiles_remonty_one from "./components/07a1_tiles_remonty_one/07a1_tiles_remonty_one";
import A_map_pracownicy from "./components/08a_map_pracownicy/08a_map_pracownicy";
import B_map_pracownicy from "./components/08b_map_pracownicy/08b_map_pracownicy";
import A_list_pracownicy from "./components/09a_list_pracownicy/09a_list_pracownicy";
import B_list_pracownicy from "./components/09b_list_pracownicy/09b_list_pracownicy";
import Tiles_pracownicy from "./components/10a_tiles_pracownicy/10a_tiles_pracownicy";
import Tiles_pracownicy_one from "./components/10a1_tiles_pracownicy_one/10a1_tiles_pracownicy_one";
import About from "./components/11_about/11_about";
import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from 'axios';

function App() {
  const [geoData_rem, setGeoData_rem] = useState([]);
  const [geoData_prac, setGeoData_prac] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Aremonty&maxFeatures=50&outputFormat=application%2Fjson')
      .then(response => {
        setGeoData_rem(response.data.features);
      })
      .catch(error => {
        console.error("There was an error loading the GeoJSON data!", error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:9090/geoserver/prge/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge%3Arobotnicy&maxFeatures=50&outputFormat=application%2Fjson')
      .then(response => {
        setGeoData_prac(response.data.features);
      })
      .catch(error => {
        console.error("There was an error loading the GeoJSON data!", error);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start />,
    },
    {
      path: "/choice",
      element: <Choice />,
    },
    {
      path: "/choice/login",
      element: <Login />,
    },
    {
      path: "/choice/login/a_menu",
      element: <A_menu />,
    },
    {
      path: "/choice/login/a_menu/a_map_remonty",
      element: <A_map_remonty />,
    },
    {
      path: "/choice/login/a_menu/a_list_remonty",
      element: <A_list_remonty />,
    },
    {
      path: "/choice/login/a_menu/a_tiles_remonty",
      element: <Tiles_remonty geoData_rem={geoData_rem} />,
    },
    {
      path: "/choice/login/a_menu/a_tiles_remonty/one/:id",
      element: <Tiles_remonty_one geoData_rem={geoData_rem} />,
    },
    {
      path: "/choice/login/a_menu/a_map_pracownicy",
      element: <A_map_pracownicy />,
    },
    {
      path: "/choice/login/a_menu/a_list_pracownicy",
      element: <A_list_pracownicy />,
    },
    {
      path: "/choice/login/a_menu/a_tiles_pracownicy",
      element: <Tiles_pracownicy geoData_prac={geoData_prac} />,
    },
    {
      path: "/choice/login/a_menu/a_tiles_pracownicy/one/:id",
      element: <Tiles_pracownicy_one geoData_prac={geoData_prac} />,
    },
    {
      path: "/choice/b_menu",
      element: <B_menu />,
    },
    {
      path: "/choice/b_menu/b_map_remonty",
      element: <B_map_remonty />,
    },
    {
      path: "/choice/b_menu/b_list_remonty",
      element: <B_list_remonty />,
    },
    {
      path: "/choice/b_menu/b_map_pracownicy",
      element: <B_map_pracownicy />,
    },
    {
      path: "/choice/b_menu/b_list_pracownicy",
      element: <B_list_pracownicy />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
