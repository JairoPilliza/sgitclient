// assets

import SettingsIcon from '@mui/icons-material/Settings';
// constant


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const config = {
    id: 'config',
   
    type: 'group',
    children: [    
      
        {
            id: 'config',
            title: 'Configuración',
            type: 'collapse',
            icon: SettingsIcon,

            children: [
                {
                    id: 'aperturaEntidad',
                    title: 'Apertura Entidad',
                    type: 'item',
                    url: '/Configuracion/AperturaEntidad',
                    breadcrumbs: false
                },
                {
                    id: 'aperturaPeriodo',
                    title: 'Apertura Periodo',
                    type: 'item',
                    url: '/Configuracion/AperturaPeriodo',
                    breadcrumbs: false
                },
                {
                    id: 'usuarios',
                    title: 'Usuarios',
                    type: 'item',
                    url: '/Configuracion/Usuario',
                    breadcrumbs: false
                },
                {
                    id: 'solicitudesUsuarios',
                    title: 'Solicitudes de Usuarios',
                    type: 'item',
                    url: '/Configuracion/SolicitudUsuario',
                    breadcrumbs: false
                },
                {
                    id: 'authReten',
                    title: 'Reg Autorización Reten',
                    type: 'item',
                    url: '/Configuracion/RegistroRetencion',
                    breadcrumbs: false
                },
                {
                    id: 'authLiqui',
                    title: 'Reg Autorización Liqui',
                    type: 'item',
                    url: '/Configuracion/RegistroLiquidacion',
                    breadcrumbs: false
                },
                {
                    id: 'anulacionComprobantesFisicos',
                    title: 'Reg Anulacion de comprobantes fisicos',
                    type: 'item',
                    url: '/Configuracion/RegAnulacionComprobanteFisico',
                    breadcrumbs: false
                }
             
            ]
        }
    ]
};

export default config;
