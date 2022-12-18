import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    attributes: { security: 0 }
  },
  // {
  //   title: true,
  //   name: 'Data'
  // },
  // {
  //   name: 'Mediciones',
  //   url: '/mediciones',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   children: [
  //     {
  //       name: 'Real Time',
  //       url: '/mediciones/real-time',
  //       iconComponent: { name: 'cil-cloud-download' }
  //     },
  //     {
  //       name: 'Listado de Mediciones',
  //       url: '/mediciones/listado',
  //       iconComponent: { name: 'cil-list' }
  //     },
  //     {
  //       name: 'Graficos',
  //       url: '/mediciones/graficos',
  //       iconComponent: { name: 'cil-chart' }
  //     },
  //     {
  //       name: 'Reportes',
  //       url: '/mediciones/reportes',
  //       iconComponent: { name: 'cil-spreadsheet' }
  //     }
  //   ]
  // },
  {
    title: true,
    name: 'Configuracion'
  },
  {
    name: 'Pila',
    url: '/configuracion/pila',
    iconComponent: { name: 'cil-gradient' },
    attributes: { security: 2 }
  },
  {
    name: 'Pano',
    url: '/configuracion/pano',
    iconComponent: { name: 'cil-view-column' },
    attributes: { security: 2 }
  },
  {
    name: 'Nodo',
    url: '/configuracion/nodo',
    iconComponent: { name: 'cil-equalizer' },
    attributes: { security: 2 }
  },
  {
    name: 'Clientes',
    url: '/admin/clients',
    iconComponent: { name: 'cil-contact' },
    attributes: { security: 99 }
  },
  {
    name: 'Usuarios',
    url: '/configuracion/usuarios',
    iconComponent: { name: 'cil-user-plus' },
    attributes: { security: 3 }
  },
];
