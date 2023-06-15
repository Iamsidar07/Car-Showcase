import { MouseEventHandler } from "react";

export interface Fuels {
    fuel: string;
    id: number;
}
export interface Models {
    model: string;
    id: number;
}

export interface Car {
    city_mpg: number
    class: string
    combination_mpg: number
    cylinders: number
    displacement: number
    drive: string
    fuel_type: string
    highway_mpg: number
    make: string
    model: string
    transmission: string
    year: number
}

export interface FetchCarProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
}

export interface CardCardProps {
    car: Car;
}

export interface CatalogueProps {
    allCars: Car[];
    limit: number;
}

export interface CustomButtonProps {
    title: string;
    type: 'button' | 'submit' | 'reset';
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: JSX.Element;
    containerStyle?: string;
}

export interface CustomSelectProps {
    options: { value: string, title: string }[];
    label: string;
    containerStyle?: string;
    onChange: (value: string,) => void;

}

export interface FilterProps {
    brand: string[],
    cylinders: string[],
    type: string[],
    drive: string[],
    fuelType: string[],
    rentPriceRange: string;
}