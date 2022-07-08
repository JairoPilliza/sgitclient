import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { Fragment, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Cards from "../Card/Card";

export default function Acordion(props) {

    const [expanded, setExpanded] = React.useState(false);
    const [expandedMargin, setExpandedMargin] = React.useState('1px');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        // setExpandedMargin(isExpanded ? expandedMargin : '4px')
        // console.log(panel)
        //  console.log(event.target)
    };

    return (
        <Fragment>
            <Accordion className='mb-2 mt-1'
                // style={{ marginTop: expandedMargin, marginBottom: expandedMargin}}
                // style={{ margin: expandedMargin}}
                expanded={expanded === 'panel' + (props.index + 1)}
                onChange={handleChange('panel' + (props.index + 1))}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"panel" + (props.index + 1) + "bh-content"}
                    id={"panel" + (props.index + 1) + "bh-header"}
                    onClick={() => { props.getAlumno(props.grado) }}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {props.grado.modalidad}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {props.grado.descripcionGrado} "{props.grado.paralelo}"
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {/* invoke get alumnos */
                            props.alumnoLista.map((item, index) => {
                                return (
                                    <Grid key={index} item lg={4} md={3} sm={12} xs={12}>
                                        <Cards index={index} key={index} alumno={item} getInfo={props.getInfo} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    );
}