"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import pin from "@/components/pin";
const geoUrl =
  "https://gist.githubusercontent.com/karmadude/4527959/raw/59492893c2f13ffb909ba48253fa7fa30a640c56/in-map-major-cities.json";

const cities = [
  {
    value: "Punjab",
    label: "Punjab",
    latitude: "30.97144454500733",
    longitude: "75.67498489905302",
    zoom: "6.602417325525511",
  },
  {
    value: "Uttar Pradesh",
    label: "Uttar Pradesh",
    latitude: "27.292293477691345",
    longitude: "80.33858351750962",
    zoom: "6.1554044414474225",
  },
  {
    value: "Delhi",
    label: "Delhi",
    latitude: "28.514611829938644",
    longitude: "77.27617981183232",
    zoom: "8.514525427978796",
  },
  {
    value: "Rajasthan",
    label: "Rajasthan",
    latitude: "25.10205010975477",
    longitude: "75.8774850096014",
    zoom: "9.531623480104635",
  },
  {
    value: "Maharashtra",
    label: "Maharashtra",
    latitude: "19.80814322795102",
    longitude: "75.49019127748943",
    zoom: "7.048559141609043",
  },
  {
    value: "Telangana",
    label: "Telangana",
    latitude: "17.41831970564313",
    longitude: "78.55660333122796",
    zoom: "7.875800271393367",
  },
  {
    value: "Andhra Pradesh",
    label: "Andhra Pradesh",
    latitude: "14.568178675390058",
    longitude: "79.48000242640717",
    zoom: "6.563889144711618",
  },
  {
    value: "Madhya Pradesh",
    label: "Madhya Pradesh",
    latitude: "22.729787356229366",
    longitude: "76.98253956754809",
    zoom: "7.243526177001536",
  },
];
export default function Home() {
  const mapRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const onSelectCity = useCallback(({ longitude, latitude, zoom }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], zoom: zoom, duration: 2000 });
  }, []);

  const onLoad = (e) => {
    if (mapRef.current) {
      const pinImage = new Image();
      pinImage.onload = () => {
        if (!mapRef.current.hasImage("pin")) {
          mapRef.current.addImage("pin", pinImage);
        }
      };
      pinImage.src = "/medium.svg"; // pin is your svg import
    }
  };

  const [data, setAllData] = useState({});
  const [vs, setVS] = useState({
    longitude: 80.44905262502743,
    latitude: 22.61372936166029,
    zoom: 4,
  });
  useEffect(() => {
    /* global fetch */
    fetch("/Walmarts.geojson")
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);
  const onMove = useCallback(({ viewState }) => {
    setVS(viewState);
  }, []);

  return (
    <div className="dark min-w-full min-h-screen flex flex-row items-center justify-center bg-[#111111] gap-6 text-white">
      
      <Map
        initialViewState={vs}
        onMove={onMove}
        minZoom={3.5}
        ref={mapRef} // need a ref to reference it later if you don't have it already
        onLoad={onLoad}
        style={{ width: 900, height: 600, borderRadius: "10px" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OoO6K7R9CqFeyNgfk5Dk"
      >
        <Source id="walmarts" type="geojson" data={data}>
          <Layer
            id="walmart-layer"
            source="walmarts"
            type="symbol"
            layout={{
              "icon-image": "pin", // Built-in marker icon
              "icon-size": 0.15, // Adjust icon size
              "icon-anchor": "bottom", // Anchor the icon to the bottom point
            }}
          />
        </Source>
      </Map>
      <div className="flex flex-col bg-[#191919] rounded-lg h-auto p-6 justify-center gap-6 backdrop-blur-sm shadow-xl">
        <h1 className="text-xl font-semibold">Walmart Demand Predictor</h1>
        <h3>Adjust Parameters</h3>
        <div className="mb-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? cities.find((city) => city.value === value)?.label
                  : "Select city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {cities.map((city) => (
                      <CommandItem
                        key={city.value}
                        value={city.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          console.log(city.longitude, city.latitude);
                          onSelectCity({
                            longitude: city.longitude,
                            latitude: city.latitude,
                            zoom: city.zoom
                          });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === city.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {city.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <h1 className="text-white">
          latitude: "{vs.latitude}", <br />
          longitude: "{vs.longitude}", <br />
          zoom: "{vs.zoom}"
        </h1>
      </div>
    </div>
  );
}
