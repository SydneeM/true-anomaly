import React from 'react';
import GoogleMap from 'google-maps-react-markers'
import Marker from './Marker';

interface CoordInfo {
  lat: number;
  lng: number;
  name: string
}

interface MapProps {
  sats: CoordInfo[]
}

const Map = (props: MapProps) => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        mapMinHeight="100vh"
        onChange={(map) => console.log('Map moved', map)}
      >
        {props.sats.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            // onClick={onMarkerClick}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default Map