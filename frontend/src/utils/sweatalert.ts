import Swal, { SweetAlertIcon } from 'sweetalert2';

interface AlertOptions {
    title?: string;
    text?: string;
    icon?: SweetAlertIcon;
}

export const showAlert = ({
    title = 'Congratulations!',
    text = 'Action successful!',
    icon = 'success',
}: AlertOptions): void => {
    Swal.fire({
        icon: icon,
        iconColor: '#039855',
        title: title,
        text: text,
        timer: 3000,
        showConfirmButton: false,
    });
};

interface ToastOptions {
    icon?: SweetAlertIcon;
    title?: string;
}

export const toastify = ({ icon = 'success', title = 'Action Successful' }: ToastOptions): void => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        customClass: {
            container: 'swal-toast-container',
        },
    });
    Toast.fire({
        icon: icon,
        title: title,
    });
};
