import { useEffect, Dispatch, SetStateAction } from "react";
import styles from "./mapPopup.module.css";

import { MapLocation } from "./result";

type MapContainerProps = {
  setShowMapMethod: Dispatch<SetStateAction<boolean>>;
  mapLocationObj: MapLocation;
};
export default function MapContainer({setShowMapMethod, mapLocationObj}: MapContainerProps) {
  const lat = mapLocationObj.lat;
  const long = mapLocationObj.long;

  const handleEscape = () => {
    setShowMapMethod(false);
  }
  // see src/_components/loginPopup.tsx for escape handling behaviour comments
  useEffect(() => {
    const handleEscapePressed = (e: KeyboardEvent) => {e.key === "Escape" && handleEscape();};
    window.addEventListener("keydown", handleEscapePressed);
    return () => {window.removeEventListener("keydown", handleEscapePressed);};
  }, [])

  return (
    <div className={styles.mapContainer}>
      <div className={styles.map}>
        <iframe
          width="600"
          height="450"
          style={{border:0}}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBRRHhUKbDMiqmr8mtrO1kGL8S0QNtxS2k&q=${lat},${long}`}>
        </iframe>
        <div className={styles.exitButton} onClick={handleEscape}></div>
      </div>
    </div>
  );
}
