import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { useApiErrorHandler } from '../utils/useApiErrorHandler';

interface ErrorDisplayProps {
  queryKey: string;
  queryFn: () => Promise<object>;
  children: React.ReactNode;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  queryKey,
  queryFn,
  children,
}) => {
  const handleApiError = useApiErrorHandler();

  const { isError } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn().catch(handleApiError),
  });

  if (isError) {
    return null;
  }

  return <>{children}</>;
};
