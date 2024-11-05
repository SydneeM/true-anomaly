import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import { getLatLngObj } from 'tle.js';

const REFRESH_TIME_MS = 10000

interface SatApiInfo {
  id: number;
  name: string;
  tle: string;
}

interface CoordInfo {
  lat: number;
  lng: number;
  name: string
}

const App = () => {
  const [sats, setSats] = useState<CoordInfo[]>([])

  useEffect(() => {
    getSatInfo()
    const interval = setInterval(() => {
      getSatInfo()
    }, REFRESH_TIME_MS);

    return () => clearInterval(interval);
  }, [])

  const getSatInfo = () => {
    const apiKey = process.env.REACT_APP_N2YO_KEY
    const satId = "25544"
    const url = "/rest/v1/satellite/tle/" + satId + "&apiKey=" + apiKey

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const curSat: SatApiInfo = {
          id: data.info.satid,
          name: data.info.satname,
          tle: data.tle
        }
        const position = getLatLngObj(curSat.tle);

        const allSats = []
        const newSat = { lat: position.lat, lng: position.lng, name: curSat.name }
        allSats.push(newSat)
        setSats(allSats)

      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="App">
      <Map sats={sats} />
    </div>
  );
}

export default App;
