export const Validations = {
    gift: {
        title: {
            required: 'Es necesario que agregues un titulo a tu regalo',
            maxLength: {
                value: 60,
                message: 'El titulo no puede tener más de 60 caractéres'
            },
            minLength: {
                value: 3,
                message: 'El titulo debe tener al menos 3 caractéres'
            }
        },
        url: {
            required: 'Es necesario de que agregues una url para tu regalo',
            maxLength: {
                value: 400,
                message: 'La url no puede tener mas de 400 caractéres'
            },
        }
    },
    user: {
        first_name: {
            required: 'Es necesario que ingreses tu nombre',
            maxLength: {
                value: 20,
                message: 'Tu nombre no puede tener más de 20 caractéres'
            },
            minLength: {
                value: 3,
                message: 'Tu nombre debe tener al menos 3 caractéres'
            }
        },
        last_name: {
            required: 'Es necesario que ingreses tu apellido',
            maxLength: {
                value: 20,
                message: 'Tu apellido no puede tener más de 20 caractéres'
            },
            minLength: {
                value: 3,
                message: 'Tu apellido debe tener al menos 3 caractéres'
            }
        },
        email: {
            required: 'Es necesario que ingreses tu email',
            maxLength: {
                value: 50,
                message: 'El mail no puede exceder los 50 caractéres'
            },
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Email inválido',
            },
        },
        password: {
            required: 'Es necesario que ingreses tu contraseña',
            maxLength: {
                value: 30,
                message: 'Tu contraseña no puede tener mas de 30 caratéres'
            },
            minLength: {
                value: 8,
                message: 'Tu contraseña debe tener al menos 8 caratéres'
            }
        },
    }
}