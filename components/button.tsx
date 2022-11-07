import type { NextPage } from 'next'


// Made the button component reuseable so passing in these props
interface ButtonProps {
    onClick: () => void
    buttonText: string
    disabled?: boolean
    disabledText?: string
}

const Button: NextPage<ButtonProps> = ({onClick, buttonText, disabled, disabledText}) => {

    return (
        <div className={`flex flex-col justify-center h-48 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${disabled ? "bg-gray-300" : "bg-primary hover:bg-primary-600"} rounded-8`} 
        onClick={disabled ? undefined : onClick}>
            <p className={`text-center ${disabled ? "text-disabled" : "text-white"} font-semibold text-body`}>
                {disabled && disabledText ? disabledText : buttonText}
            </p>
        </div>
    )
}

export default Button;