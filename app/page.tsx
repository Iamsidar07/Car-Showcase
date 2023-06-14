import { Catalogue, Hero } from '@/components';
import { FetchCarProps } from '@/types';
import { fetchCars } from '@/utils';

export default async function Home({ searchParams }: { searchParams: FetchCarProps }) {
  const { manufacturer, year, fuel, limit, model } = searchParams;
  const allCars = await fetchCars({
    manufacturer: manufacturer || '',
    year: year || 2022,
    model: model || '',
    limit: limit || 20,
    fuel: fuel || '',
  });

  return (
    <main className='overflow-hidden'>
      <Hero />
      {
        allCars && <Catalogue allCars={allCars} limit={(limit || 20) / 10} />
      }
    </main>
  )
}
