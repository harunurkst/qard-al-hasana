import Swal, { SweetAlertIcon } from 'sweetalert2';

//success messages
export const showNotification = (message: string, title: string, icon: SweetAlertIcon) => {
    Swal.fire({
        position: 'center',
        title: title,
        text: message,
        icon: icon,
        // confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 3000,
    });
};
