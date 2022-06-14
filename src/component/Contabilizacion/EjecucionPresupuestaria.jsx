
import * as React from 'react';
import { useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardActions, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ModalEjecPresupuestaria from './ModalEjecPresupuestaria';
const EjecucionPresupuestaria = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
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
        createData('Frozen yoghurt', 159, 6.0, 200),
        createData('Ice cream sandwich', 237, 9.0, 400),

    ];

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                {
                    date: '2020-01-05',
                    customerId: '11091700',
                    amount: 3,
                },
                {
                    date: '2020-01-02',
                    customerId: 'Anonymous',
                    amount: 1,
                },
            ],
        };
    }
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <FormControl sx={{ minWidth: '100%', float: "left" }}>
                            <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="sustentoTributario"
                                style={{ width: "100%" }}
                                required
                                label="Departamento"
                                {...register("departamento")}
                            >
                                <MenuItem value={"Huaquillas"}>Huaquillas</MenuItem>
                                <MenuItem value={"Santo Domingo"}>Santo Domingo</MenuItem>
                                <MenuItem value={"Esmeraldas"}>Esmeraldas</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell align="center">  <FormControl sx={{ minWidth: '100%', float: "left" }}>
                        <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="sustentoTributario"
                            style={{ width: "100%" }}
                            required
                            label="Subcuenta"
                            {...register("subcuenta")}
                        >
                            <MenuItem value={"Insumos Medicos"}>Insumos Medicos</MenuItem>
                            <MenuItem value={"Tecnologico"}>Tecnologico</MenuItem>
                            <MenuItem value={"Gastos"}>Gastos</MenuItem>
                        </Select>
                    </FormControl></TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>

                    <TableCell align="center">
                        <Grid container>
                            <Grid item>
                                <Button variant='contained' onClick={handleClickOpen('paper')}>Dividir</Button>
                            </Grid>
                        </Grid>

                    </TableCell>

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    History
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Departamento</TableCell>
                                            <TableCell>Subcuenta</TableCell>
                                            <TableCell >Valor</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.amount}</TableCell>
                                                <TableCell >
                                                    100
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }


    return (
        <MainCard>
            <Card sx={{ maxWidth: "100%" }}>
                <CardHeader
                    title="Ejecución presupuestaria"
                />
                <Divider />
                <CardContent>

                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell >Departamento</TableCell>
                                    <TableCell align="center">Subcuenta</TableCell>
                                    <TableCell align="center">Factura</TableCell>
                                    <TableCell align="center">Valor</TableCell>
                                    <TableCell align="center">Opcion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.name} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </CardContent>
                <CardActions >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                        </Grid>

                        <Grid item xs={12} sm={12} md={4} lg={4}>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                Generar Asiento Contable
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>

            </Card>
            <ModalEjecPresupuestaria
                open={open}
                onClose={handleClose} />
        </MainCard>
    );
}

export default EjecucionPresupuestaria;
