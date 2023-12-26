import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthLayout } from '../../components/AuthLayout/AuthLayout'
import { Spinner } from '../../components/Feedback/Spinner/Spinner'
import { LoginForm } from './LoginForm'

export function Login() {
    const [isSubmiting, setIsSubmiting] = useState(false)
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    return (
        <AuthLayout>
            <div className="flex flex-col gap-4 p-8 justify-center text-left items-center h-full">
                {isSubmiting ? (
                    <div className="w-full flex justify-center items-center">
                        <Spinner text='Ingresando' />
                    </div>
                ) : (
                    <LoginForm setIsSubmiting={setIsSubmiting} from={from} />
                )}
            </div>
        </AuthLayout>
    )
}