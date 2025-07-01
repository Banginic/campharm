import { PreferedTown, Searchbar, PharmacyGrid } from "@/components/index";

function Pharmacies() {
  return (
    <div>
      <h1 className="font-bold text-xl lg:text-4xl text-center text-green-950 mb-4">
        PHARMACIES
      </h1>
      <Searchbar />
      <PreferedTown />
      <PharmacyGrid />
    </div>
  );
}
export default Pharmacies;
