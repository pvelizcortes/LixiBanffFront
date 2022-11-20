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
    name: 'Pila',
    url: '/configuracion/pila',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Pano',
    url: '/configuracion/pano',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Nodo',
    url: '/configuracion/nodo',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Clientes',
    url: '/admin/clients',
    iconComponent: { name: 'cil-star' }
  },
];
