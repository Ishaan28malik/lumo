import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { DestinationDetails } from '../../../types/flightSearchTable';

const DestinationRenderOptionContent = ({
  option,
}: {
  option: DestinationDetails;
}) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, []);

  const optionContent = (
    <div className="tw-flex tw-w-full tw-items-center tw-pl-5">
      <span className="tw-w-1/6">{option.iata}</span>
      <span
        className="tw-w-5/6 tw-text-sm tw-text-gray-400"
        ref={textRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'inline-block',
        }}
      >
        {option.name}
      </span>
    </div>
  );

  return isOverflowing ? (
    <Tooltip title={option.name}>{optionContent}</Tooltip>
  ) : (
    optionContent
  );
};

export default DestinationRenderOptionContent;
