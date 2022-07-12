import { toast } from "material-react-toastify";
import 'material-react-toastify/dist/ReactToastify.css';

export const saveNotification = () => {
  toast.info("📚 Guardado!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  });
};