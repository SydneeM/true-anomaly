import React from "react";
import GoogleMap from "google-maps-react-markers"
import Marker from "./Marker";

interface CoordInfo {
  lat: number;
  lng: number;
  name: string
}

interface MapProps {
  sats: CoordInfo[]
}

const handleMarkerClick = (name: string) => {
  console.log("click", name)
}

const Map = (props: MapProps) => {
  return (
    <div style={{ height: "50vh", width: "100vw" }}>
      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
        defaultCenter={{ lat: 39.742043, lng: -104.991531 }}
        defaultZoom={2}
        onChange={(map) => console.log("Map moved", map)}
      >
        {props.sats.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            onClick={() => handleMarkerClick(name)}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map