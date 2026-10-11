import { CustomDateProps } from 'ag-grid-react';
import React, { useCallback, useState } from 'react';

import { convertToJsDate } from '../../../utils/date';

const CustomDateComponent = ({ onDateChange }: CustomDateProps) => {
  const [date, setDate] = useState('');
  const onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setDate(value!);

      onDateChange(convertToJsDate(value));
    },
    [onDateChange]
  );

  return <input type="datetime-local" value={date} onChange={onChange} />;
};

export default CustomDateComponent;
