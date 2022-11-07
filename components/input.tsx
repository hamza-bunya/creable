import type { NextPage } from 'next'


// Props passed down by the parent component
interface InputProps {
    validationError?: string
    onChange: (value: string) => void
}

const Input: NextPage<InputProps> = ({validationError, onChange}) => {

    return(
        <div>
            <div className={`rounded-2xl ${validationError !== undefined ? "border shadow-focus-danger border-danger-500" : "border-none"}`}>
                <div className={`flex shadow-7.5 rounded-2xl`}>
                    <span className="inline-flex pl-24 py-3.5 leading-7 w-min items-center text-base font-semibold text-black rounded-l-2xl border border-r-0
                        border-gray-400 outline-light ">
                        tiktok.com/@
                    </span>
                    <input onChange={(e) => {onChange(e.target.value)}} type="text" className={`rounded-none  leading-7 ${validationError !== undefined ? "text-danger" : "text-black"} rounded-r-2xl border text-base font-semibold focus:outline-none
                            block flex-1 min-w-0 w-full border-gray-400 pl-0 py-3.5 border-l-0 placeholder:text-disabled`} placeholder="username" />
                </div>
            </div>
            <p className="text-danger-700 font-semibold text-sm mt-6">{validationError}</p>
        </div>
    )
}

export default Input;