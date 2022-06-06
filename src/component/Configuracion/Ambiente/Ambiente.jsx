import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { Button, Divider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Ambiente = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardHeader
            sx={{textAlign:'center'}}
                title="Gestion Ambiente"
            />
            <Divider />
            <CardContent><center>
                <FormControl sx={{margin:'auto'}}>

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Pruebas" control={<Radio />} label="Pruebas" />
                        <FormControlLabel value="Produccion" control={<Radio />} label="Produccion" />
                        
                      
                    </RadioGroup>
                </FormControl>
                </center>
            </CardContent>
            <Divider />
            <CardActions >
                <Button variant='contained' sx={{margin: 'auto'}}><CheckBoxIcon/>Actualizar</Button>
            </CardActions>

        </Card>
    );
}
export default Ambiente;