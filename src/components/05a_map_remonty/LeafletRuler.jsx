import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./leaflet-ruler.css";
import "./leaflet-ruler";

export default function LeafletRuler() {
    const map = useMap();
    const rulerAdded = useRef(false); // Ref to track if the ruler has been added
  
    useEffect(() => {
      if (!map || rulerAdded.current) return;
  
      L.control.ruler().addTo(map);
      rulerAdded.current = true; // Set the ref to true after adding the ruler
  
    }, [map]);
  
    return null;
  }
