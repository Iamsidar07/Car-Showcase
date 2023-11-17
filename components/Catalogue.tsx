"use client";
import Filter from "./Filter";
import Searchbar from "./Searchbar";
import CarCard from "./CarCard";
import CustomButton from "./CustomButton";
import { CatalogueProps } from "@/types";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CarCardSkeleton } from "./skeleton";

const Catalogue = ({ allCars, limit, isLoading }: CatalogueProps) => {
  const router = useRouter();
  const handleClick = () => {
    const newLimit = ((limit || 10) + 1) * 10;
    const pathname = updateSearchParams("limit", `${newLimit}`);
    router.push(pathname);
  };
  return (
    <section
      id="explore"
      className="w-full relative mt-12 p-4 md:p-16 max-w-[1440px] mx-auto"
    >
      <h1 className="font-bold text-2xl md:text-4xl ">Car Catalogue</h1>
      <p className="mt-2 text-sm md:text-lg">Explore out cars you might like</p>
      <div className="w-full flex flex-col md:flex-row items-center justify-center  md:justify-between gap-2 mt-6">
        <Searchbar />
        <Filter />
      </div>

      <div className="flex items-baseline justify-between mt-12">
        <h2 className="font-bold text-left text-lg md:text-2xl dark:text-pink-500">
          🚀 Recommendations
        </h2>
        <Link
          href={"/view-all"}
          className="text-blue-600 capitalize dark:text-pink-500"
        >
          view all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 mt-6">
        {allCars?.length === 0 && !isLoading ? (
          <p className="text-center text-xl w-full">No cars found</p>
        ) : (
          allCars?.slice(0, 4).map((car, i) => <CarCard key={i} car={car} />)
        )}
        {isLoading &&
          Array(4)
            .fill(0)
            .map((_, i) => <CarCardSkeleton key={i} />)}
      </div>
      <div className="flex items-baseline justify-between mt-12">
        <h2 className="font-bold text-left text-lg md:text-2xl dark:text-indigo-400">
          🔥 Hot Collections
        </h2>
        <Link
          href={"/view-all"}
          className="text-blue-600 capitalize dark:text-indigo-400"
        >
          view all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-2 md:gap-3 mt-6">
        {allCars?.length === 0 && !isLoading ? (
          <p className="text-center text-xl w-full">No cars found</p>
        ) : (
          allCars?.reverse()?.map((car, i) => <CarCard key={i} car={car} />)
        )}
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, i) => <CarCardSkeleton key={i} />)}
      </div>

      {limit < allCars?.length && (
        <CustomButton
          title="Show More"
          type="button"
          containerStyle="mt-12 mx-auto bg-blue-600 text-white px-6 border rounded-full dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
          handleClick={handleClick}
        />
      )}
    </section>
  );
};

export default Catalogue;
