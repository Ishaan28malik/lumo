import React from 'react';

const Security = () => {
  return (
    <div className="tw-mx-auto tw-max-w-6xl tw-px-4 tw-py-8 tw-text-justify tw-text-base tw-leading-relaxed">
      <h1 className="tw-mb-12 tw-text-center tw-text-4xl tw-font-bold">
        Lumo Security
      </h1>

      <h2 className="tw-mb-4 tw-text-2xl tw-font-bold">
        Overview of our Security Controls
      </h2>
      <p className="tw-mb-4">
        All our data is encrypted in transit and at rest; we retain access logs
        and runtime logs of all our systems and processes; we do not store
        payment information as this is handled by Stripe; we run our system on
        AWS and use various AWS services such as Inspector and Guard Duty for
        scanning; we perform annual pentesting by a third party; we have access
        control policies that allow access to production data only to employees
        who require it; our employees undergo periodic security and awareness
        training.
      </p>
      <p className="tw-mb-4">
        If you have any questions on our security policies, pentesting reports,
        or any other security-related questions, please contact{' '}
        <a
          href="mailto:security@thinklumo.com"
          className="tw-text-blue-600 hover:tw-underline"
        >
          security@thinklumo.com
        </a>
        .
      </p>

      <h2 className="tw-mb-4 tw-text-2xl tw-font-bold">SOC 2 Certification</h2>

      <p className="tw-mb-4">
        Lumo has successfully completed its SOC 2 Type 2 audit. SOC 2
        engagements are based on the AICPA’s Trust Service Criteria. SOC 2 audit
        reports focus on a Service Organization’s non-financial reporting
        controls as they relate to Security of the system. The audit was
        conducted by Dansa D’Arata Soucia LLP (
        <a
          href="http://www.darata.com"
          className="tw-text-blue-600 hover:tw-underline"
        >
          www.darata.com
        </a>
        ). In doing so Lumo maintains its adherence to one of the most
        stringent, industry-accepted auditing standards for service companies
        and provides additional assurance to its clients, through an independent
        auditor, that its business process, information technology and risk
        management controls are properly designed.
      </p>
      <p className="tw-mb-4">
        The official audit report provides a thorough review of{" Lumo's"}
        internal controls, policies, and processes for our flight information
        services. It also reviews {" Lumo's"} processes relating to risk
        management and subservice (vendor) due diligence, as well as {" Lumo's"}
        entire IT infrastructure, software development life cycle, change
        management, logical security, network security, physical & environmental
        security, and computer operations.
      </p>
      <p className="tw-mb-4">
        If you would like to obtain a copy of our SOC 2 Type 2 report please
        contact{' '}
        <a
          href="mailto:security@thinklumo.com"
          className="tw-text-blue-600 hover:tw-underline"
        >
          security@thinklumo.com
        </a>
        .
      </p>

      <h2 className="tw-mb-4 tw-text-xl tw-font-bold">
        Reporting a vulnerability
      </h2>
      <p className="tw-mb-4">
        If you believe you have found a vulnerability in any one of our
        applications, we would very much appreciate it if you did not disclose
        it publicly but instead send an email to{' '}
        <a
          href="mailto:security@thinklumo.com"
          className="tw-text-blue-600 hover:tw-underline"
        >
          security@thinklumo.com
        </a>
        . Please visit our{' '}
        <a
          href="/lumo-vulnerability-disclosure-policy"
          className="tw-text-red-500 hover:tw-text-green-800 hover:tw-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          vulnerability disclosure policy{' '}
        </a>{' '}
        page for more info.
      </p>
    </div>
  );
};

export default Security;
