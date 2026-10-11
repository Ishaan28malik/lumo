import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

type SnackbarOptions = {
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};

export const showSnackbar = ({
  message,
  severity = 'info',
  duration = 6000,
}: SnackbarOptions): void => {
  const snackbarDiv = document.createElement('div');
  document.body.appendChild(snackbarDiv);

  const root = ReactDOM.createRoot(snackbarDiv);

  const handleClose = () => {
    root.unmount();
    document.body.removeChild(snackbarDiv);
  };

  root.render(
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
