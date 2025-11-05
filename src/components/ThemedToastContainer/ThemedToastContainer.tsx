import { ToastContainer } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

export const ThemedToastContainer = () => {
  const theme = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme.palette.mode}
    />
  );
};
