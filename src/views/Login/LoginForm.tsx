import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsLoggedIn, setUserData } from '../../Redux/Slice/user'
import { Input, Password } from '../../components/Form/Input/Input'
import { login } from '../../utils/Auth'
import { Validations } from '../../utils/Validations'


export function LoginForm({ setIsSubmiting, from }: { setIsSubmiting: any, from: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    function submitForm(data: any) {
        setIsSubmiting(true)
        login(data)
            .then((data) => {
                console.log(data)
                dispatch(setIsLoggedIn(true))
                dispatch(setUserData(data))
                navigate(from, { replace: true })
            })
            .catch(e => {
                setError(e.message)
            })
            .finally(() => setIsSubmiting(false))
    }

    return (
        <>
            <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(submitForm)}>
                <Input label='Email' fieldName='email' register={register} validations={Validations.user.email} errorObj={errors?.email} />
                <Password label='Contraseña' fieldName='password' register={register} errorObj={errors?.password} showValidations={false} />
                {error && (<span className='text-red-500 font-medium text-lg text-center'>{error}</span>)}
                <button className="bg-yellow-400 w-full shadow-md hover:shadow-none transition-all font-bold text-slate-700 p-2 rounded-md mt-4" type="submit">Ingresar</button>
            </form>
            <button className="font-bold border border-solid border-yellow-400 w-full rounded-lg p-2 shadow-md text-slate-700" onClick={() => navigate('/sign-up')}>Crear cuenta</button>
        </>
    )
}