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