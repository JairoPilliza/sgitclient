import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Acordion from "./Acordion"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { Grid, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import loadContext from "../../contexts/loaderContext";


const General = (props) => {
    const URL = "http://apisiga.educacionadventista.edu.ec";//https://localhost:7204
    const setLook = useContext(loadContext);
    const [gradoLista, setGradoLista] = useState([]);
    const [gestionLista, setGestionLista] = useState([]);
    const [alumnoLista, setAlumnoLista] = useState([]);
    const handleClose = () => {
        props.setOpen(false);
    };
    const useStyles = makeStyles({
        topScrollPaper: {
            alignItems: 'flex-start',
        },
        topPaperScrollBody: {
            verticalAlign: 'top',
        },
    })
    useEffect(() => {
        const get = async () => {
            await fetch(URL + "/api/Dece/GestionesGet/" + 1025).then(async (result) => {
                result = await result.json();
                if (result.code == "1") {
                    if (!(result.payload == null)) {
                        setGestionLista(JSON.parse(result.payload));
                    }
                } else {
                    console.log(result);
                }
            });
        }
        get();
    }, [])
    const getGrados = async (gestion) => {
        setLook(true);
        await fetch(URL + "/api/Dece/GradosGet/" + 1025 + "/" + gestion).then(async (result) => {
            result = await result.json();
            if (result.code == "1") {
                if (!(result.payload == null)) {
                    setGradoLista(JSON.parse(result.payload));
                    setLook(false);
                }
            } else {
                console.log(result.message);
                setLook(false);
            }
        });
    };

    const getAlumno = async (grado) => {
        setLook(true);
        await fetch(URL + "/api/Dece/AlumnosGet/" + `${grado.idSucursal}/${grado.gestion}/${grado.idModalidad}/${grado.idGrado}/${grado.idParalelo}/${grado.idTurno}`).then(async (result) => {
            result = await result.json();
            if (result.code == "1") {
                if (!(result.payload == null)) {
                    setAlumnoLista(JSON.parse(result.payload));
                    setLook(false);
                }
            } else {
                console.log(result.message);
                setLook(false);
            }
        });
    };
    const getInfo = (alumno) => {
        props.event();
        localStorage.setItem("alumno", JSON.stringify(alumno));
    };
    const classes = useStyles();
    return (
        <Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={props.open}
                onClose={handleClose}
                classes={{
                    scrollPaper: classes.topScrollPaper
                }}
            >
                <DialogTitle> Exposición de Alumnos</DialogTitle>
                <DialogContent>
                    {/* <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                    </Box> */}
                    {/* <div className="modal-body"> */}
                    <div className="row">

                        <div className="col-md-4 input-group mb-3">
                            <AssignmentIndIcon sx={{ fontSize: 60 }} />
                            <div className="form-floating ">
                                <select onChange={(e) => getGrados(e.target.value)} className="form-select" id="idTipoRelacion" aria-label="Floating label select example">
                                    {

                                        gestionLista.length > 0 ?
                                            gestionLista.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.gestion}>{item.periodoLectivo}</option>
                                                )
                                            }) : ""
                                    }
                                </select>
                                <label htmlFor="idTipoRelacion">Periodo  </label>
                            </div>
                        </div>
                    </div>
                    {/* <div className="accordion" id={"accordionExample"}> */}
                    {/* <div className="row"> */}
                    {/* <Grid container spacing={2}> */}

                    {
                        gradoLista.map((item, index) => {
                            return (
                                // <Acordion key={index} collapse={index} grado={item} getAlumno={getAlumno} alumnoLista={alumnoLista} getInfo={getInfo} />                                            
                                // <Grid item lg={3} md={3} sm={12} xs={12}> 
                                <Acordion key={index} index={index} grado={item} getAlumno={getAlumno} alumnoLista={alumnoLista} getInfo={getInfo} />
                                //<RecipeReviewCard  />
                                // </Grid>
                            )
                        })
                    }
                    {/* </Grid> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    );
}
export default General;