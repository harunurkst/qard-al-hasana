import Swal from 'sweetalert2';

//success messages
export const showNotification = (message: string) => {
    Swal.fire({
        position: 'top-end',
        title: 'Success',
        text: message,
        icon: 'success',
        // confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500,
    });
};
