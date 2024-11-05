import React from 'react';
import GoogleMap from 'google-maps-react-markers'
import Marker from './Marker';


const Map = () => {

  interface CoordInfo {
    lat: number;
    lng: number;
    name: string
  }

  const coordinates: CoordInfo[] =
    [
      {
        lat: 45.4046987,
        lng: 12.2472504,
        name: "Venice"
      },
      {
        lat: 41.9102415,
        lng: 12.3959151,
        name: "Rome"
      },
      {
        lat: 45.4628328,
        lng: 9.1076927,
        name: "Milan"
      }
    ]

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        mapMinHeight="100vh"
        onChange={(map) => console.log('Map moved', map)}
      >
        {coordinates.map(({ lat, lng, name }, index) => (
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