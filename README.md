# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Features
[ ] Agregar amigos, primero via mail pero una mejora seria un buscador de amigos
[ ] En el inicio tiene que aparecer si un amigo agregó un regalo a su lista de deseos
[ ] Armar / Editar mis listas de regalos (Cada regalo tiene que tener un boton con el que se pueda marcar )
[ ] Visitar el perfil de un amigo, donde puedo ver su fecha de cumpleaños y su lista de regalos
[ ] Seccion / Chatbot donde pueda pedir sugerencias de regalos. Cuando termine de generar las ideas, el usuario puede seleccionar a qué amigo se le asigna esa conversacion para que le queden guardadas las sugerencias
[ ] Inicio de Sesión 
[ ] Formulario de creación de cuenta
[ ] Implementar Light/Dark mode
[ ] Seccion de listas de 5 regalos mas populares segun categoria (hacer una pegada para obtener ese top 5)
[ ] Las wishlist tienen que tener un boton de "Share" que genere un link a estas
[ ] Agregar un calendario de cumpleaños segun mes, tiene que haber un select que muestre los cumpleaños de cada mes y tiene que ver una opcion para ver todos juntos