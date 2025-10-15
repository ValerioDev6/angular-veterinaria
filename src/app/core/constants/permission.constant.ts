
export const PERMISOS_V1 = [
    {
      name: 'Dashboard',
      permisos: [{
        name: 'Graficos',
        permiso: 'show_report_grafics',
      }],
    },
    {
      name: 'Roles y Permisos',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_rol'
        },
        {
            name: 'Listado',
            permiso: 'list_rol'
        },
        {
            name: 'Edición',
            permiso: 'edit_rol'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_rol'
        }
      ]
    },
    {
      name: 'Staffs',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_staff'
        },
        {
            name: 'Listado',
            permiso: 'list_staff'
        },
        {
            name: 'Edición',
            permiso: 'edit_staff'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_staff'
        }
      ]
    },
    {
      name: 'Veterinario',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_veterinary'
        },
        {
            name: 'Listado',
            permiso: 'list_veterinary'
        },
        {
            name: 'Edición',
            permiso: 'edit_veterinary'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_veterinary'
        },
        {
            name: 'Perfil',
            permiso: 'profile_veterinary'
        }
      ]
    },
    {
      name: 'Mascotitas',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_pet'
        },
        {
            name: 'Listado',
            permiso: 'list_pet'
        },
        {
            name: 'Edición',
            permiso: 'edit_pet'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_pet'
        },
        {
            name: 'Perfil',
            permiso: 'profile_pet'
        }
      ]
    },
    {
      name: 'Citas Medicas',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_appointment'
        },
        {
            name: 'Listado',
            permiso: 'list_appointment'
        },
        {
            name: 'Edición',
            permiso: 'edit_appointment'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_appointment'
        },
      ]
    },
    {
      name: 'Calendario',
      permisos: [{
        name: 'Disponibilidad',
        permiso: 'calendar',
      }],
    },
    {
      name: 'Pagos',
      permisos: [
        {
            name: 'Ver',
            permiso: 'show_payment'
        },
        {
            name: 'Gestión',
            permiso: 'edit_payment'
        },
      ]
    },
    {
      name: 'Vacunas',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_vaccionation'
        },
        {
            name: 'Listado',
            permiso: 'list_vaccionation'
        },
        {
            name: 'Edición',
            permiso: 'edit_vaccionation'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_vaccionation'
        },
      ]
    },
    {
      name: 'Procedimientos quirúrgicos',
      permisos: [
        {
            name: 'Registrar',
            permiso: 'register_surgeries'
        },
        {
            name: 'Listado',
            permiso: 'list_surgeries'
        },
        {
            name: 'Edición',
            permiso: 'edit_surgeries'
        },
        {
            name: 'Eliminar',
            permiso: 'delete_surgeries'
        },
      ]
    },
    {
      name: 'Historial Medico',
      permisos: [{
        name: 'Disponibilidad',
        permiso: 'show_medical_records',
      }],
    },
  ]
