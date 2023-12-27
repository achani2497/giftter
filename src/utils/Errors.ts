export const ERRORS = {
    EMAIL_NOT_CONFIRMED: 'Email not confirmed',
    INVALID_CREDENTIALS: 'Invalid login credentials'
}

export class EmailAlreadyUsed extends Error {
    constructor() {
        super('El email ingresado ya está siendo utilizado')
    }
}

export class EmailNotConfirmed extends Error {
    constructor() {
        super('Hace falta que confirme tu email ingresando al link que enviamos a tu correo.')
    }
}

export class InvalidLoginCredentials extends Error {
    constructor() {
        super('Email o contraseña incorrectos')
    }
}