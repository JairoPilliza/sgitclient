import React, { Fragment, useEffect, useState } from "react";
import { Divider, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BuscarRetencion = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    ];
    var showTable;
    if (table) {
        showTable =
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo Documento</TableCell>
                            <TableCell align="right">N° Documento</TableCell>
                            <TableCell align="right">Base Imp.</TableCell>
                            <TableCell align="right">Fecha Retención</TableCell>
                            <TableCell align="right">Gestion</TableCell>
                            <TableCell align="right">Periodo</TableCell>
                            <TableCell align="right">Autorizado</TableCell>
                            <TableCell align="right">Fecha Autorizado</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={e => setTable(false)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right"><Button variant="contained" startIcon={<LocalPrintshopIcon/>}></Button> 
                                <Button variant="contained" startIcon={<MailOutlineIcon/>}></Button></TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>;
    }


    return (
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12} sm={12} lg={12} md={12} >
                <SubCard className="col-12" title="Buscador de Retenciones" style={{ textAlign: "center" }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}  sm={6} md={6} lg={6}>
                            <TextField
                                required
                                id="outlined-basic"
                                label="Numero de Retencion:"
                               
                                style={{ width: "100%" }}
                                {...register("razonSocial")}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} sm={3} lg={3} >
                            <Button variant="outlined" startIcon={<SearchIcon />} onClick={e => setTable(true)}>
                                Buscar
                            </Button>
                        </Grid>                       
                    </Grid><br></br>
                    <Divider />
                    {
                        showTable
                    }
                </SubCard>

            </Grid>

          
        </Grid >

    );
}

export default BuscarRetencion;
