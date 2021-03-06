
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Divider, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const  RetencionesNoAut = () =>  {
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
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    ];

    return (
        <MainCard>
            <Card sx={{ maxWidth: "100%" }}>
                <CardHeader
                    title="Re-Autorización de Documentos no autorizados por el SRI"
                />
                <Divider />
                <CardContent>
                    
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo Documento</TableCell>
                            <TableCell align="right">N° Retención</TableCell>
                            <TableCell align="right">Proveedor</TableCell>
                            <TableCell align="right">Base Imp.</TableCell>
                            <TableCell align="right">Fecha Emisión</TableCell>
                            <TableCell align="right">Gestión</TableCell>
                            <TableCell align="right">Periodo</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                               
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right"> <Grid container spacing={1}>
                                        <Grid item>
                                            <Button variant="contained" ><LocalPrintshopIcon /></Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" style={{ backgroundColor: "#33eb91" }} ><MailOutlineIcon /></Button>
                                        </Grid>

                                    </Grid></TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                </CardContent>


            </Card>
           
        </MainCard>
    );
}

export default RetencionesNoAut;
