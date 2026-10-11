import { CustomLoadingCellRendererProps } from 'ag-grid-react';
import React from 'react';

import CustomLoader from '../../Loader/CustomLoader';

const CustomLoadingCellRenderer: React.FC<
  CustomLoadingCellRendererProps
> = () => {
  return (
    <div className="ag-custom-loading-cell">
      <CustomLoader />
    </div>
  );
};

export default CustomLoadingCellRenderer;
