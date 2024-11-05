import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import DataTable from "./components/Table";
import AddForm from "./components/AddForm";
import { getLatLngObj } from "tle.js";

const REFRESH_TIME_MS = 5000

interface BasicSatInfo {
  id: number;
  name: string;
}

interface MapSatInfo extends BasicSatInfo {
  tle: string;
}

interface TableSatInfo extends BasicSatInfo {
  _id: string;
  command: string;
}

interface CoordInfo {
  lat: number;
  lng: number;
  name: string
}

const App = () => {
  const [satDisplayIds, setSatDisplayIds] = useState<number[]>([])
  const [tableSats, setTableSats] = useState<TableSatInfo[]>([])
  const [sats, setSats] = useState<CoordInfo[]>([])

  const gatherFetchData = async (input: number[]) => {
    const apiKey = process.env.REACT_APP_N2YO_KEY
    const urls: string[] = input.map((id: number) => "/rest/v1/satellite/tle/" + id + "&apiKey=" + apiKey)

    const responses = await Promise.all(urls.map((url: string) => fetch(url)));
    const data = await Promise.all(responses.map((response: Response) => response.json()));
    return data
  }

  useEffect(() => {
    getTableSats()
  }, [])

  useEffect(() => {
    const getSatInfo = async () => {
      console.log("GET EXTERNAL INFO")
      try {
        const data = await gatherFetchData(satDisplayIds)
        const allData = data.map((curData) => {
          const curSat: MapSatInfo = {
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
    getSatInfo()

    const interval = setInterval(() => {
      getSatInfo()
    }, REFRESH_TIME_MS);

    return () => clearInterval(interval);
  }, [satDisplayIds])

  const getTableSats = async () => {
    console.log("GET DB")
    try {
      const url: string = "http://localhost:5050/satellites"
      const response = await fetch(url);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const satellites: TableSatInfo[] = await response.json();
      setTableSats(satellites)
      const satIds: number[] = satellites.map((sat: TableSatInfo) => sat.id)
      setSatDisplayIds(satIds)
    } catch (error) {
      console.error("Error getting db data:", error);
    }
  }

  const postTableSat = async (body: TableSatInfo) => {
    console.log("POST DB")
    try {
      const response = await fetch("http://localhost:5050/satellites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding to db:", error);
    }
  }

  const handleAddSat = async (id: string) => {
    let addedId = parseInt(id)
    setSatDisplayIds([...satDisplayIds, addedId])

    let test = []
    test.push(addedId)

    const data = await gatherFetchData(test)
    const newData = data.map((curData) => {
      const curSat: TableSatInfo = {
        _id: "",
        id: curData.info.satid,
        name: curData.info.satname,
        command: ""
      }
      return curSat
    })

    setTableSats([...tableSats, newData[0]])
    postTableSat(newData[0])
  }

  return (
    <div className="App">
      <Map sats={sats} />
      <div>
        <DataTable rows={tableSats} />
        <AddForm handleAddSat={handleAddSat} />
      </div>
    </div>
  );
}

export default App;
