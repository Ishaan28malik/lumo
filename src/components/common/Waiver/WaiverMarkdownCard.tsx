import clsx from 'clsx';
import React from 'react';

import LazyLoadMarkdown from '../LazyLoad/LazyLoadMarkdown';

interface WaiverMarkdownCardProps {
  content: string;
}

const markdown =
  '# Travel Advisories ⚠️\n\n## Origin and Destination\n\n**United States - Exercise normal security precautions**  \nGovernment of Canada ![Canada Flag](https://img.shields.io/badge/flag-🇨🇦-red) \n\n**United States of America - Exercise normal safety precautions**  \nAustralian Department of Foreign Affairs and Trade ![Australia Flag](https://img.shields.io/badge/flag-🇦🇺-blue)';

const WaiverMarkdownCard: React.FC<WaiverMarkdownCardProps> = () => {
  return (
    <div className={clsx('tw-w-3/5')}>
      <LazyLoadMarkdown
        content={markdown}
        className={clsx(
          'tw-h-full tw-rounded-md tw-border tw-border-gray-200 tw-px-6 tw-py-6'
        )}
      />
    </div>
  );
};

export default WaiverMarkdownCard;
