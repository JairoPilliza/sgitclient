import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import proveedor from './proveedor';
import configuracion from './configuracion'
import retencion from './retencion'
import comprobante from './comprobante';
import reporte from './reporte';
import proyecto from './proyecto';
import contabilizacion from './contabilizacion'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, pages,configuracion,proyecto,proveedor,retencion ,contabilizacion, comprobante,reporte, utilities]
};

export default menuItems;
