import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';

const REFRESH_TIME_MS = 10000

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
    const url = "https://api.n2yo.com/rest/v1/satellite/tle/" + satId + "&apiKey=" + apiKey

    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const allSats = []
        const newSat = { lat: data.iss_position.latitude, lng: data.iss_position.longitude, name: "iss" }
        allSats.push(newSat)
        setSats(allSats)

      })
      .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <Map sats={sats} />
    </div>
  );
}

export default App;
