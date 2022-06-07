// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import DescriptionIcon from '@mui/icons-material/Description';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'ejecucionPresupuestaria',
            title: 'Ejecucion Presupuestaria',
            type: 'item',
            url: '/Contabilizacion/EjecucionPresupuestaria',
            icon: PointOfSaleIcon,
            breadcrumbs: false
        },
        {
            id: 'documentos',
            title: 'Documentos',
            type: 'item',
            url: '/documentos',
            icon: DescriptionIcon,
            breadcrumbs: false
        },
        {
            id: 'factura',
            title: 'Factura',
            type: 'item',
            url: '/Factura/Factura',
            icon: DescriptionIcon,
            breadcrumbs: false
        },
        {
            id: 'notaVenta',
            title: 'Nota Venta',
            type: 'item',
            url: '/NotaVenta/NotaVenta',
            icon: CreditCardIcon,
            breadcrumbs: false
        },
        {
            id: 'liquidacionCompra',
            title: 'Liquidación de compra',
            type: 'item',
            url: '/LiquidacionCompra/LiquidacionCompra',
            icon: CreditCardIcon,
            breadcrumbs: false
        },
        {
            id: 'notaCredito',
            title: 'Nota de Credito',
            type: 'item',
            url: '/NotaCredito/NotaCredito',
            icon: CreditCardIcon,
            breadcrumbs: false
        },
        {
            id: 'ticket',
            title: 'Ticket',
            type: 'item',
            url: '/Ticket/Ticket',
            icon: CreditCardIcon,
            breadcrumbs: false
        },
        {
            id: 'reembolso',
            title: 'Reembolso',
            type: 'item',
            url: '/Reembolso/Reembolso',
            icon: CreditCardIcon,
            breadcrumbs: false
        },
        {
            id: 'aviacion',
            title: 'Aviacion',
            type: 'item',
            url: '/Aviacion/Aviacion',
            icon: CreditCardIcon,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
