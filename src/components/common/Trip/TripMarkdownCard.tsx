import clsx from 'clsx';

import LazyLoadMarkdown from '../LazyLoad/LazyLoadMarkdown';

interface TripMarkdownCardProps {
  content: string;
}

const TripMarkdownCard: React.FC<TripMarkdownCardProps> = ({ content }) => {
  return (
    <div className={clsx('tw-w-2/5')}>
      <LazyLoadMarkdown
        content={content}
        className={clsx(
          'tw-h-full tw-rounded-md tw-border tw-border-gray-200 tw-px-6 tw-py-6'
        )}
      />
    </div>
  );
};

export default TripMarkdownCard;
