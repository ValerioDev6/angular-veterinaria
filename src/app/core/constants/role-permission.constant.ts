export const PERMISOS = [
  {
    id: 1,
    name: 'Dashboard',
    permisos: [
      {
        id: '2758db9d-c32f-4f47-84e7-989a9e466fc5',
        name: 'Gráficos',
        action: 'show_report_grafics'
      },
    ],
  },
  {
    id: 2,
    name: 'Roles y Permisos',
    permisos: [
      {
        id: 'f85c982f-8ef7-4bd9-bffb-70bcefe63d10',
        name: 'Registrar',
        action: 'register_rol'
      },
      {
        id: '11e7b573-ff6e-4d18-89de-a8c61e61988b',
        name: 'Listado',
        action: 'list_rol'
      },
      {
        id: 'db5964e1-37e3-43c7-be41-ba3e15b9d3f9',
        name: 'Edición',
        action: 'edit_rol'
      },
      {
        id: '78dfb758-61b1-4382-a9b3-54ca2353627a',
        name: 'Eliminar',
        action: 'delete_rol'
      }
    ]
  },
  {
    id: 3,
    name: 'Staffs',
    permisos: [
      {
        id: '568259cb-bfc2-4bac-bf23-a4fd8e6954be',
        name: 'Registrar',
        action: 'register_staff'
      },
      {
        id: '24cb9192-7f13-4d22-a476-eff3b388f0a9',
        name: 'Listado',
        action: 'list_staff'
      },
      {
        id: '30f65925-a128-4df7-a7c6-41449d14f3e1',
        name: 'Edición',
        action: 'edit_staff'
      },
      {
        id: 'f6a04e1b-00ce-4e95-8c69-44e377683094',
        name: 'Eliminar',
        action: 'delete_staff'
      }
    ]
  },
  {
    id: 4,
    name: 'Veterinarios',
    permisos: [
      {
        id: '52ee3067-1480-498d-85f3-2c5368930a78',
        name: 'Registrar',
        action: 'register_veterinary'
      },
      {
        id: 'a41d6dae-51ba-47f0-907d-daae51ff7f88',
        name: 'Listado',
        action: 'list_veterinary'
      },
      {
        id: '474b9457-2d66-4816-bc7b-e70e8854fd2e',
        name: 'Edición',
        action: 'edit_veterinary'
      },
      {
        id: 'b6c6743a-3128-4011-9915-8eb08d847ca7',
        name: 'Eliminar',
        action: 'delete_veterinary'
      },
      {
        id: 'e62582db-6e74-40b2-bfe8-6bebe52be1b1',
        name: 'Perfil',
        action: 'profile_veterinary'
      }
    ]
  },
  {
    id: 5,
    name: 'Mascotitas',
    permisos: [
      {
        id: 'aa4555fa-ea8d-4630-8520-acfee138e392',
        name: 'Registrar',
        action: 'register_pet'
      },
      {
        id: '69e62db6-c11b-42ac-9fe4-5749d3c294b5',
        name: 'Listado',
        action: 'list_pet'
      },
      {
        id: '9fb35863-470e-41c3-990c-e6a7ae830bd9',
        name: 'Edición',
        action: 'edit_pet'
      },
      {
        id: '0ccafdc0-f8df-4c7c-b9d6-78e10dc77800',
        name: 'Eliminar',
        action: 'delete_pet'
      },
      {
        id: '61bf9dbd-6ac2-4c1a-9ef3-07390419a789',
        name: 'Perfil',
        action: 'profile_pet'
      }
    ]
  },
  {
    id: 6,
    name: 'Citas Médicas',
    permisos: [
      {
        id: '350a7b32-69bc-43ae-bf55-2eb4f1b8ff02',
        name: 'Registrar',
        action: 'register_appointment'
      },
      {
        id: '0b1a0ef0-5486-47d7-8d0a-46c75117a315',
        name: 'Listado',
        action: 'list_appointment'
      },
      {
        id: 'da41442f-4dfb-4783-bfb7-3f9ef1ab1356',
        name: 'Edición',
        action: 'edit_appointment'
      },
      {
        id: '77d04abb-8116-4edb-a078-ebade9aa32e1',
        name: 'Eliminar',
        action: 'delete_appointment'
      },
    ]
  },
  {
    id: 7,
    name: 'Calendario',
    permisos: [
      {
        id: '0f68c966-ff2b-4601-afa9-4f0211d1daf0',
        name: 'Disponibilidad',
        action: 'calendar',
      }
    ],
  },
  {
    id: 8,
    name: 'Pagos',
    permisos: [
      {
        id: '4f29d1df-a032-415f-ba1a-eea41c657a8e',
        name: 'Ver',
        action: 'show_payment'
      },
      {
        id: 'eb1b7ad6-2019-491c-8281-e673306381ad',
        name: 'Gestión',
        action: 'edit_payment'
      },
    ]
  },
  {
    id: 9,
    name: 'Vacunas',
    permisos: [
      {
        id: '3acb37a7-5dff-48f3-a362-f7388f8c01e6',
        name: 'Registrar',
        action: 'register_vaccionation'
      },
      {
        id: '4fe4d49f-aada-4933-81e5-f4016ff9cd31',
        name: 'Listado',
        action: 'list_vaccionation'
      },
      {
        id: '02fea739-66de-4e52-9a14-61c026b3ce33',
        name: 'Edición',
        action: 'edit_vaccionation'
      },
      {
        id: '5560ce84-0e7f-4ac2-b45d-fcca74dfc5cb',
        name: 'Eliminar',
        action: 'delete_vaccionation'
      },
    ]
  },
  {
    id: 10,
    name: 'Procedimientos quirúrgicos',
    permisos: [
      {
        id: '841f0633-f228-4ed6-a559-eb80d0566534',
        name: 'Registrar',
        action: 'register_surgeries'
      },
      {
        id: '98794909-e07b-4c81-809c-c0c348dc35a7',
        name: 'Listado',
        action: 'list_surgeries'
      },
      {
        id: '899a7b47-f4d5-4c63-b48b-0924cfc53a49',
        name: 'Edición',
        action: 'edit_surgeries'
      },
      {
        id: 'f75cd9fe-6e35-4050-90d2-f3cf5926fa0e',
        name: 'Eliminar',
        action: 'delete_surgeries'
      },
    ]
  },
  {
    id: 11,
    name: 'Historial Médico',
    permisos: [
      {
        id: '797b95e2-9e07-4186-ad49-6beafe7a6508',
        name: 'Disponibilidad',
        action: 'show_medical_records',
      }
    ],
  },
];
