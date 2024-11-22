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
    name: 'Mediciones Nodo',
    url: '/mediciones/filtra-nodo',
    iconComponent: { name: 'cil-list' },
    attributes: { security: 99, id: 1 }
  },
  {
    title: true,
    name: 'Graficos',
    attributes: { security: 99, id: 0 }
  },
  {
    name: 'Pila Promedio por Día',
    url: '/mediciones/grafico-pila',
    iconComponent: { name: 'cil-list' },
    attributes: { security: 99, id: 1 }
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
    url: '/configuracion/alerta',
    iconComponent: { name: 'cil-user-plus' },
    attributes: { security: 2, id: 5 }
  },
  {
    title: true,
    name: 'Super Administrador',
    attributes: { security: 0, id: 6 }
  },
  {
    name: 'Admin Dashboard',
    url: '/admin/admin-dashboard',
    iconComponent: { name: 'cil-speedometer' },
    attributes: { security: 0, id: 7 }
  },
  {
    name: 'Clientes',
    url: '/admin/clients',
    iconComponent: { name: 'cil-contact' },
    attributes: { security: 0, id: 6 }
  } 
];
