import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./leaflet-ruler.css";
import "./leaflet-ruler";

export default function LeafletRuler() {
    const map = useMap();
    const rulerAdded = useRef(false);
  
    useEffect(() => {
      if (!map || rulerAdded.current) return;
  
      L.control.ruler().addTo(map);
      rulerAdded.current = true;
  
    }, [map]);
  
    return null;
  }
