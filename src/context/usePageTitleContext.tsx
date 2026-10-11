import React, { ReactNode, createContext, useContext, useState } from 'react';

interface PageTitleContextType {
  title: string;
  setTitle: (title: string) => void;
  displayName: string;
  setDisplayName: (displayName: string) => void;
  referenceId: string;
  setReferenceId: (referenceId: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType>({
  title: '',
  setTitle: () => {},
  displayName: '',
  setDisplayName: () => {},
  referenceId: '',
  setReferenceId: () => {},
});

interface PageTitleProviderProps {
  children: ReactNode;
}

export const PageTitleProvider: React.FC<PageTitleProviderProps> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [referenceId, setReferenceId] = useState<string>('');

  return (
    <PageTitleContext.Provider
      value={{
        title,
        setTitle,
        displayName,
        setDisplayName,
        referenceId,
        setReferenceId,
      }}
    >
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => useContext(PageTitleContext);
