import * as React from 'react';
import { useForm } from "react-hook-form"
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModalRegistroLiquidacion from './ModalRegistroLiquidacion';

const RegistroLiquidacion = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
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
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Card>
                <CardHeader
                    title="Liquidación"
                />
                <Divider></Divider>

                <CardContent>
                    <Grid container>
                        <Grid item lg={6} md={6} sm={12} xs={12}   >
                            <Button variant='contained' startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleClickOpen('paper')}> Crear</Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>Sucursal</TableCell>
                                    <TableCell align="center">N° Autorizacion</TableCell>
                                    <TableCell align="center">Fecha Reg</TableCell>
                                    <TableCell align="center">Punto Facturazion</TableCell>
                                    <TableCell align="center">Secuencial Ini</TableCell>
                                    <TableCell align="center">Secuencial Fin</TableCell>
                                    <TableCell align="center">Secuencial Actual</TableCell>
                                    <TableCell align="center">Fecha Cad</TableCell>
                                    <TableCell align="center">Usuario</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
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
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button variant="contained" style={{ backgroundColor: "#ffac33" }}> <EditIcon /></Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" style={{ backgroundColor: "#e91e63" }}><DeleteIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card >
            <ModalRegistroLiquidacion
                open={open}
                onClose={handleClose} />
        </Box>
    );
}
export default RegistroLiquidacion;