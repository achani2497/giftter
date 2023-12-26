import { useReducer, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Password } from "../../components/Form/Input/Input";
import { errorReducer } from "../../hooks/Auth";
import { signUp } from "../../utils/Auth";
import { EmailAlreadyUsed } from "../../utils/Errors";
import { Validations } from "../../utils/Validations";
import { SignUp } from "../../utils/types";

export function SignUpForm({
    setIsSubmiting,
    setIsAwaitingConfirmation
}: {
    setIsSubmiting: any,
    setIsAwaitingConfirmation: any
}) {
    const navigate = useNavigate()

    const [error, dispatchError] = useReducer(errorReducer, { type: 'GENERIC', message: '' });
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<SignUp>({
        defaultValues: {
            first_name: '',
            last_name: '',
            birth_date: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    })

    function onSubmit(values: SignUp) {
        setIsSubmiting(true)
        signUp(values).then(
            () => {
                setIsAwaitingConfirmation(true)
                reset()
            }
        ).catch(e => {
            if (e instanceof EmailAlreadyUsed) {
                dispatchError({ type: 'SET_EMAIL_USED_ERROR' })
            } else {
                dispatchError({ type: 'SET_GENERIC_ERROR' })
            }
        })
            .finally(() => {
                setIsSubmiting(false)
            })
    }

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label='Tu nombre' fieldName='first_name' validations={Validations.user.first_name} register={register} errorObj={errors?.first_name} />
            <Input label='Tu apellido' fieldName='last_name' validations={Validations.user.last_name} register={register} errorObj={errors?.last_name} />
            <Input label='Email' fieldName='email' validations={Validations.user.email} register={register} errorObj={errors?.email} />
            {error.type === 'EMAIL_USED' && (<span className='text-red-500 -mt-4'>{error.message}</span>)}
            <Password label='Contraseña' fieldName='password' register={register} errorObj={errors?.password} />
            <Input type="password" label='Confirmación de Contraseña' fieldName='password_confirm' validations={{
                required: 'Es necesario que confirmes tu contraseña',
                validate: (value: any) => value === password.current || 'Las contraseñas no coinciden'
            }} register={register} errorObj={errors?.password_confirm} />
            {error.type === 'GENERIC' && error.message && (<span className='text-red-500 font-normal text-lg text-center'>{error.message}</span>)}
            <button className="bg-yellow-400 w-full shadow-lg hover:shadow-none transition-all font-bold text-slate-700 p-2 rounded-md mt-4" type="submit">Crear</button>
            <div className="flex flex-col text-center items-center">
                <span className="font-bold text-slate-700">¿Ya tenes cuenta?</span>
                <button className="font-bold text-blue-500 underline w-fit" onClick={() => navigate('/login')}>Ingresa aquí</button>
            </div>
        </form>
    )
}