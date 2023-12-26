import { supabase } from "./Supabase";
import { LoginUser, SignUp, User } from './types';

export class EmailAlreadyUsed extends Error {
    constructor(message: string) {
        super(message)
    }
}

export async function signUp({ email, password, first_name, last_name, birth_date }: SignUp) {
    const { data, error } = await supabase.auth.signUp(
        {
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name,
                    birth_date,
                },
                emailRedirectTo: 'localhost:5173/'
            }
        }
    )

    if (error) {
        console.log(error.name)
        throw new Error(error.message)
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        throw new EmailAlreadyUsed('El email ingresado ya está siendo utilizado')
    }

    return data
}

export async function login({ email, password }: LoginUser): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        let message = error.status === 400 ? 'Email o contraseña incorrectos' : 'Hubo un error. Por favor intenta de nuevo.'
        throw new Error(message)
    }

    return {
        id: data.user.id,
        birth_date: data.user.user_metadata.birth_date,
        first_name: data.user.user_metadata.first_name,
        last_name: data.user.user_metadata.last_name,
        email: data.user.email || ''
    }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}