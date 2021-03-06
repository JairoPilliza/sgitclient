import * as React from 'react';
import { useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModalUsuario from './ModalUsuario';
const Usuario = () => {
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
                    title="Usuarios"
                />
                <Divider></Divider>

                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Button variant='contained' startIcon={<EditIcon />} onClick={handleClickOpen('paper')}> Agregar Usuario </Button>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Ingrese persona o Identificaci??n"
                                style={{ width: "70%" }}
                                placeholder="Ingrese persona o Identificaci??n"
                                {...register("personaIdentificacion")}
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
                                    <TableCell align="center">Usuario</TableCell>
                                    <TableCell align="center">Nombre Usuario</TableCell>
                                    <TableCell align="center">Sucursal</TableCell>
                                    <TableCell align="center">Politica</TableCell>
                                    <TableCell align="center">Fecha Registro</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                    <TableCell align="center">Fecha Baja</TableCell>
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
                                        <TableCell align="center">
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant="contained" size='small' onClick={handleClickOpen('paper')} style={{ backgroundColor: "#ffac33" }} >
                                                        <EditIcon />
                                                    </Button>
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
            <ModalUsuario
                open={open}
                onClose={handleClose} />
        </Box>
    );
}
export default Usuario;