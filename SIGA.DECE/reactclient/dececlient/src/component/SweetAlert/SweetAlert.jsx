
import Swal from "sweetalert2";

const SweetAlert = {
    Warning: function (error) {
        let timerInterval
        Swal.fire({
            title: 'No se pudieron obtener los datos para el recurso solicitado.!',
            html: error,
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    }

}
export default SweetAlert;