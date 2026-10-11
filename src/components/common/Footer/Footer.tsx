import dayjs from 'dayjs';
import React from 'react';

const Footer = () => {
  const currentYear = dayjs().year();

  return (
    <footer className="tw-mt-auto tw-border-t tw-border-gray-300 tw-bg-gray-100 tw-py-4">
      <div className="tw-mx-auto tw-flex tw-items-center tw-justify-center tw-space-x-6">
        <ul className="tw-flex tw-justify-center tw-space-x-6">
          <li>
            <a
              href="/terms"
              className="tw-text-gray-700 hover:tw-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>{' '}
          </li>
          <li>
            <a
              href="/privacy"
              className="tw-text-gray-700 hover:tw-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>{' '}
          </li>
          <li>
            <a
              href="/security"
              className="tw-text-gray-700 hover:tw-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Security
            </a>
          </li>
        </ul>
        <p className="tw-text-gray-400">
          Copyright © {currentYear}, Resilient Ops, Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
