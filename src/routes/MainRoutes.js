import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
//Config
const AperturaEntidad = Loadable(lazy(() => import('component/Configuracion/Entidad/AperturaEntidad')));
const AperturaPeriodo = Loadable(lazy(() => import('component/Configuracion/Periodo/AperturaPeriodo')));
const Usuarios = Loadable(lazy(() => import('component/Configuracion/Usuario/Usuario')));
const SolicitudUsuario = Loadable(lazy(() => import('component/Configuracion/SolicitudUsuario/SolicitudUsuario')));
const RegistroRetencion = Loadable(lazy(() => import('component/Configuracion/Retencion/RegistroRetencion')));
const RegistroLiquidacion = Loadable(lazy(() => import('component/Configuracion/Liquidacion/RegistroLiquidacion')));
//Proveedor
const Proveedor  = Loadable(lazy(() => import('component/Proveedor/ListarProveedor')));
const PersonaLiquidacion = Loadable(lazy(() => import('component/Proveedor/ListarPersonaLiquidacion')));

//Retenciones
const AnulacionRetencion  = Loadable(lazy(() => import('component/Retencion/AnulacionRetencion')));
const Retenciones = Loadable(lazy(() => import('component/Retencion/Retenciones')));
const RetencionNoAut = Loadable(lazy(() => import('component/Retencion/RetencionNoAut')));

//ATS
const ATS = Loadable(lazy(() => import('component/ATS/GenerarATS')));
//Comprobantes
const FacturasEmitidas = Loadable(lazy(() => import('component/Comprobante/FacturasEmitidas')));
const FacturasSinReten = Loadable(lazy(() => import('component/Comprobante/FacturasSinReten')));
const LiquidacionSinReten = Loadable(lazy(() => import('component/Comprobante/LiquidacionSinReten')));


const UtilsDocumentos = Loadable(lazy(() => import('component/Documentos')));
const UtilsFactura = Loadable(lazy(() => import('component/Factura/Factura')));
const UtilsNotaVenta = Loadable(lazy(() => import('component/NotaVenta/NotaVenta')));
const UtilsLiquidacionCompra = Loadable(lazy(() => import('component/LiquidacionCompra/LiquidacionCompra')));
const UtilsNotaCredito = Loadable(lazy(() => import('component/NotaCredito/NotaCredito')));
const UtilsTicket = Loadable(lazy(() => import('component/Ticket/Ticket')));
const UtilsReembolso = Loadable(lazy(() => import('component/Reembolso/Reembolso')));
const UtilsAviacion = Loadable(lazy(() => import('component/Aviacion/Aviacion')));





const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },     
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/Configuracion/AperturaEntidad',
            element: <AperturaEntidad />
        },
        {
            path: '/Configuracion/AperturaPeriodo',
            element: <AperturaPeriodo />
        },
        {
            path: '/Configuracion/Usuario',
            element: <Usuarios />
        },
        {
            path: '/Configuracion/SolicitudUsuario',
            element: <SolicitudUsuario />
        },
        {
            path: '/Configuracion/RegistroRetencion',
            element: <RegistroRetencion />
        },
        {
            path: '/Configuracion/RegistroLiquidacion',
            element: <RegistroLiquidacion />
        },

        {
            path: '/Retencion/AnulacionRetencion',
            element: <AnulacionRetencion />
        },
        
        {
            path: '/Retencion/Retenciones',
            element: <Retenciones />
        },
        
        {
            path: '/Retencion/RetencionNoAut',
            element: <RetencionNoAut />
        },
        {
            path: '/ATS/GenerarATS',
            element: <ATS />
        },
        {
            path: '/Comprobante/FacturasEmitidas',
            element: <FacturasEmitidas />
        },
        {
            path: '/Comprobante/FacturasSinReten',
            element: <FacturasSinReten />
        },
        {
            path: '/Comprobante/LiquidacionSinReten',
            element: <LiquidacionSinReten />
        },
        {
            path: '/documentos',
            element: <UtilsDocumentos />
        },
        {
            path: '/Factura/Factura',
            element: <UtilsFactura />
        },
        {
            path: '/NotaVenta/NotaVenta',
            element: <UtilsNotaVenta />
        },
        {
            path: '/LiquidacionCompra/LiquidacionCompra',
            element: <UtilsLiquidacionCompra />
        },
        {
            path: '/NotaCredito/NotaCredito',
            element: <UtilsNotaCredito />
        },
        {
            path: '/Ticket/Ticket',
            element: <UtilsTicket />
        },
        {
            path: '/Reembolso/Reembolso',
            element: <UtilsReembolso />
        },
        {
            path: '/Aviacion/Aviacion',
            element: <UtilsAviacion />
        },
        {
            path: '/Proveedor/ListarProveedor',
            element: <Proveedor />
        },
        {
            path: '/Proveedor/ListarPersonaLiquidacion',
            element: <PersonaLiquidacion />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
