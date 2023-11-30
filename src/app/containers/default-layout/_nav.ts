import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    attributes: { security: 99, id: 0 }
  },
  {
    title: true,
    name: 'Reportes',
    attributes: { security: 99, id: 0 }
  },
  {
    name: 'Filtrar por Nodo',
    url: '/mediciones/filtra-nodo',
    iconComponent: { name: 'cil-list' },
    attributes: { security: 99, id: 1 }
  },
  {
    name: 'Monitoreo',
    url: '/mediciones/monitoreo',
    iconComponent: { name: 'cil-list' },
    attributes: { security: 99, id: 1 }
  },
  {
    title: true,
    name: 'Configuración',
    attributes: { security: 99, id: 0 }
  },
  {
    name: 'Pila',
    url: '/configuracion/pila',
    iconComponent: { name: 'cil-gradient' },
    attributes: { security: 2, id: 2 }
  },
  // {
  //   name: 'Pano',
  //   url: '/configuracion/pano',
  //   iconComponent: { name: 'cil-view-column' },
  //   attributes: { security: 2, id: 3 }
  // },
  {
    name: 'Nodo',
    url: '/configuracion/nodo',
    iconComponent: { name: 'cil-equalizer' },
    attributes: { security: 2, id: 4 }
  },
  {
    title: true,
    name: 'Sistema',
    attributes: { security: 99, id: 0 }
  },
  {
    name: 'Usuarios',
    url: '/configuracion/usuarios',
    iconComponent: { name: 'cil-user-plus' },
    attributes: { security: 2, id: 5 }
  },
  {
    name: 'Alertas',
    url: '/configuracion/alertas',
    iconComponent: { name: 'cil-user-plus' },
    attributes: { security: 2, id: 5 }
  },
  {
    title: true,
    name: 'Super Administrador',
    attributes: { security: 0, id: 6 }
  },
  {
    name: 'Clientes',
    url: '/admin/clients',
    iconComponent: { name: 'cil-contact' },
    attributes: { security: 0, id: 6 }
  } 
];
