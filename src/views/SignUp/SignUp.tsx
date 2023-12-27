import { useState } from "react";
import { AuthLayout } from "../../components/AuthLayout/AuthLayout";
import { Spinner } from "../../components/Feedback/Spinner/Spinner";
import { SignUpForm } from "./SignUpForm";

export function SignUp() {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false)

    return (
        <AuthLayout isSignup isAwaitingConfirmation={isAwaitingConfirmation}>
            <div className="flex flex-col gap-4 p-8 justify-center text-left items-center animate-fade-up animate-once animate-duration-[600ms] animate-ease-linear">
                {isSubmiting ? (
                    <div className="w-full flex justify-center items-center">
                        <Spinner text='Creando cuenta' />
                    </div>
                ) : (
                    isAwaitingConfirmation ? (
                        <div className="flex flex-col gap-4 text-center">
                            <h2 className="text-3xl">Cuenta creada! ✅🎉</h2>
                            <span className="text-xl">Ya creamos tu cuenta pero necesitamos que la verifques mediante el mail que te acabamos de enviar!</span>
                        </div>
                    ) : (
                        <SignUpForm setIsSubmiting={setIsSubmiting} setIsAwaitingConfirmation={setIsAwaitingConfirmation} />
                    )
                )}
            </div>
        </AuthLayout>
    )
}