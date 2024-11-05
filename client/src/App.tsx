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
    const url = "/rest/v1/satellite/tle/" + satId + "&apiKey=" + apiKey

    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="App">
      <Map sats={sats} />
    </div>
  );
}

export default App;
