import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <div className="tw-flex tw-h-screen tw-items-center tw-justify-center">
      <div className="tw-text-center">
        <h1 className="tw-text-6xl tw-font-bold">404</h1>
        <p className="tw-mt-4 tw-text-lg">Page Not Found</p>
        <Link
          to="/"
          className="tw-mt-6 tw-inline-block tw-font-medium tw-text-blue-500 tw-underline hover:tw-text-blue-700"
        >
          HomePage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
