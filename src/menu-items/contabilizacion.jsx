// assets

import PaidIcon from '@mui/icons-material/Paid';

// constant


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const contabilizacion = {
    id: 'contabilizacion',
  
    type: 'group',
    children: [    
      
        {
            id: 'conta',
            title: 'Contabilizacion',
            type: 'collapse',
            icon: PaidIcon,

            children: [
                {
                    id: 'construirAsiento',
                    title: 'Construir Asiento Contable',
                    type: 'item',
                    url: '/Contabilizacion/ConstruirAsiento',
                    breadcrumbs: false
                 },
                {
                    id: 'listaAsientos',
                    title: 'Lista Asientos Contables',
                    type: 'item',
                    url: '/Contabilizacion/ListaAsientoContable',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default contabilizacion;
