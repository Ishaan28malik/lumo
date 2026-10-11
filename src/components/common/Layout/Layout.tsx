import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { hiddenHeaderPages } from '../../../constants/hiddenHeaderPages';
import { usePageTitle } from '../../../context/usePageTitleContext';
import Footer from '../Footer/Footer';
import DynamicPageTitle from '../PageTitle/DynamicPageTitle';
import Header from './Header';

const Layout = () => {
  const location = useLocation();
  const shouldHideHeader = hiddenHeaderPages.includes(location.pathname);
  const { title } = usePageTitle();
  // Check if title exists to conditionally render the page title
  const hasPageTitle = Boolean(title);

  return (
    <div className="tw-flex tw-min-h-screen tw-flex-col">
      {!shouldHideHeader && (
        <header className="tw-fixed tw-top-0 tw-z-10 tw-w-full tw-bg-gray-100">
          <Header />
        </header>
      )}
      <div className="tw-mt-24 tw-flex tw-flex-grow tw-flex-col">
        {hasPageTitle && (
          <div className="tw-fixed tw-z-20 tw-mx-4 tw-mb-2 tw-w-[-webkit-fill-available] tw-rounded-md tw-bg-white tw-shadow-md">
            <DynamicPageTitle />
          </div>
        )}
        <div
          className={`tw-mx-4 tw-mb-2 tw-flex tw-h-full tw-flex-grow tw-justify-center tw-rounded-md tw-border tw-border-gray-200 tw-bg-white ${hasPageTitle ? 'tw-mt-[4.25rem]' : ''}`}
        >
          <div className="tw-w-full tw-p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
