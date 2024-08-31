"use client";
import React, { useState, useRef, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import { PiPlantBold, PiCowDuotone } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { heatmapLayer } from "@/components/heatMap";
import axios from "axios";
import {
  unclusteredPointLayer,
  clusterLayer,
  clusterCountLayer,
} from "@/components/layer";
import { useRouter } from "next/navigation";
const Switcher3 = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const mapRef = useRef(null);
  const [vs, setVS] = useState({
    longitude: 80.44905262502743,
    latitude: 22.61372936166029,
    zoom: 4,
  });
  const [data, setAllData] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [reports, setReports] = useState([]);
  useEffect(() => {
    axios.get("http://172.16.164.211:8000/all_reports").then((res) => {
      setReports(res.data.all_reports);
      console.log("reports", res.data.all_reports);
    });
  }, []);

  useEffect(() => {
    const features = reports.map((report) => {
      return {
        type: "Feature",
        properties: {
          mag: 0.6,
        },
        geometry: {
          type: "Point",
          coordinates: [report.long, report.lat],
        },
      };
    });
    setAllData({
      type: "FeatureCollection",
      features,
    });
  }, [reports]);
  return (
    <>
      <nav className="bg-white text-black flex justify-between items-center border-b-2">
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

        <div className="relative bottom-0 right-0 flex space-x-2 text-xl p-2">
          <Button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-white rounded"
          >
            Home
          </Button>
          <Button
            onClick={() => router.push("/Analytics")}
            className="px-4 py-2 text-white rounded"
          >
            Analytics
          </Button>
          <Button
            onClick={() => router.push("/Alerts")}
            className="px-4 py-2 text-white rounded"
          >
            Alerts
          </Button>
        </div>
      </nav>

      <div className="flex flex-col items-center mt-6">
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
                isChecked ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div
              className={`dot absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform ${
                isChecked ? "translate-x-6" : ""
              }`}
            >
              {isChecked ? (
                <PiPlantBold className="text-green-500" />
              ) : (
                <PiCowDuotone className="text-red-500" />
              )}
            </div>
          </div>
        </label>

        <div className="w-full">
          <Map
            initialViewState={vs}
            ref={mapRef}
            style={{
              width: "100%",
              height: "80vh", // Increased height for a bigger map
              borderRadius: "10px",
            }}
            mapStyle="https://api.maptiler.com/maps/topo-v2/style.json?key=OoO6K7R9CqFeyNgfk5Dk"
          >
            <Source
              type="geojson"
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
              data={data}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          </Map>
        </div>
      </div>
    </>
  );
};

export default Switcher3;
