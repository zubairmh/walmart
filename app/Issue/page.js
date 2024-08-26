"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar } from "@/components/ui/avatar";

// Import the crop image

export default function CarouselDemo() {
  const mapRef = useRef(null);
  const [vs, setVS] = useState({
    longitude: 80.44905262502743,
    latitude: 22.61372936166029,
    zoom: 4,
  });
  const [data, setAllData] = useState({});

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
      <div className="flex flex-col grow items-center items-start justify-center p-8 space-x-8">
        {/* Carousel Section */}
        <div className="flex flex-col w-full h-full bg-gray-100 p-4 rounded-lg">
          <Map
            initialViewState={vs}
            onMove={onMove}
            ref={mapRef}
            style={{ width: "100%", height: "80vh", borderRadius: "10px" }}
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
        <div className="absolute bottom-10 drop-shadow-md right-0 scale-75 flex-col w-1/3 bg-transparent p-4 rounded-lg">
          <Carousel className="">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card className="w-full p-6 bg-[#f9f4f4] rounded-lg shadow-md">
                    <div className="flex flex-row justify-between items-stretch">
                      <div className="flex flex-col space-y-4 w-1/2">
                        <CardTitle className="text-3xl font-bold">
                          Hiv
                        </CardTitle>
                        <div className="text-lg bg-white px-3 py-1 rounded-md inline-block">
                          cases: 500
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <Label>Region:</Label>{" "}
                            <span className="font-medium"></span>
                          </div>
                          <div className="text-sm">
                            <Label>Date:</Label>{" "}
                            <span className="font-medium"></span>
                          </div>
                          <div className="text-sm">
                            <Label>Name:</Label>{" "}
                            <span className="font-medium"></span>
                          </div>
                          <div className="text-sm">
                            <Label>Symptoms Detected:</Label>{" "}
                            <span className="font-medium"></span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg grow flex items-center justify-center">
                        <img
                          src="/rice.jpg"
                          className="object-cover h-56 w-96 rounded-lg"
                        />
                      </div>
                    </div>
                    <CardFooter className="flex justify-between items-center mt-4">
                      <Button
                        variant="default"
                        className="px-4 py-2 bg-blue-600 text-white"
                      >
                        Issue Alert
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Map Section */}
      </div>
    </div>
  );
}
