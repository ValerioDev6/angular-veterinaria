# 🐾 Sistema de Gestión Veterinaria

Sistema completo de gestión para clínicas veterinarias desarrollado con Angular 19 y NG-ZORRO (Ant Design).

## 📋 Descripción

Plataforma web profesional para la administración integral de clínicas veterinarias que permite gestionar citas médicas, pacientes (mascotas), veterinarios, historiales médicos, procedimientos quirúrgicos, vacunaciones y pagos.

## 🚀 Tecnologías

- **Angular 19.2.0** - Framework principal
- **NG-ZORRO (Ant Design)** - Biblioteca de componentes UI
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **Tailwind CSS** - Framework de utilidades CSS

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                          # Módulos y servicios core
│   │   ├── auth/                      # Autenticación y autorización
│   │   │   ├── guard/                 # Guards de rutas
│   │   │   ├── interceptors/          # Interceptores HTTP
│   │   │   └── services/              # Servicios de auth y storage
│   │   ├── constants/                 # Constantes de permisos y roles
│   │   ├── directive/                 # Directivas personalizadas
│   │   └── layout/                    # Layout principal
│   │
│   ├── features/                      # Módulos funcionales
│   │   ├── auth/                      # Login y autenticación
│   │   ├── home/                      # Dashboard principal
│   │   ├── roles/                     # Gestión de roles y permisos
│   │   ├── staff/                     # Gestión de personal
│   │   ├── veterinario/               # Gestión de veterinarios
│   │   ├── mascotas/                  # Gestión de mascotas
│   │   ├── citas-medicas/             # Gestión de citas médicas
│   │   ├── calendario/                # Calendario de disponibilidad
│   │   ├── pagos/                     # Gestión de pagos
│   │   ├── vacunas/                   # Control de vacunación
│   │   ├── procedimientos-quirurjicos/ # Cirugías y procedimientos
│   │   └── historial-medico/          # Historial médico de mascotas
│   │
│   └── shared/                        # Componentes y utilidades compartidas
│       ├── nz-modules/                # Módulos de NG-ZORRO
│       ├── pipes/                     # Pipes personalizados
│       └── utils/                     # Utilidades generales
│
└── environments/                      # Configuración de entornos
```

## 🔑 Características Principales

### Gestión de Usuarios y Seguridad
- Sistema de roles y permisos granular
- Autenticación con guards y interceptores
- Control de acceso por funcionalidad

### Módulos Funcionales
- **Dashboard**: Gráficos y reportes visuales
- **Roles y Permisos**: Administración de accesos
- **Staff**: Gestión de personal administrativo
- **Veterinarios**: Registro y gestión de profesionales
- **Mascotas**: Base de datos de pacientes
- **Citas Médicas**: Agendamiento y seguimiento
- **Calendario**: Disponibilidad de veterinarios
- **Pagos**: Control financiero
- **Vacunas**: Registro de vacunación
- **Cirugías**: Procedimientos quirúrgicos
- **Historial Médico**: Historia clínica completa

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ng serve
```

## 💻 Comandos de Desarrollo

```bash
# Servidor de desarrollo
ng serve

# Generar componente completo
ng g c nombre-componente

# Generar componente sin estilos
ng g c nombre-componente --inline-style

# Generar componente sin testing
ng g c nombre-componente --skip-tests

# Generar componente sin estilos ni testing
ng g c nombre-componente --inline-style --skip-tests

# Build de producción
ng build

# Ejecutar tests
ng test
```

## 🌐 Servidor de Desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

## 📦 Build

Ejecuta `ng build` para construir el proyecto. Los archivos de compilación se almacenarán en el directorio `dist/`.

## 👥 Contribución

Este proyecto sigue las mejores prácticas de Angular y utiliza una arquitectura modular escalable.

## 📄 Licencia

[Valerio06Dev]

---

Desarrollado con ❤️ usando Angular 19 y NG-ZORRO
