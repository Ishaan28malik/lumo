import clsx from 'clsx';

import LazyLoadMarkdown from '../LazyLoad/LazyLoadMarkdown';

interface EventsMarkdownCardProps {
  content: string;
}

const markdown =
  '# Global Sales Conference (Apr 2023)\n_Boston, USA, 11 Apr 2023_\n\n-\n\n### Event primary contact\n John Doe  \n\n### Travelers\n 3 Travelers';

const EventsMarkdownCard: React.FC<EventsMarkdownCardProps> = () => {
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

export default EventsMarkdownCard;
