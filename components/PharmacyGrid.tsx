"use client";
import { useContext, useEffect, useState } from "react";
import { PharmacyCard, NoPharmacy, Loading } from "./index";
import AppContext from "@/context/AppContext";
import { PHARMACIES } from "@/assets/data";
import { PharmacyType } from "@/models/types";

function PharmacyGrid() {
  const { preferedTown } = useContext(AppContext)!;
  const [pharmacies, setPharmacies] = useState<PharmacyType[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const regionalPharmacies = PHARMACIES.find(
    (item) => item.region === preferedTown?.region
  );
  const areaPharmacies = regionalPharmacies?.pharmacies.filter(
    (item) => item.town === preferedTown?.city
  );

  useEffect(() => {
    async function fetchPharmacies() {
      setLoading(true);
      setError("");
      try {
        if (preferedTown?.city) {
          const res = await fetch(
            `/api/pharmacies?city=${encodeURIComponent(preferedTown?.city)}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          const data = await res.json()
         if( data.success){
          setPharmacies(data.data)
          return;
         }
         setError(data.error)
        }
      } catch (ex: unknown) {
        if (ex instanceof Error) {
          setError(ex.message);
        }
        setError("Error fetching data");
      }
      finally{
        setLoading(false)
      }
    }
    fetchPharmacies();
    return () => {};
  }, []);
  if(isLoading) return <Loading />
  if (!areaPharmacies || areaPharmacies.length < 1) {
    return <NoPharmacy city={preferedTown?.city!} />;
  }
  return (
    <section>
      <div>
        {pharmacies && pharmacies?.map((pharmacy) => (
          <PharmacyCard pharmacy={pharmacy} key={pharmacy.id} />
        ))}
      </div>
    </section>
  );
}

export default PharmacyGrid;
