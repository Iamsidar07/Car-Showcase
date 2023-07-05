import { CustomInputProps } from '@/types';
import toast from 'react-hot-toast';

const CustomInput = ({  label, placeholder,name, type = 'text',value,onChange}:CustomInputProps) => {
    if (placeholder.length === 250) {
        toast('Reached max length');
    }
    return (
        <div className='flex flex-col w-full gap-2'>
            <label className='font-bold'>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder.slice(0,251)}
                className='pl-4 py-2.5 bg-transparent rounded-md border dark:border-slate-700 outline-none w-full'
            />
        </div>
    )
}

export default CustomInput