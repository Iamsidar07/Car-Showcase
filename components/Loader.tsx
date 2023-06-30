import Image from 'next/image'

const Loader = () => {
  return (
    <Image src={'/icons/loading.svg'} width={20} height={20} className='object-contain animate-spin' alt='loader'/>
  )
}

export default Loader