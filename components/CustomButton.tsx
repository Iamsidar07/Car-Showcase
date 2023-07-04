import { CustomButtonProps } from "@/types";
import Loader from "./Loader";

const CustomButton = ({ title, handleClick, containerStyle, type,isLoading,icon }: 
  CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isLoading}
      className={`outline-none px-4 py-1.5 md:py-2.5  md:px-6 text-center flex items-center justify-center  capitalize bg-blue-500  dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-600 rounded-full ${containerStyle} gap-2 ${isLoading && 'bg-opacity-90 '}`}
    >
      <span>{title}</span>
      {isLoading && <Loader/>}
      {icon && icon}
    </button>
  )
}

export default CustomButton;