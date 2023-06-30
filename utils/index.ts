import { CarProps, FetchCarProps } from '@/types';

export const fetchCars = async ({ manufacturer, year, model, limit, fuelType }: FetchCarProps) => {
    const headers = {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    try {
        const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}a&limit=${limit}&fuelType=${fuelType}&year=${year}&make=${manufacturer}`;
        const response = await fetch(url, {
            headers: headers
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const fetchFavoriteCars =async () => {
    try {
        const response = await fetch('/api/favorite');
        return response;
    } catch (error) {
        console.error(error);

    }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL(`https://cdn.imagin.studio/getimage`);
    const { year,manufacturer,model } = car;
    url.searchParams.append('customer', `hrjavascript-mastery`);
    url.searchParams.append('make', manufacturer);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
    return url.toString();
}


export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (value) {
        searchParams.set(type, value);
    } else {
        searchParams.delete(type);
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname;
}

