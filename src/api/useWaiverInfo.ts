import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { waiverApiUrl } from '../constants/apiUrls';
import { BookingDetails } from '../types/booking';
import bookingDataTransformer from '../utils/homePageTripTableDataTransformer';
import api from './api';

function useWaiverInfo({ id }: { id: string }) {
  return useQuery({
    queryKey: ['waiver-info', id],
    queryFn: () => api.get<BookingDetails[]>(`${waiverApiUrl}/${id}`),
    select: useCallback(bookingDataTransformer, []),
  });
}

export default useWaiverInfo;
