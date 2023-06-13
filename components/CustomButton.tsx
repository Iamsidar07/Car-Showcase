import { CustomButtonProps } from "@/types";

const CustomButton = ({ title, handleClick, icon, containerStyle, type }: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`outline-none rounded-full px-7 py-2.5 md:py-3.5 md:px-12 text-center flex items-center justify-center font-bold capitalize ${containerStyle} relative`}
    >
      <span>{title}</span>
      {icon && <div className='absolute right-8'>
        {icon}
      </div>}
    </button>
  )
}

export default CustomButton;