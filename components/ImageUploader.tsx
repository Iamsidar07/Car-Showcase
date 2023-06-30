'use client'
import { CarInfoProps, FileProps } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
interface ImageUploaderProps {
  handleOnDrop: (acceptedFiles: File[]) => void;
  files: File[];
  carInfo?: CarInfoProps;
}
const ImageUploader = ({ handleOnDrop, files, carInfo }: ImageUploaderProps) => {
  console.log({ files });
  return (
    <Dropzone onDrop={handleOnDrop}>
      {
        ({ getRootProps, getInputProps, isDragActive }) => (
          <div className='mt-2' >
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept='images/*' />
                  <h1 className='font-bold'>Upload Images</h1>
                  <div className='w-full h-fit min-h-[150px] md:min-h-[280px] border border-dashed border-gray-400 rounded-lg p-2 mt-3 flex flex-col items-center justify-center bg-[#f5f8ff]'>
                    <Image
                      alt='upload icon'
                      src={'/icons/discord.svg'}
                      width={27}
                      height={27}
                      className='object-contain'
                    />
                    <h2 className='text-gray-500 mt-2'>Drag and drop an image, or <span className='text-lg text-blue-500'>Browse</span></h2>
                    <p className='text-gray-400 mt-1'>High resolution images (.jpg,.png,.gif) </p>

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