import React, { Fragment, useEffect, useState } from "react";
import { Divider, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BuscarComprobantes = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function createData(name, tipo, fat, carbs, protein) {
        return { name, tipo, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 'Factura', 6.0, 24, 4.0),
        createData('Ice cream sandwich', 'Nota de venta', 9.0, 37, 4.3),

    ];
    var showTable;
    if (table) {
        showTable =
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nro. Factura</TableCell>
                            <TableCell>Tipo Comprobante</TableCell>

                            <TableCell align="right">Proveedor</TableCell>
                            <TableCell align="right">Ruc</TableCell>
                            <TableCell align="right">Fecha Emisión</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row) => (
                            <TableRow

                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.tipo}</TableCell>

                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right"><Button variant="contained" startIcon={<VisibilityIcon />}>Ver Factura</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>;
    }


    return (
        <Grid container spacing={gridSpacing} >
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <SubCard className="col-12" title="Buscar Comprobantes" style={{ textAlign: "center" }} >
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={6} xs={12}   >
                            <TextField
                                required
                                id="outlined-basic"
                                label="Ruc | Proveedor| N° Fact.:"
                                placeholder="N° Factura - Proveedor - Ruc"
                                style={{ width: "100%" }}
                                {...register("proveedor")}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}   >
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

export default BuscarComprobantes;
