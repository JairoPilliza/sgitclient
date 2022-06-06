// assets

import CreditScoreIcon from '@mui/icons-material/CreditScore';
// constant
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const comprobante = {
    id: 'comprobante',
   
    type: 'group',
    children: [    
        {
            id: 'genATS',
            title: 'Generar ATS',
            type: 'item',
            url: '/ATS/GenerarATS',
            icon: FileDownloadIcon,
            breadcrumbs: false
        },
      
        {
            id: 'compr',
            title: 'Comprobantes',
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
        }
    ]
};

export default comprobante;
