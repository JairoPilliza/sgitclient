import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'ui-component/cards/MainCard';
import Entidad from './Entidad';
import Ambiente from '../Ambiente/Ambiente';

const AperturaEntidad = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Entidad" value="1" />
                            <Tab label="Ambiente" value="2" />

                        </TabList>
                    </Box>
                    <TabPanel value="1"><Entidad /></TabPanel>
                    <TabPanel value="2"><Ambiente /></TabPanel>
                </TabContext>
            </Box>
        </MainCard>
    );
}
export default AperturaEntidad;
