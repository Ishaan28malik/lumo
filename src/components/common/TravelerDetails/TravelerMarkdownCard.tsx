import clsx from 'clsx';

import LazyLoadMarkdown from '../LazyLoad/LazyLoadMarkdown';

interface TravelerMarkdownCardProps {
  content: string;
}

const markdown =
  '# 👤 John Doe\n\n Tarams&nbsp;&nbsp;![VIP](https://img.shields.io/badge/VIP-blue)\n\n**Contact**: johndoe@some.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Organization**: Tarams\n\n**Trips address:**\ntrips+pax_e22dd214e8d2243ff450542a8a302754120@tarams.com\n\n';

const TravelerMarkdownCard: React.FC<TravelerMarkdownCardProps> = () => {
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

export default TravelerMarkdownCard;
