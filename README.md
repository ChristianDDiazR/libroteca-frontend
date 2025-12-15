# Libroteca Frontend

Aplicación web frontend para la gestión de una biblioteca personal de libros, desarrollada con Angular 18.

## 🚀 Demo en Producción

La aplicación está desplegada en Railway: [https://libroteca-frontend-production.up.railway.app](https://libroteca-frontend-production.up.railway.app)

Backend API: [https://backend-production-7749.up.railway.app](https://backend-production-7749.up.railway.app)

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Angular CLI (versión 18.0.0)

## 🔧 Instalación y Configuración Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChristianDDiazR/libroteca-frontend.git
cd libroteca-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

El proyecto utiliza dos archivos de configuración de entorno:

#### Desarrollo Local (`src/environments/environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: '/api'  // Se usa con proxy local
};
```

#### Producción (`src/environments/environment.prod.ts`)

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://backend-production-7749.up.railway.app'
};
```

**Nota:** Si deseas conectarte a un backend diferente en desarrollo, modifica `apiUrl` en `environment.ts` o actualiza el archivo `proxy.conf.json`.

### 4. Configurar el proxy para desarrollo local

El archivo `proxy.conf.json` redirige las peticiones `/api` al backend local:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

**Asegúrate de que el backend esté corriendo en `http://localhost:3000`** antes de iniciar el frontend en modo desarrollo.

### 5. Ejecutar el proyecto localmente

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4200/`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con proxy configurado
- `npm start` - Sirve la aplicación de producción con http-server (usado en Railway)
- `npm run build` - Compila el proyecto para producción
- `npm test` - Ejecuta las pruebas unitarias

## 🎯 Funcionalidades Implementadas

### 1. Autenticación de Usuarios

#### Registro de Usuario
1. En la página principal, haz clic en "Registrarse"
2. Completa el formulario con:
   - Nombre de usuario (único)
   - Email (único)
   - Contraseña
3. Haz clic en "Registrarse"
4. El sistema creará tu cuenta y te redirigirá al login

#### Inicio de Sesión
1. En la página principal, ingresa tus credenciales:
   - Nombre de usuario o email
   - Contraseña
2. Haz clic en "Iniciar Sesión"
3. El sistema guardará tu token JWT y te redirigirá a la lista de libros

#### Cerrar Sesión
- Haz clic en el botón "Cerrar Sesión" en la barra de navegación
- Esto eliminará tu token y te redirigirá al login

### 2. Gestión de Libros

#### Ver Todos los Libros
- La página principal muestra todos los libros disponibles en la biblioteca
- Cada tarjeta muestra: título, autor, género, año de publicación y calificación promedio
- Puedes filtrar libros por género usando el selector en la parte superior

#### Ver Detalles de un Libro
1. Haz clic en cualquier tarjeta de libro
2. Se mostrará información detallada:
   - Imagen de portada
   - Título, autor, género, año
   - Descripción completa
   - Calificación promedio
   - Comentarios de usuarios

#### Crear un Nuevo Libro
1. Haz clic en el botón "Agregar Libro" en la página principal
2. Completa el formulario:
   - Título (requerido)
   - Autor (requerido)
   - ISBN (opcional)
   - Género (selecciona de la lista)
   - Año de publicación (requerido)
   - Descripción (opcional)
   - URL de imagen de portada (opcional)
3. Haz clic en "Crear Libro"

#### Editar un Libro
1. En los detalles del libro, haz clic en "Editar"
2. Modifica los campos que desees actualizar
3. Haz clic en "Guardar Cambios"

#### Eliminar un Libro
1. En los detalles del libro, haz clic en "Eliminar"
2. Confirma la acción
3. El libro será eliminado permanentemente

### 3. Sistema de Comentarios

#### Agregar un Comentario
1. En la página de detalles de un libro, desplázate a la sección de comentarios
2. Escribe tu comentario en el cuadro de texto
3. Haz clic en "Publicar Comentario"
4. Tu comentario aparecerá instantáneamente con tu nombre de usuario y fecha

#### Ver Comentarios
- Todos los comentarios se muestran en orden cronológico
- Cada comentario muestra: usuario, fecha y contenido

### 4. Sistema de Calificaciones

#### Calificar un Libro
1. En la página de detalles de un libro, busca la sección "Tu Calificación"
2. Selecciona de 1 a 5 estrellas
3. La calificación se guarda automáticamente
4. Puedes modificar tu calificación en cualquier momento

#### Ver Calificaciones
- La calificación promedio se muestra en cada tarjeta de libro
- En los detalles del libro se muestra el promedio general

### 5. Listas de Lectura Personales

#### Agregar Libro a una Lista
1. En los detalles de un libro, haz clic en "Agregar a Mi Lista"
2. Selecciona el estado de lectura:
   - Leyendo
   - Completado
   - Por Leer
3. El libro se agregará a tu lista personal

#### Ver Mis Listas
1. Haz clic en "Mis Listas" en la barra de navegación
2. Verás todos los libros organizados por estado de lectura
3. Cada libro muestra: portada, título, autor y fecha de agregado

#### Actualizar Estado de Lectura
1. En "Mis Listas", busca el libro que deseas actualizar
2. Haz clic en el selector de estado
3. Elige el nuevo estado (Leyendo, Completado, Por Leer)
4. El cambio se guarda automáticamente

#### Eliminar Libro de la Lista
1. En "Mis Listas", busca el libro que deseas eliminar
2. Haz clic en el icono de eliminar (X)
3. Confirma la acción
4. El libro se eliminará de tu lista personal

### 6. Gestión de Perfil de Usuario

#### Ver Perfil
1. Haz clic en tu nombre de usuario en la barra de navegación
2. Se mostrará tu información:
   - Nombre de usuario
   - Email
   - Fecha de registro

#### Editar Perfil
1. En tu perfil, haz clic en "Editar Perfil"
2. Puedes modificar:
   - Nombre de usuario
   - Email
   - Contraseña (opcional)
3. Haz clic en "Guardar Cambios"

## 🔒 Autenticación y Seguridad

- El sistema utiliza JWT (JSON Web Tokens) para la autenticación
- El token se almacena en `localStorage`
- Todas las peticiones autenticadas incluyen el token en el header `Authorization: Bearer <token>`
- Las rutas protegidas redirigen al login si no hay token válido

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios core y guards
│   │   ├── guards/              # Guards de autenticación
│   │   └── interceptors/        # HTTP interceptors
│   ├── features/                # Módulos de funcionalidades
│   │   ├── auth/                # Autenticación (login, registro)
│   │   ├── books/               # Gestión de libros
│   │   ├── comments/            # Sistema de comentarios
│   │   ├── lists/               # Listas de lectura
│   │   └── profile/             # Perfil de usuario
│   ├── models/                  # Interfaces y modelos
│   ├── shared/                  # Componentes compartidos
│   └── environments/            # Configuración de entornos
```

## 🚢 Despliegue en Railway

El proyecto está configurado para desplegarse automáticamente en Railway:

1. Cada push a `main` dispara un nuevo despliegue
2. Railway ejecuta: `npm ci` → `npm run build -- --configuration production`
3. El servidor http-server sirve los archivos estáticos en el puerto 8081
4. La configuración de build está en `nixpacks.toml`

### Configuración de Railway

**Variables de entorno necesarias en Railway:**
- `PORT`: 8081 (configurado automáticamente)

## 🛠️ Tecnologías Utilizadas

- **Angular 18** - Framework frontend
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **http-server** - Servidor de archivos estáticos para producción

## 📝 Notas Importantes

1. **Desarrollo Local**: Asegúrate de tener el backend corriendo en `localhost:3000` antes de iniciar el frontend con `npm run dev`

2. **Convención de Nombres**: El backend utiliza `snake_case` para los campos (ej: `user_id`, `book_id`), mientras que el frontend también los mantiene en `snake_case` para consistencia

3. **CORS**: El backend debe estar configurado para aceptar peticiones desde el dominio de Railway en producción

4. **Proxy**: En desarrollo, el proxy redirige `/api/*` a `http://localhost:3000/*` (eliminando el prefijo `/api`)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Christian Díaz - [@ChristianDDiazR](https://github.com/ChristianDDiazR)

Link del Proyecto: [https://github.com/ChristianDDiazR/libroteca-frontend](https://github.com/ChristianDDiazR/libroteca-frontend)
