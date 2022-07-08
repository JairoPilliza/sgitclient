import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    fontSize: 'small',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Cards(props) {
    const [expanded, setExpanded] = React.useState(false);
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <Card className='mb-2' >
            <CardHeader className=' card-cursor-hover-event'
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} src={"https://mui.com/static/images/cards/paella.jpg"} >
                    </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={props.alumno.nombreAlumno} /* nombre del alumno */
                subheader={"F.Nacimiento:" + props.alumno.fechaNacimiento + " " + "Cod." + props.alumno.codAlumno} /* fechaNacimiento y codigoAlumno */
            />
            <CardActions style={{ padding: "0px 0px 0px 0px" }} >
                <ExpandMore
                    title={"Expandir"}
                    aria-label="show more"
                    onClick={() => props.getInfo(props.alumno)}
                >
                    <NextPlanIcon />
                </ExpandMore>
                {/* Expandir */}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Modalidad: {props.alumno.codigoModalidad}</Typography>
                    <Typography paragraph>Perido escolar: {props.alumno.periodoLectivo}</Typography>
                    <Typography paragraph>
                        Grado : {props.alumno.codigoGrado}
                    </Typography>
                    <Typography>

                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}