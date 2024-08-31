"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
// import Map, { Source, Layer, Marker, Popup } from "react-map-gl/maplibre";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MapDemo() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
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
    </div>
  );
}
