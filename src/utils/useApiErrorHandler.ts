import { AxiosError } from 'axios';

import { showSnackbar } from './showSnackbar';

export const useApiErrorHandler = () => {
  const handleApiError = (error: unknown) => {
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof AxiosError) {
      errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred. Please try again later.';
    }

    showSnackbar({
      message: errorMessage,
      severity: 'error',
    });

    throw error;
  };

  return handleApiError;
};
