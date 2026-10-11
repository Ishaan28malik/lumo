import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ItemDetails } from '../../../types/searchData';

//option content for mui autocomplete

const AutocompleteRenderOptionContent = ({
  option,
}: {
  option: ItemDetails;
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
    <Link
      className="tw-flex tw-w-full tw-space-x-5"
      to={`${option.baseUrl}${option.uid}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <span>{option.icon}</span>
      <span
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
    </Link>
  );

  return isOverflowing ? (
    <Tooltip title={option.name}>{optionContent}</Tooltip>
  ) : (
    optionContent
  );
};

export default AutocompleteRenderOptionContent;
