import { MouseEventHandler, ReactNode } from "react";

export interface FuelsProps {
    fuel: string;
    id: number;
}
export interface ModelsProps {
    model: string;
    id: number;
}

export interface CarProps {
    capacity: number;
    carTitle: string;
    carType: string;
    cityMPG: number;
    cylinders:number;
    combinationMPG: number;
    creator: Creator;
    drive: string;
    fuelCapacity: number;
    fuelType: string;
    highwayMPG: number;
    imageFiles: string[];
    location: string;
    manufacturer: string;
    model: string;
    rentPrice: number
    shortDescription: string;
    transmission: string;
    typeOfclass: string;
    year: string;
    _id: string;
}

export interface CreatorProps {
    _id: string;
    email: string;
    username: string;
    email: string;
}
export interface FavoriteCarProps extends Car {
    typeOfClass: string;
    isFavorite: boolean;
    _id: string;
    creator: CreatorProps;
}
export interface FetchCarProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuelType?: string;
}

export interface CardCardProps {
    car: CarProps;
    isFavorite?: boolean;
    handleDelete?:(id: string) => void;
    handleEdit?:(id: string) => void;
}

export interface CatalogueProps {
    allCars: CarProps[];
    limit: number;
    isLoading:boolean;
}

export interface CustomButtonProps {
    title: string;
    type: 'button' | 'submit' | 'reset';
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: JSX.Element|undefined;
    containerStyle?: string;
    isLoading?: boolean;
}

export interface CustomSelectProps {
    options: { value: string; title: string }[];
    label: string;
    containerStyle?: string;
    parentContainerStyle?: string;
    onChange: (value: string, name: string) => void;
    name: string;

}

export interface FilterProps {
    brand: string[];
    cylinders: string[];
    type: string[];
    drive: string[];
    fuelType: string[];
    rentPriceRange: string;
}

export interface ProviderProps {
    children: ReactNode;
    session: any;
}

export interface FileProps {
    path: string;
    lastModified: number;
    lastModifiedDate: Date;
    name: string
    size: number
    type: string;
    webkitRelativePath: string;
    base64: string;
}

export interface CarInfoProps {
    carTitle: string;
    location: string;
    rentPrice: number;
    capacity: number;
    fuelCapacity: number;
    shortDescription: string;
    typeOfclass: string;
    model: string;
    manufacturer: string;
    cylinders: number;
    cityMPG: number;
    combinationMPG: number;
    highwayMPG: number;
    year: string;
    transmission: string;
    fuelType: string;
    carType: string;
    drive: string;
    imageFiles: string[];
}
