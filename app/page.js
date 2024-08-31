"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl/maplibre";
import { PiPlantBold, PiCowDuotone } from "react-icons/pi";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Pin from "@/components/pin";
import { useRouter } from "next/navigation";
const states = {
  "Andaman And Nicobar": [11.66702557, 92.73598262],
  "Andhra Pradesh": [14.7504291, 78.57002559],
  "Arunachal Pradesh": [27.10039878, 93.61660071],
  Assam: [26.7499809, 94.21666744],
  Bihar: [25.78541445, 87.4799727],
  Chandigarh: [30.71999697, 76.78000565],
  Chhattisgarh: [22.09042035, 82.15998734],
  "Dadra And Nagar Haveli": [20.26657819, 73.0166178],
  Delhi: [28.6699929, 77.23000403],
  Goa: [15.491997, 73.81800065],
  Haryana: [28.45000633, 77.01999101],
  "Himachal Pradesh": [31.10002545, 77.16659704],
  "Jammu And Kashmir": [34.29995933, 74.46665849],
  Jharkhand: [23.80039349, 86.41998572],
  Karnataka: [12.57038129, 76.91999711],
  Kerala: [8.900372741, 76.56999263],
  Lakshadweep: [10.56257331, 72.63686717],
  "Madhya Pradesh": [21.30039105, 76.13001949],
  Maharashtra: [19.25023195, 73.16017493],
  Manipur: [24.79997072, 93.95001705],
  Meghalaya: [25.57049217, 91.8800142],
  Mizoram: [23.71039899, 92.72001461],
  Nagaland: [25.6669979, 94.11657019],
  Orissa: [19.82042971, 85.90001746],
  Puducherry: [11.93499371, 79.83000037],
  Punjab: [31.51997398, 75.98000281],
  Rajasthan: [26.44999921, 74.63998124],
  Sikkim: [27.3333303, 88.6166475],
  "Tamil Nadu": [12.92038576, 79.15004187],
  Tripura: [23.83540428, 91.27999914],
  UP: [27.59998069, 78.05000565],
  Uttaranchal: [30.32040895, 78.05000565],
  "West Bengal": [22.58039044, 88.32994665],
};

const cases = [
  { decease: "American Bollworm on Cotton", state: "Punjab", cases: 1 },
  { decease: "Anthracnose on Cotton", state: "Bihar", cases: 1 },
  { decease: "Army worm", state: "UP", cases: 1 },
  { decease: "Becterial Blight in Rice", state: "Punjab", cases: 1 },
  { decease: "Brownspot", state: "Punjab", cases: 1 },
  { decease: "Common_Rust", state: "Punjab", cases: 1 },
  { decease: "Cotton Aphid", state: "Punjab", cases: 1 },
  { decease: "Flag Smut", state: "Punjab", cases: 1 },
  { decease: "Gray_Leaf_Spot", state: "Punjab", cases: 1 },
  { decease: "Healthy Maize", state: "Punjab", cases: 1 },
  { decease: "Healthy Wheat", state: "Punjab", cases: 1 },
  { decease: "Healthy cotton", state: "Punjab", cases: 1 },
  { decease: "Leaf Curl", state: "Punjab", cases: 1 },
  { decease: "Leaf smut", state: "Punjab", cases: 1 },
];

export default function Home() {
  const mapRef = useRef(null);
  const router = useRouter();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [vs, setVS] = useState({
    longitude: 80.44905262502743,
    latitude: 22.61372936166029,
    zoom: 4,
  });
  const [data, setAllData] = useState({});
  const [reports, setReports] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [isAnimal, setIsAnimal] = useState(false);
  const [latestReports, setLatestReports] = useState({
    latest_reports: [],
    disease_counts: {},
  });

  const handleToggle = () => {
    setIsAnimal(!isAnimal);
  };
  useEffect(() => {
    fetch("/Walmarts.geojson")
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err));
  }, []);

  useEffect(() => {
    axios.get("http://172.16.164.211:8000/all_reports").then((res) => {
      setReports(res.data.all_reports);
      console.log("reports", res.data.all_reports);
    });
  }, []);

  const onMove = useCallback(({ viewState }) => {
    setVS(viewState);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://172.16.164.211:8000/latest_reports")
        .then((res) => {
          setLatestReports(res.data);
        })
        .catch((err) => {
          console.error("Could not fetch latest reports", err);
        });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar */}
      <nav className="bg-white text-black flex justify-between items-center border-b-2 relative">
        <div className="flex items-center space-x-4">
          <img
            src="./main1.png"
            className="h-[161px]"
            alt="Department of Animal Husbandry and Dairying Logo"
          />
          <div className="text-3xl font-semibold">
            <p>KRISHI MITRA</p>
          </div>
        </div>

        <img src="./main2.png" className="h-[161px]" alt="Logo 1" />

        <div className="absolute bottom-0 right-0 flex space-x-2 text-xl p-2">
          <div className=" flex items-center justify-center">
            <Button onClick={() => router.push("/")}>Home</Button>
          </div>
          <div className=" flex items-center justify-center">
            <Button onClick={() => router.push("/Analytics")}>Analytics</Button>
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={() => router.push("/Alerts")}>Alerts</Button>
          </div>
        </div>
      </nav>
      <div className="flex flex-row items-start justify-center p-8 border-solid">
        <div className="flex flex-col w-1/3 max-h-96  p-4 rounded-lg scroll-smooth border-solid">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disease</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Cases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestReports.latest_reports.map((report, index) => (
                  <TableRow
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => {
                      if (report.state in states) {
                        mapRef.current?.flyTo({
                          center: [
                            states[report.state][1],
                            states[report.state][0],
                          ],
                          zoom: 7,
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    <TableCell>{report.disease}</TableCell>
                    <TableCell>{report.state}</TableCell>
                    <TableCell>
                      {latestReports.disease_counts[report.disease]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <label className="flex cursor-pointer select-none items-center mb-4">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`block h-8 w-14 rounded-full ${
                isChecked ? "bg-red-500" : " bg-green-500"
              }`}
            ></div>
            <div
              className={`dot absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform ${
                isChecked ? "translate-x-6" : ""
              }`}
            >
              {isChecked ? (
                <PiCowDuotone className="text-red-500" />
              ) : (
                <PiPlantBold className="text-green-500" />
              )}
            </div>
          </div>
        </label>
        <div className="w-2/3 ml-8 relative">
          <Map
            initialViewState={vs}
            onMove={onMove}
            ref={mapRef}
            style={{ width: "100%", height: "600px", borderRadius: "10px" }}
            mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=OoO6K7R9CqFeyNgfk5Dk"
          >
            {reports.map((report, index) => {
              if (isChecked) {
                if (report.type !== "livestock") {
                  return null;
                }
              } else {
                if (report.type !== "plant") {
                  return null;
                }
              }
              return (
                <Marker
                  key={`marker-${index}`}
                  longitude={report.long}
                  latitude={report.lat}
                  anchor="bottom"
                  onClick={(e) => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
                    e.originalEvent.stopPropagation();
                  }}
                >
                  <Pin
                    pinStyle={{
                      cursor: "pointer",
                      fill: isChecked ? "#d00" : "#0a0",
                      stroke: "none",
                    }}
                  />
                </Marker>
              );
            })}
            {/* <Source id="walmarts" type="geojson" data={data}>
              <Layer
                id="walmart-layer"
                source="walmarts"
                type="symbol"
                layout={{
                  "icon-image": "pin",
                  "icon-size": 0.15,
                  "icon-anchor": "bottom",
                }}
              />
            </Source> */}
          </Map>
        </div>
      </div>
    </div>
  );
}
