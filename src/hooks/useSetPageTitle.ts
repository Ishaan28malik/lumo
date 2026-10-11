import { useEffect } from 'react';

import { usePageTitle } from '../context/usePageTitleContext';

interface PageTitleProps {
  title: string;
  displayName?: string;
  referenceId?: string;
}

const useSetPageTitle = ({
  title,
  displayName = '',
  referenceId = '',
}: PageTitleProps) => {
  const { setTitle, setDisplayName, setReferenceId } = usePageTitle();

  useEffect(() => {
    setTitle(title);
    setDisplayName(displayName);
    setReferenceId(referenceId);

    //reset value when navigating away from the page
    return () => {
      setTitle('');
      setDisplayName('');
      setReferenceId('');
    };
  }, [
    title,
    displayName,
    referenceId,
    setTitle,
    setDisplayName,
    setReferenceId,
  ]);
};

export default useSetPageTitle;
