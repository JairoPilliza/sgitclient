// assets

import CreditScoreIcon from '@mui/icons-material/CreditScore';
// constant


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const retencion = {
    id: 'retencion',
   
    type: 'group',
    children: [    
      
        {
            id: 'reten',
            title: 'Retenciones',
            type: 'collapse',
            icon: CreditScoreIcon,

            children: [
                {
                    id: 'anulacionReten',
                    title: 'Anulacion de Retenciones',
                    type: 'item',
                    url: '/Retencion/AnulacionRetencion',
                    breadcrumbs: false
                },
                {
                    id: 'retenciones',
                    title: 'Retenciones',
                    type: 'item',
                    url: '/Retencion/Retenciones',
                    breadcrumbs: false
                },
                {
                    id: 'retenNoAut',
                    title: 'Retenciones no Autorizadas',
                    type: 'item',
                    url: '/Retencion/RetencionNoAut',
                    breadcrumbs: false
                },
                
             
            ]
        }
    ]
};

export default retencion;
