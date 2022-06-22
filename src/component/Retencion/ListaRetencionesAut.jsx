
import * as React from 'react';
import { useForm } from "react-hook-form"
import { Grid, IconButton, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SearchIcon from '@mui/icons-material/Search';
const ListaRetencionesAut = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [value, setValue] = React.useState('1');

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
    ];

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12} />
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Buscar Retencion Aut"
                        style={{ width: "70%" }}
                        placeholder="Busca por N° Secuencial"
                        {...register("razonSocial")}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">

                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Tipo Doc</TableCell>
                            <TableCell align="center">N° Retención</TableCell>
                            <TableCell align="center">Nombre del Proveedor</TableCell>
                            <TableCell align="center">Fecha Emisión</TableCell>
                            <TableCell align="center">Periodo</TableCell>
                            <TableCell align="center">Dispositivo</TableCell>
                            <TableCell align="center">Ambiente</TableCell>
                            <TableCell align="center">Anulado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.name}>
                                <TableCell >
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>

                                <TableCell align="center">
                                    <Button variant="contained" > <LocalPrintshopIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>




    );
}

export default ListaRetencionesAut;
