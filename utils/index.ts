import { Car, FetchCarProps } from '@/types';

export const fetchCars = async ({ manufacturer, year, model, limit, fuel }: FetchCarProps) => {
    const headers = {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    try {
        const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}a&limit=${limit}&fuel_type=${fuel}&year=${year}&make=${manufacturer}`;
        const response = await fetch(url, {
            headers: headers
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchFavoriteCars =async () => {
    try {
        const response = await fetch('/api/favorite');
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);

    }
}

export const generateCarImageUrl = (car: Car, angle?: string) => {
    const url = new URL(`https://cdn.imagin.studio/getimage`);
    const { make, year, model } = car;
    url.searchParams.append('customer', `hrjavascript-mastery`);
    url.searchParams.append('make', make);
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

