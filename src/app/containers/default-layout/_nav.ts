import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    title: true,
    name: 'Data'
  },
  {
    name: 'Mediciones',
    url: '/mediciones',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Real Time',
        url: '/mediciones/real-time',
        iconComponent: { name: 'cil-cloud-download' }
      },
      {
        name: 'Listado de Mediciones',
        url: '/mediciones/listado',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Graficos',
        url: '/mediciones/graficos',
        iconComponent: { name: 'cil-chart' }
      },
      {
        name: 'Reportes',
        url: '/mediciones/reportes',
        iconComponent: { name: 'cil-spreadsheet' }
      }
    ]
  },
  {
    title: true,
    name: 'Configuracion'
  },
  {
    name: 'Mi Perfil',
    url: '/configuracion/mi-perfil',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Clientes',
    url: '/admin/clients',
    iconComponent: { name: 'cil-star' }
  },
];
