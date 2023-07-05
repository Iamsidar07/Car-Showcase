import { footerLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <div className='flex flex-col items-center justify-between md:flex-row mt-16 border-t dark:border-slate-800 group group-hover:shadow-lg gap-2'>
                <div className='flex flex-col items-start  md:flex-row md:justify-between py-12 px-4 md:p-12 w-full  md:items-start gap-4'>
                    <div>
                        <Link href={'/'}>
                            <span className='text-xl md:text-3xl text-indigo-700 font-bold dark:text-white'>Carsify</span>
                        </Link>
                        <p className='mt-4'>Carhub 2023 <br /> All Rights Reserved &copy;</p>
                    </div>
                    <div className='flex  items-center justify-between flex-wrap md:justify-evenly w-full flex-1 gap-3'>
                        {footerLinks.map(({ title, links }, i) => (<div key={i} className='space-y-2 flex flex-col items-start gap-4 '>
                            <p className='font-bold text-lg'>{title}</p>

                            {
                                links.map(({ title, url }, i) => <Link key={i} href={url} className='text-gray-400'>{title}</Link>)
                            }
                        </div>))}
                    </div>
                </div>
            </div>
            <div className='border-t dark:border-slate-800 p-4 md:p-12 flex items-center md:justify-between flex-col md:flex-row gap-2'>
                <p className='text-sm text-gray-400'>&copy;2023 CarHub. All reserved</p>
                <div className='flex items-center gap-2'>
                    <Link href={'/'} className='text-gray-400 text-sm'>Privacy & Policy</Link>
                    <Link href={'/'} className='text-gray-400 text-sm'>Terms & Condition</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;