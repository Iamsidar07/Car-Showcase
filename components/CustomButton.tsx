import { MouseEventHandler } from "react";
interface CustomButtonProps {
  title: string;
  type: "button" | "submit" | "reset";
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  containerStyle?: string;
}
const CustomButton = ({ title, handleClick, icon, containerStyle, type }: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`outline-none rounded-full px-4 py-2.5 md:py-3.5 md:px-12 text-sm text-center flex items-center justify-center font-bold capitalize ${containerStyle} relative`} onClick={handleClick}>
      <span>{title}</span>
      {icon && <div className='absolute right-8'>
        {icon}
      </div>}
    </button>
  )
}

export default CustomButton