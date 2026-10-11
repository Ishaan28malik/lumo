import React from 'react';

import CustomLoader from '../Loader/CustomLoader';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return <CustomLoader />;
  }

  return <div>{children}</div>;
};

export default LoadingWrapper;
