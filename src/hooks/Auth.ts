import { useSelector } from "react-redux";

export interface ErrorState {
    type: 'GENERIC' | 'EMAIL_USED';
    message: string;
}

export type ActionType = { type: 'SET_GENERIC_ERROR' } | { type: 'SET_EMAIL_USED_ERROR' };

export function errorReducer(state: ErrorState, action: ActionType): ErrorState {
    const genericError = 'Ocurrió un error. Por favor intente nuevamente.'
    switch (action.type) {
        case 'SET_GENERIC_ERROR':
            return { type: 'GENERIC', message: genericError };
        case 'SET_EMAIL_USED_ERROR':
            return { type: 'EMAIL_USED', message: 'El correo electrónico ingresado ya está registrado.' };
        default:
            return { type: 'GENERIC', message: genericError };
    }
}

export function useIsAuthenticated() {
    const userData = useSelector((store: any) => store.user.data);
    return userData.isAuthenticated
}