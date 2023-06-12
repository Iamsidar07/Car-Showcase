import { CustomButton } from '@/components'
import Image from 'next/image'
const Hero = () => {
  return (
    <section className='max-w-[1440px] mx-auto relative flex flex-col md:flex-row items-center'>
      <div className='flex-1 p-4 md:p-16 pt-32 md:pt-28'>
        <h1 className='text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#4b71fd] to-black '>Find, book, rent a car—quick and super easy!</h1>
        <p className='text-lg md:text-xl md:mt-6 mt-2 mb-4 lg:mb-8'>Streamline your car rental experience with our effortless booking process.</p>
        <CustomButton title='Explore Cars' type='button' containerStyle='bg-blue-700 text-white' />
      </div>
      <div className='flex items-end lg:flex-[1.5] justify-end w-full h-[590px] lg:h-screen '>
        <div className='w-full h-full relative'>
          <Image
            src={'/images/hero.png'}
            alt='hero'
            quality={100}
            fill
            className='absolute top-0 bottom-0 left-0 right-0 w-[90%] h-[590px] lg:h-full lg:w-full object-contain scale-125 animate-car' />
        </div>
        <div className='absolute  md:-top-16 xl:-top-24 -right-[50%] md:-right-[33%] top-32 xl:-right-[40%] h-full w-full -z-10'>
          <Image src={'/images/hero-bg.png'} alt='hero bg' fill className='object-contain w-[90%] md:w-full h-[590px]' />
        </div>
      </div>

    </section>
  )
}

export default Hero