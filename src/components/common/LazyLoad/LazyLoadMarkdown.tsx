import React, { ComponentType, Suspense, lazy } from 'react';

import CustomLoader from '../Loader/CustomLoader';

interface LazyLoadMarkdownProps {
  content?: string;
  className?: string;
}

const LazyComponent = lazy(
  () =>
    import(
      '../MarkdownContent/MarkdownContentDisplay.tsx'
    ) as unknown as Promise<{
      default: ComponentType<LazyLoadMarkdownProps>;
    }>
);

const LazyLoadMarkdown: React.FC<LazyLoadMarkdownProps> = ({
  content,
  className,
}) => {
  return (
    <Suspense fallback={<CustomLoader />}>
      <LazyComponent content={content} className={className} />
    </Suspense>
  );
};

export default LazyLoadMarkdown;
