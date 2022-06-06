import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import proveedor from './proveedor';
import configuracion from './configuracion'
import retencion from './retencion'
import comprobante from './comprobante';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, pages,configuracion,proveedor,retencion ,comprobante,utilities, other]
};

export default menuItems;
