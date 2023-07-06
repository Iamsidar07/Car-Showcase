import { MouseEventHandler, ReactNode } from 'react';

export interface FuelsProps {
    fuel: string;
    id: number;
}

export interface CarProps {
    capacity: number;
    carTitle: string;
    carType: string;
    cityMPG: number;
    cylinders: number;
    combinationMPG: number;
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
    creator: Creator;
    _id: string;
}

export interface CarInfoProps extends CarProps {
    creator?: Creator;
    _id?: string;
}

export interface CreatorProps {
    _id: string;
    email: string;
    username: string;
    email: string;
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
    handleDelete?: (id: string) => void;
    handleEdit?: (id: string) => void;
}

export interface CatalogueProps {
    allCars: CarProps[];
    limit: number;
    isLoading: boolean;
}

export interface CustomButtonProps {
    title: string;
    type: 'button' | 'submit' | 'reset';
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: JSX.Element | undefined;
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

export interface ImageUploaderProps {
    handleOnDrop: (acceptedFiles: File[]) => void;
    files: File[];
    carInfo?: CarInfoProps;
}

export interface CustomInputProps {
    label: string;
    placeholder: string;
    name: string;
    type?: 'text' | 'number' | 'radio' | 'number';
    value?: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
    carInfo: CarInfoProps;
    setCarInfo: React.Dispatch<React.SetStateAction<CarInfoProps>>;
    submitBtnTitle: string;
    title: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
}

export interface ShowAllCarsProps {
    allCars: CarProps[];
    limit: number;
    isLoading: boolean;
}
export interface FilterCardProps {
    title: string,
    category: keyof FilterProps,
    options: { value: string, label: string }[]
}

export interface QueryProps {
    model?: string | null | undefined;
    limit?: string | null | undefined;
    fuelType?: string | null | undefined;
    year?: string | null | undefined;
    manufacturer?: string | null | undefined;
}
