// assets

import CreditScoreIcon from '@mui/icons-material/CreditScore';
// constant


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const reporte = {
    id: 'Reporte',
    type: 'group',
    children: [    
       
      
        {
            id: 'compr',
            title: 'Reportes',
            type: 'collapse',
            icon: CreditScoreIcon,

            children: [
                {
                    id: 'factEmitidas',
                    title: 'Facturas Emitidas',
                    type: 'item',
                    url: '/Comprobante/FacturasEmitidas',
                    breadcrumbs: false
                },
                {
                    id: 'factSinRenten',
                    title: 'Factras sin Retenciones',
                    type: 'item',
                    url: '/Comprobante/FacturasSinReten',
                    breadcrumbs: false
                },
                {
                    id: 'liquiSinReten',
                    title: 'Liquidaciones sin Reten',
                    type: 'item',
                    url: '/Comprobante/LiquidacionSinReten',
                    breadcrumbs: false
                },
                
             
            ]
        },
    ]
};

export default reporte;
