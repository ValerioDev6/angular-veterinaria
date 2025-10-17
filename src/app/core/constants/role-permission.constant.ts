export const PERMISOS = [
  {
    id: 1,
    name: 'Dashboard',
    permisos: [
      {
        id: '5760391c-d6a2-431f-9adb-4e8608bed8e6',
        name: 'Gráficos',
        action: 'show_report_grafics',
      },
    ],
  },
  {
    id: 2,
    name: 'Roles y Permisos',
    permisos: [
      {
        id: 'c8431604-37dd-4c2e-b87b-e3ec73d6ea20',
        name: 'Registrar',
        action: 'register_rol',
      },
      {
        id: 'acb6a34a-9b6f-4d2e-8004-134b31095d5d',
        name: 'Listado',
        action: 'list_rol',
      },
      {
        id: '47e60513-b016-4e8e-adcf-2371bc60d709',
        name: 'Edición',
        action: 'edit_rol',
      },
      {
        id: '3e29d9e8-7068-4883-b546-78f7a8b157e6',
        name: 'Eliminar',
        action: 'delete_rol',
      },
    ],
  },
  {
    id: 3,
    name: 'Staffs',
    permisos: [
      {
        id: 'ec61f063-38dd-48d3-93ae-c2e987f8b8ad',
        name: 'Registrar',
        action: 'register_staff',
      },
      {
        id: '1ca19f5d-b384-4624-9266-fb1fc29c57b2',
        name: 'Listado',
        action: 'list_staff',
      },
      {
        id: '82511cb4-25c9-4b05-9382-247532b0eb96',
        name: 'Edición',
        action: 'edit_staff',
      },
      {
        id: '6bb1012f-d3c7-4144-bbad-0e861b8a4098',
        name: 'Eliminar',
        action: 'delete_staff',
      },
    ],
  },
  {
    id: 4,
    name: 'Veterinarios',
    permisos: [
      {
        id: '6f0a0fb7-bf5a-4e09-b598-d08c90dfc2d7',
        name: 'Registrar',
        action: 'register_veterinary',
      },
      {
        id: 'eb2732f7-b44d-40a4-aca8-86b198a81106',
        name: 'Listado',
        action: 'list_veterinary',
      },
      {
        id: '8efd9bff-c0da-4d4c-aee2-dbf8cc1b1216',
        name: 'Edición',
        action: 'edit_veterinary',
      },
      {
        id: '81819317-ef78-40a2-8deb-a50791dc9a3e',
        name: 'Eliminar',
        action: 'delete_veterinary',
      },
      {
        id: '6892f478-cf3a-42bb-bd6d-80a242e789ac',
        name: 'Perfil',
        action: 'profile_veterinary',
      },
    ],
  },
  {
    id: 5,
    name: 'Mascotitas',
    permisos: [
      {
        id: '760d4720-ae8e-4470-bd69-665d9f6ceaae',
        name: 'Registrar',
        action: 'register_pet',
      },
      {
        id: '0305887c-5c5b-4444-95a8-a9d6db0bfad9',
        name: 'Listado',
        action: 'list_pet',
      },
      {
        id: '0f7031aa-c07f-4fe8-b61a-903ed868b8dc',
        name: 'Edición',
        action: 'edit_pet',
      },
      {
        id: 'e12c7791-1683-4c94-9154-c1409c0af8a0',
        name: 'Eliminar',
        action: 'delete_pet',
      },
      {
        id: 'c0b44824-fc82-4c64-a769-e10b08d5c924',
        name: 'Perfil',
        action: 'profile_pet',
      },
    ],
  },
  {
    id: 6,
    name: 'Citas Médicas',
    permisos: [
      {
        id: '769bfac0-eced-4718-9eb8-c3647d72c7cc',
        name: 'Registrar',
        action: 'register_appointment',
      },
      {
        id: '85c46db1-9fba-432a-baf5-8ddcea9c5a7b',
        name: 'Listado',
        action: 'list_appointment',
      },
      {
        id: 'fe3eb1e0-fd04-4581-b19a-f4ff3953e519',
        name: 'Edición',
        action: 'edit_appointment',
      },
      {
        id: '39e0756e-8b43-4bac-af23-18f90b90fc58',
        name: 'Eliminar',
        action: 'delete_appointment',
      },
    ],
  },
  {
    id: 7,
    name: 'Calendario',
    permisos: [
      {
        id: '85385032-b6ec-49da-b450-b58599665fd2',
        name: 'Disponibilidad',
        action: 'calendar',
      },
    ],
  },
  {
    id: 8,
    name: 'Pagos',
    permisos: [
      {
        id: 'c2352646-cfe0-4ce9-8ec7-cde0fdff98b7',
        name: 'Ver',
        action: 'show_payment',
      },
      {
        id: 'fff5ceda-7928-40f2-9703-815817c61196',
        name: 'Gestión',
        action: 'edit_payment',
      },
    ],
  },
  {
    id: 9,
    name: 'Vacunas',
    permisos: [
      {
        id: 'b3395331-403a-4474-9a08-1da5f616a4dc',
        name: 'Registrar',
        action: 'register_vaccionation',
      },
      {
        id: 'd8be27f9-17bd-4c80-9c62-010e397d64bd',
        name: 'Listado',
        action: 'list_vaccionation',
      },
      {
        id: '51f3c9ba-f816-4440-92d8-d02ed346a4f7',
        name: 'Edición',
        action: 'edit_vaccionation',
      },
      {
        id: '7cb70309-f89d-4660-8b93-6bbd84d2fe5c',
        name: 'Eliminar',
        action: 'delete_vaccionation',
      },
    ],
  },
  {
    id: 10,
    name: 'Procedimientos quirúrgicos',
    permisos: [
      {
        id: 'ad57b983-3230-429c-acc9-63429d91bffc',
        name: 'Registrar',
        action: 'register_surgeries',
      },
      {
        id: '7f07e342-bc8a-4ec9-8fd0-e9c57584d445',
        name: 'Listado',
        action: 'list_surgeries',
      },
      {
        id: '0912da01-ab8d-43cb-8480-f6887b828b61',
        name: 'Edición',
        action: 'edit_surgeries',
      },
      {
        id: 'b7b854f7-ab70-49fe-97e3-a0524d208582',
        name: 'Eliminar',
        action: 'delete_surgeries',
      },
    ],
  },
  {
    id: 11,
    name: 'Historial Médico',
    permisos: [
      {
        id: '24df86d4-3cbd-4d58-a2cc-7faa3d955625',
        name: 'Disponibilidad',
        action: 'show_medical_records',
      },
    ],
  },
];
