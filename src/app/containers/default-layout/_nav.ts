import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    attributes: { security: 0 }
  },
  {
    title: true,
    name: 'Mediciones'
  },
  {
    name: 'Mediciones',
    url: '/mediciones',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Nodo / Fechas',
        url: '/mediciones/filtra-nodo',
        iconComponent: { name: 'cil-list' }
      }
    ]
  },
  {
    title: true,
    name: 'Configuracion'
  },
  {
    name: 'Configuracion',
    url: '/configuracion',
    iconComponent: { name: 'cil-cog' },
    children: [
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
      }
    ]
  }
];
