import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    attributes: { security: 0, id: 0 }
  },
  {
    title: true,
    name: 'Mediciones'
  },
  {
    name: 'Nodo / Fechas',
    url: '/mediciones/filtra-nodo',
    iconComponent: { name: 'cil-list' },
    attributes: { security: 1, id: 1 }
  },
  {
    title: true,
    name: 'Configuracion'
  },
  {
    name: 'Pila',
    url: '/configuracion/pila',
    iconComponent: { name: 'cil-gradient' },
    attributes: { security: 2, id: 2 }
  },
  {
    name: 'Pano',
    url: '/configuracion/pano',
    iconComponent: { name: 'cil-view-column' },
    attributes: { security: 2, id: 3 }
  },
  {
    name: 'Nodo',
    url: '/configuracion/nodo',
    iconComponent: { name: 'cil-equalizer' },
    attributes: { security: 2, id: 4 }
  },
  {
    name: 'Usuarios',
    url: '/configuracion/usuarios',
    iconComponent: { name: 'cil-user-plus' },
    attributes: { security: 3, id: 5 }
  },
  {
    name: 'Clientes',
    url: '/admin/clients',
    iconComponent: { name: 'cil-contact' },
    attributes: { security: 99, id: 6 }
  }
];
