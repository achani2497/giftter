import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useRef, useState } from "react"

const VALIDATION = {
    'SPECIAL_CHARACTERS': 'Al menos un carácter especial',
    'LOWER_CASE': 'Al menos una letra minúscula',
    'UPPER_CASE': 'Al menos una letra mayúscula',
    'NUMBER': 'Al menos un número',
    'MIN_LENGTH': 'Al menos 8 caracteres'
}

const REGEX = {
    SPECIAL_CHARACTERS: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/,
    LOWER_CASE: /(?=.*[a-z])/,
    UPPER_CASE: /(?=.*[A-Z])/,
    NUMBER: /(?=.*\d)/
}

export function Input({ label, fieldName, validations, register, errorObj, type = 'text' }:
    {
        label: string, fieldName: string, validations: any, register: any, errorObj: any, type?: string
    }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor={fieldName}>{label}</label>
            <input type={type} name={fieldName} id={fieldName} {...register(fieldName, validations)} className={`border-2 border-solid rounded-lg px-2 py-1  ${errorObj?.message?.toString() ? 'border-red-500' : ''}`} />
            {errorObj?.message?.toString() && (
                <span className="text-red-500 -mt-2"> {errorObj?.message?.toString()} </span>
            )}
        </div>
    )
}

export function Password({ label, fieldName, register, errorObj, showValidations = true }: {
    label: string, fieldName: string, register: any, errorObj: any, showValidations?: boolean
}) {
    const [type, setType] = useState('password')
    const [revealPassword, setRevealPassword] = useState(false)
    const password = useRef('')
    const iconStyles = 'absolute right-0 text-slate-700 top-[4px] mr-2 w-7 h-7'

    function handleChange(event: any) {
        password.current = event.target.value.trim()
    }

    function toggleVisibility() {
        const newType = type === 'password' ? 'text' : 'password'
        setType(newType)
        setRevealPassword(!revealPassword)
    }

    function color(validationResult: boolean) {
        if (!password.current) {
            return 'gray'
        }

        if (validationResult) {
            return '#f22613' // Rojo
        } else {
            return '#1d781d' // Verde
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor={fieldName}>{label}</label>
            <div className="relative">
                <input type={type} name={fieldName} id={fieldName} ref={password} {...register(fieldName, {
                    validate: {
                        required: (v: any) => v.length != 0 || 'La contraseña no puede estar vacia',
                    },
                    onChange: handleChange
                })} className={`border-2 border-solid rounded-lg w-full px-2 py-1  ${errorObj?.message?.toString() ? 'border-red-500' : ''}`} />
                <span className="flex justify-around items-center" onClick={toggleVisibility}>
                    {revealPassword ? <EyeSlashIcon className={iconStyles} /> : <EyeIcon className={iconStyles} />}
                </span>
            </div>
            {errorObj?.message?.toString() && (
                <span className="text-red-500 -mt-2"> {errorObj?.message?.toString()} </span>
            )}
            {showValidations && (
                <>
                    <span className="text-md text-slate-700 font-medium">La contraseña debe contener:</span>
                    <ul>
                        <ListItem color={color(!REGEX.SPECIAL_CHARACTERS.test(password.current))} rule={VALIDATION.SPECIAL_CHARACTERS} />
                        <ListItem color={color(!REGEX.LOWER_CASE.test(password.current))} rule={VALIDATION.LOWER_CASE} />
                        <ListItem color={color(!REGEX.UPPER_CASE.test(password.current))} rule={VALIDATION.UPPER_CASE} />
                        <ListItem color={color(!REGEX.NUMBER.test(password.current))} rule={VALIDATION.NUMBER} />
                        <ListItem color={color(password.current.length < 8)} rule={VALIDATION.MIN_LENGTH} />
                    </ul>
                </>
            )}
        </div>

    )
}

function ListItem({ color, rule }: { color: string, rule: string }) {
    return (
        <li className="flex items-center gap-1" style={{ color }}>
            <div className="rounded-full w-1 h-1 bg-slate-500"></div>
            <span> {rule} </span>
        </li>
    )
}