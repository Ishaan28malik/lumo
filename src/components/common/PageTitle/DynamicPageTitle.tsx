import React from 'react';

import { usePageTitle } from '../../../context/usePageTitleContext';

const DynamicPageTitle = () => {
  const { title, displayName, referenceId } = usePageTitle();

  //return only if title and display name or reference id is set
  if (!title && !displayName && !referenceId) {
    return null;
  }

  const details = [displayName, referenceId].filter(Boolean);

  return (
    <div className="tw-px-4 tw-py-4 tw-text-base tw-text-gray-400">
      <h1>
        {title}
        <span className="tw-px-1"> {details.length > 0 && ' / '}</span>
        <span className="tw-text-black">{details.join(' / ')}</span>
      </h1>
    </div>
  );
};

export default DynamicPageTitle;
