import clsx from 'clsx';

import LazyLoadMarkdown from '../LazyLoad/LazyLoadMarkdown';

interface GroupMarkdownCardProps {
  content: string;
}

const markdown =
  '# Tarams sales group trip\n\n **Organization**: Tarams\n\n**Group Id:**\n884b6b58-9836-4481-b12c-380a15b7b0e0\n\n';

const GroupMarkdownCard: React.FC<GroupMarkdownCardProps> = () => {
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

export default GroupMarkdownCard;
