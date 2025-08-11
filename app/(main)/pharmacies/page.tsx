import { PreferedTown, Searchbar, PharmacyGrid } from "@/components/index";

 function Pharmacies() {
  return (
    <div className="min-h-screen mb-12">
      <h1 className="font-bold text-xl lg:text-4xl text-center text-green-950 m-8">
        PHARMACIES
      </h1>
      <section className="bg-white/40 p-4 w-[90%] rounded-lg mx-auto max-w-xl">
        <Searchbar />
        <PreferedTown />
      </section>
      <PharmacyGrid />
    </div>
  );
}
export default Pharmacies;
