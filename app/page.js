"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl/maplibre";
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
  { decease: "Mosaic sugarcane", state: "Punjab", cases: 1 },
  { decease: "RedRot sugarcane", state: "Punjab", cases: 1 },
  { decease: "RedRust sugarcane", state: "Punjab", cases: 1 },
  { decease: "Rice Blast", state: "Punjab", cases: 1 },
  { decease: "Sugarcane Healthy", state: "Punjab", cases: 1 },
  { decease: "Tungro", state: "Punjab", cases: 1 },
  { decease: "Wheat Brown leaf Rust", state: "Punjab", cases: 1 },
  { decease: "Wheat Stem fly", state: "Punjab", cases: 1 },
  { decease: "Wheat aphid", state: "Punjab", cases: 1 },
  { decease: "Wheat black rust", state: "Punjab", cases: 1 },
  { decease: "Wheat leaf blight", state: "Punjab", cases: 1 },
  { decease: "Wheat mite", state: "Punjab", cases: 1 },
  { decease: "Wheat powdery mildew", state: "Punjab", cases: 1 },
  { decease: "Wheat scab", state: "Punjab", cases: 1 },
  { decease: "Wheat___Yellow_Rust", state: "Punjab", cases: 1 },
  { decease: "Wilt", state: "Punjab", cases: 1 },
  { decease: "Yellow Rust Sugarcane", state: "Punjab", cases: 1 },
  { decease: "bacterial_blight in Cotton", state: "Punjab", cases: 1 },
  { decease: "bollrot on Cotton", state: "Punjab", cases: 1 },
  { decease: "bollworm on Cotton", state: "Punjab", cases: 1 },
  { decease: "cotton mealy bug", state: "Punjab", cases: 1 },
  { decease: "cotton whitefly", state: "Punjab", cases: 1 },
  { decease: "maize ear rot", state: "Punjab", cases: 1 },
  { decease: "maize fall armyworm", state: "Punjab", cases: 1 },
  { decease: "maize stem borer", state: "Punjab", cases: 1 },
  { decease: "pink bollworm in cotton", state: "Punjab", cases: 1 },
  { decease: "red cotton bug", state: "Punjab", cases: 1 },
  { decease: "thirps on cotton", state: "Punjab", cases: 1 },
];

export default function Home() {
  const mapRef = useRef(null);
  const [vs, setVS] = useState({
    longitude: 80.44905262502743,
    latitude: 22.61372936166029,
    zoom: 4,
  });
  const [data, setAllData] = useState({});
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    fetch("/Walmarts.geojson")
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err));
  }, []);

  const onMove = useCallback(({ viewState }) => {
    setVS(viewState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4 flex justify-between">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Disease Cases Dashboard</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Hi admin</span>
          <Avatar
            className="w-8 h-8"
            src="https://shadcn.dev/avatar.png" // Replace with your avatar URL
            alt="Admin Avatar"
          />
        </div>
      </nav>

      <div className="flex flex-row items-start justify-center p-8">
        <div className="flex flex-col w-1/3 max-h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg">
          <div>
            <Table>
              <TableCaption>Cases by State</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Decease</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Cases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseData, index) => (
                  <TableRow
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => {
                      if (caseData.state in states) {
                        mapRef.current?.flyTo({
                          center: [
                            states[caseData.state][1],
                            states[caseData.state][0],
                          ],
                          zoom: 7,
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    <TableCell>{caseData.decease}</TableCell>
                    <TableCell>{caseData.state}</TableCell>
                    <TableCell>{caseData.cases}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="w-2/3 ml-8 relative">
          <Map
            initialViewState={vs}
            onMove={onMove}
            ref={mapRef}
            style={{ width: "100%", height: "600px", borderRadius: "10px" }}
            mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=OoO6K7R9CqFeyNgfk5Dk"
          >
            <Source id="walmarts" type="geojson" data={data}>
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
            </Source>
          </Map>
        </div>
      </div>
    </div>
  );
}
