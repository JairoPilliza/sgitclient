// assets


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// constant


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const proveedor = {
    id: 'proveedor',
  
    type: 'group',
    children: [    
      
        {
            id: 'proveedor',
            title: 'Proveedores',
            type: 'collapse',
            icon: PeopleAltIcon,

            children: [
                {
                    id: 'proveedores',
                    title: 'Proveedores',
                    type: 'item',
                    url: '/Proveedor/ListarProveedor',
                    breadcrumbs: false
                },
                {
                    id: 'personaLiquidación',
                    title: 'Persona Liquidación',
                    type: 'item',
                    url: '/Proveedor/ListarPersonaLiquidacion',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default proveedor;
