'use client'
import { ImageUploaderProps } from '@/types';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import { RiUpload2Line } from 'react-icons/ri';

const ImageUploader = ({ handleOnDrop, files, carInfo }: ImageUploaderProps) => {
  const { theme } = useTheme();
  return (
    <Dropzone onDrop={handleOnDrop}>
      {
        ({ getRootProps, getInputProps, isDragActive }) => (
          <div className='mt-2' >
            <div {...getRootProps()}>
              <input {...getInputProps()} accept='images/*' />
              <h1 className='font-bold'>Upload Images</h1>
              <div className='w-full h-fit min-h-[150px] md:min-h-[280px] border border-dashed border-gray-400 rounded-lg p-2 mt-3 flex flex-col items-center justify-center bg-[#f5f8ff] dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300  dark:border-zinc-600  pt-6'>

                <RiUpload2Line size={26} className={`${theme === 'dark'?'text-slate-300':'text-slate-700'}`} />
                <h2 className=' mt-2'>Drag and drop an image, or <span className='text-lg text-blue-500'>Browse</span></h2>
                <p className='mt-1'>High resolution images (.jpg,.png,.gif) </p>

                {
                  files?.length !== 0 && (
                    <ul className='mt-2 flex items-center gap-3 flex-wrap'>
                      {files?.map((file, i) => <li key={i}>
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={300}
                          height={200}
                          className='object-contain' />
                      </li>)}
                    </ul>
                  )
                }
                {
                  (carInfo && files.length === 0) && <ul className='mt-2 flex items-center gap-3 flex-wrap'>
                    {carInfo.imageFiles?.map((url, i) => <li key={i}>
                      <Image
                        src={url}
                        alt={url.slice(0, 10)}
                        width={300}
                        height={200}
                        className='object-contain' />
                    </li>)}
                  </ul>
                }

              </div>
            </div>
          </div>
        )
      }
    </Dropzone>
  )
}

export default ImageUploader;