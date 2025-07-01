"use client";
import { useContext } from "react";
import { PharmacyCard, NoPharmacy } from "./index";
import AppContext from "@/context/AppContext";
import { PHARMACIES } from "@/assets/data";


function PharmacyGrid() {
  const { preferedTown } = useContext(AppContext)!;
  const regionalPharmacies = PHARMACIES.find(
    (item) => item.region === preferedTown?.region
  );
  const areaPharmacies = regionalPharmacies?.pharmacies.filter(
    (item) => item.town === preferedTown?.city
  );
  if( !areaPharmacies || areaPharmacies.length < 1){
    return <NoPharmacy city={preferedTown?.city!} />
  }
  return (
    <section>
      <div>
        {areaPharmacies?.map((pharmacy) => (
          <PharmacyCard pharmacy={pharmacy} key={pharmacy.id} />
        ))}
      </div>
    </section>
  );
}

export default PharmacyGrid;
