import {toast} from 'react-toastify';

const CustomToast = {
  errorDefaultToast(ErrorString: string): void {
    toast.error(` ${ErrorString}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'dark',
      draggable: true,
    });
  },

  warnDefaultToast(ErrorString: string): void {
    toast.warn(` ${ErrorString}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'dark',
      draggable: true,
    });
  },
  okDefaultToast(DetailsString: string): void {
    toast.success(` ${DetailsString}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'dark',
      draggable: true,
    });
  },
};

export default CustomToast;
