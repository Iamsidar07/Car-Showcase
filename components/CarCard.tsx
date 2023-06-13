import Image from 'next/image';
import CustomButton from './CustomButton';
import { CardCardProps } from '@/types';
import Link from 'next/link';
import { generateCarImageUrl } from '@/utils';

const CarCard = ({ car }: CardCardProps) => {
  const { model, drive, combination_mpg, make,displacement } = car;
  
  // Convert the car object into a compatible format
  const queryParams = Object.entries(car)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // Construct the URL with the query string
  const url = `/cars?${queryParams}`;

  return (
    <div className='w-full h-full  max-w-lg bg-[#f5f8ff] md:hover:bg-white md:hover:shadow-lg transition-all duration-150 ease-linear p-3 md:p-4 rounded-xl group '>
      <h1 className='text-lg md:text-xl font-bold capitalize'>{make} {model}</h1>
      <div className='relative w-16 mt-3'>
        <span className='absolute top-0 text-xs'>$</span>
        <span className='text-lg md:text-2xl font-bold text-center ml-2'>{(combination_mpg * displacement).toFixed(1)}</span>
        <span className='absolute bottom-0 text-xs'>/day</span>
      </div>
      <div className='relative w-full h-40'>
        <Image
          src={generateCarImageUrl(car)}
          alt='car'
          fill
          className='object-contain w-full'
        />
      </div>
      <div className='w-full mt-2 p-2 h-fit'>
        <div className='flex w-full items-center justify-between md:group-hover:hidden '>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/steering-wheel.svg'}
              alt='steering wheel'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>Automatic</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/tire.svg'}
              alt='tire'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm uppercase'>{drive}</span>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Image
              src={'/icons/gas.svg'}
              alt='gas'
              width={20}
              height={20}
              className='object-contain'
            />
            <span className='text-gray-400 text-sm'>{combination_mpg} MPG</span>
          </div>

        </div>
        <Link href={url} className='flex mt-4 md:mt-0 md:hidden md:group-hover:flex w-full'>
          <CustomButton
            title='View more'
            type='button'
            containerStyle='bg-blue-600 text-white w-full '
            icon={
              (<Image src={'/icons/right-arrow.svg'}
                alt='right arrow'
                width={20}
                height={20}
                className='obejct-contain'
              />)}
          />
        </Link>
      </div>
    </div>
  )
}

export default CarCard;