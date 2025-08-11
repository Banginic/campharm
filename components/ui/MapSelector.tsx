"use client";

import { Title } from "@/components/index";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { useRouter } from "next/navigation";

// Fix missing marker icon
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { toast } from "react-toastify";
import { ArrowLeft, LoaderCircle, Locate } from "lucide-react";
import Link from "next/link";

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

function LocationPicker({
  onLocationSelected,
}: {
  onLocationSelected: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelected(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function UpdateLocation() {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const router = useRouter();
  const { apiFetch } = useApiClient();
  const { isPending, mutate, isError } = useMutation({
    mutationFn: () =>
      apiFetch("/api/pharmacy/update-location", {
        method: "PUT",
        body: JSON.stringify(marker),
      }),
    onSuccess: () => {
      toast.success("Location updated successfully.");
    },
    onError: () => {
      toast.error("Error, Updating Location");
    },
    onSettled: () => {
      router.push("/pharmacy/profile");
    },
  });

  return (
    <div>
      <Title text="Update Pharmacy Location" />
      <div className="text-sm mt-8 flex gap-4">
        <Link
          href={"/pharmacy/profile"}
          className="btn border hover:bg-black/10 flex gap-2 items-center"
        >
          <ArrowLeft size={16} />
          Cancel
        </Link>
        <button
          onClick={() => mutate()}
          className={`btn 
        ${
          isPending ? "bg-black/40 animate-pulse" : "bg-black/80 cursor-not-allowed"
        } text-white hover:bg-black  flex gap-2 items-center`}
        >
          {isPending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Locate size={16} />
          )}
          Update Location
        </button>
      </div>
      <MapContainer
        center={[4.05, 9.7]}
        zoom={13}
        style={{ height: "400px", width: "100%", marginTop: "1.5rem" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker
          onLocationSelected={(lat, lng) => setMarker({ lat, lng })}
        />
        {marker && <Marker position={[marker.lat, marker.lng]} />}
      </MapContainer>
    </div>
  );
}
