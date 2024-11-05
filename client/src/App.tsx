import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import { getLatLngObj } from "tle.js";

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
  const [satDisplayIds, setSatDisplayIds] = useState<number[]>([25544, 61183, 26082])
  const [sats, setSats] = useState<CoordInfo[]>([])

  useEffect(() => {
    getSatInfo()
    const interval = setInterval(() => {
      getSatInfo()
    }, REFRESH_TIME_MS);

    return () => clearInterval(interval);
  }, [])

  const getSatInfo = async () => {
    const apiKey = process.env.REACT_APP_N2YO_KEY
    const urls: string[] = satDisplayIds.map((id: number) => "/rest/v1/satellite/tle/" + id + "&apiKey=" + apiKey)

    try {
      const responses = await Promise.all(urls.map((url: string) => fetch(url)));
      const data = await Promise.all(responses.map((response: Response) => response.json()));

      const allData = data.map((curData) => {
        const curSat: SatApiInfo = {
          id: curData.info.satid,
          name: curData.info.satname,
          tle: curData.tle
        }
        const position = getLatLngObj(curSat.tle);
        const newSat: CoordInfo = { lat: position.lat, lng: position.lng, name: curSat.name }
        return newSat
      })

      setSats(allData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="App">
      <Map sats={sats} />
      <div>
        Hello
      </div>
    </div>
  );
}

export default App;
