import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const CustomLoader = () => {
  return (
    <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
      <CircularProgress />
    </div>
  );
};

export default CustomLoader;
