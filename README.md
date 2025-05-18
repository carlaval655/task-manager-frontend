
# Task Manager Frontend

Este proyecto es el frontend de la aplicación **Task Manager**, una herramienta para gestionar tareas personales con autenticación segura. Está construido con **React** y utiliza **Tailwind CSS** para los estilos. Se conecta a un backend desarrollado en Node.js/Express y se comunica con una base de datos PostgreSQL alojada en Render.

## 🌐 Características

- Autenticación de usuario (registro, inicio de sesión, cierre de sesión) con JWT
- CRUD de tareas
- Validación de formularios
- Estilos responsivos con Tailwind CSS
- Rutas protegidas para usuarios autenticados
- Interfaz limpia e intuitiva

## 🚀 Tecnologías usadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [JWT](https://jwt.io/) (manejo en frontend)
- [Vite](https://vitejs.dev/)

## 🔧 Estructura del proyecto

```
task-manager-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── tailwind.config.js
```
## 💻 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/carlaval655/task-manager-frontend.git
cd task-manager-frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173)

## 🛡️ Seguridad

- Las rutas están protegidas mediante tokens JWT guardados en `localStorage`.
- Se verifica la autenticación antes de acceder a rutas privadas.
- La contraseña nunca se guarda en el frontend; se envía hasheada desde el backend.

### 🌐 Sitio en producción

Puedes acceder a la versión en producción aquí:

🔗 [https://task-manager-frontend.vercel.app](https://task-manager-frontend.vercel.app)

## 🧪 Scripts disponibles

- `npm run dev`: Inicia la aplicación en modo desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la build de producción.
