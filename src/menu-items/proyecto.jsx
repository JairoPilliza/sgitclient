// assets


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// constant


// ==============================|| UTILITIES MENU ITEMS ||============================== //

const proyecto = {
    id: 'proyecto',
  
    type: 'group',
    children: [    
      
        {
            id: 'proyectos',
            title: 'Proyectos',
            type: 'collapse',
            icon: PeopleAltIcon,

            children: [
                {
                    id: 'proyectDepartamento',
                    title: 'Proyecto - Departamento',
                    type: 'item',
                    url: '/Proyecto/Proyecto',
                    breadcrumbs: false
                 },
                // {
                //     id: 'personaLiquidación',
                //     title: 'Persona Liquidación',
                //     type: 'item',
                //     url: '/Proveedor/ListarPersonaLiquidacion',
                //     breadcrumbs: false
                // }
            ]
        }
    ]
};

export default proyecto;
