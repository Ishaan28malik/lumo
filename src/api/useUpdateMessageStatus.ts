import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { queuesDetailsApiUrl } from '../constants/apiUrls';
import { useApiErrorHandler } from '../utils/useApiErrorHandler';
import api from './api';

type UpdateMessageStatusParams = {
  messageId: string;
  isRead: boolean;
};

type UpdateMessageStatusResponse = {
  success: boolean;
  message: string;
};

function useUpdateMessageStatus() {
  const handleApiError = useApiErrorHandler();

  return useMutation<
    AxiosResponse<UpdateMessageStatusResponse>,
    Error,
    UpdateMessageStatusParams
  >({
    mutationFn: async (
      params: UpdateMessageStatusParams
    ): Promise<AxiosResponse<UpdateMessageStatusResponse>> => {
      try {
        const { messageId, isRead } = params;
        const response = await api.put(`${queuesDetailsApiUrl}`, {
          messageId,
          read: isRead,
        });
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  });
}

export default useUpdateMessageStatus;
