
import { ShowAllCars } from "@/components";
import { Car, FetchCarProps } from "@/types";
import { fetchCars } from "@/utils";

const ViewAllCars = async ({ searchParams }: { searchParams: FetchCarProps }) => {
    const { manufacturer, year, fuel, limit, model } = searchParams;
    const allCars: Car[] = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        model: model || '',
        limit: limit || 20,
        fuel: fuel || '',
    });

    return (
        <section className='max-w-[1440px] mx-auto relative pt-16'>
            <ShowAllCars allCars={allCars} limit={(limit || 20) / 10} />
        </section>
    )
}

export default ViewAllCars;