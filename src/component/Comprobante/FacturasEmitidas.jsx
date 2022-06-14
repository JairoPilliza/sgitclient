
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Divider } from '@mui/material';
import BuscarComprobantes from 'component/BuscarComprobantes';


const  FacturasEmitidas = () =>  {
    const [value, setValue] = React.useState('1');

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
    ];

    return (
        <MainCard>
            <Card sx={{ maxWidth: "100%" }}>
                <CardHeader
                    title="Facturas Emitidas"
                />
                <Divider />
                <CardContent>
                    
                <BuscarComprobantes/>
                </CardContent>


            </Card>
           
        </MainCard>
    );
}

export default FacturasEmitidas;
