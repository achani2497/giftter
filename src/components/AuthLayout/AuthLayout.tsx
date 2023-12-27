import { GiftIcon } from "@heroicons/react/24/outline";
import { Navigate, useLocation } from "react-router-dom";
import { useIsLoggedIn } from "../../hooks/Auth";

export function AuthLayout({ isSignup = false, isAwaitingConfirmation = false, children }: { isSignup?: boolean, isAwaitingConfirmation?: boolean, children: JSX.Element }) {

    const userIsLoggedIn = useIsLoggedIn()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    return !userIsLoggedIn ? (
        <div className="flex flex-col absolute top-0 left-0 h-full w-full overflow-y-scroll bg-slate-100">
            <div className="flex flex-col p-4 justify-center shadow-lg items-center text-center rounded-b-3xl bg-yellow-400 animate-fade-down animate-once animate-duration-[600ms] animate-ease-linear">
                <GiftIcon className="h-[106px] w-h-[106px] text-slate-500" />
                <h1 className="font-bold text-3xl text-slate-700">Gifter</h1>
                <h2 className="font-bold text-2xl text-slate-700">¡Crea tu Wishlist!</h2>
                {(isSignup && !isAwaitingConfirmation) && <h4 className="font-semibold text-slate-700 text-lg mt-2">Registrate y empeza a agregar regalos a tu wishlist para compartirla con tus amigos</h4>}
            </div>
            {children}
        </div>
    ) : (
        <Navigate to={from} state={{ from: location }} replace />
    )
}