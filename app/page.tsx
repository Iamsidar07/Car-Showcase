import { Catalogue, Hero } from "@/components";
import { Car, FetchCarProps } from "@/types";
import { fetchCars } from "@/utils";

export default async function Home({ searchParams }: { searchParams: FetchCarProps }) {
  const { manufacturer, year, fuel, limit, model } = searchParams;
  console.log(searchParams)
  const allCars = await fetchCars({
      manufacturer: manufacturer || '',
      year: year || 2022,
      model: model || '',
      limit: limit || 12,
      fuel: fuel || '',
    });
  console.log({allCars});
  return (
    <main className='overflow-hidden'>
      <Hero />
      <Catalogue allCars={allCars} limit={(limit || 10)/10} />
    </main>
  )
}
