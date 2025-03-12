// app/privacy/page.tsx
"use client";

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-12 px-6 sm:px-12 md:px-24">
      {/* Increased padding for larger screens */}
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">
        Privacy Policy
      </h1>

      <section className="mb-10">
        {/* Increased spacing */}
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We collect various types of information to provide and improve our
          services, including:
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          <li className="mb-2">
            {/* Added spacing between list items */}
            <span className="font-medium">Personal Information:</span> This
            includes your name, email address, phone number, shipping address, and
            billing information.
          </li>
          <li className="mb-2">
            <span className="font-medium">Account Information:</span> If you
            create an account, we collect your username and password.
          </li>
          <li className="mb-2">
            <span className="font-medium">Transaction Information:</span> We
            collect details about your purchases, including the items you buy,
            the date and time of your order, and payment information.
          </li>
          <li className="mb-2">
            <span className="font-medium">Usage Information:</span> We collect
            information about how you use our website, such as the pages you
            visit, the products you view, and the links you click.
          </li>
          <li className="mb-2">
            <span className="font-medium">Device Information:</span> We collect
            information about the device you use to access our website, such as
            your IP address, browser type, and operating system.
          </li>
          <li className="mb-2">
            <span className="font-medium">Cookies and Similar Technologies:</span>{' '}
            We use cookies and similar technologies to collect information
            about your browsing behavior and preferences.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          <li className="mb-2">
            To process and fulfill your orders.
          </li>
          <li className="mb-2">
            To provide customer support and respond to your inquiries.
          </li>
          <li className="mb-2">
            To personalize your shopping experience.
          </li>
          <li className="mb-2">
            To send you promotional emails and newsletters (if you have opted
            in).
          </li>
          <li className="mb-2">
            To improve our website and services.
          </li>
          <li className="mb-2">
            To detect and prevent fraud.
          </li>
          <li className="mb-2">
            To comply with legal obligations.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          3. Information Sharing
        </h2>
        <p className="text-gray-700 mb-4">
          We may share your information with third parties in the following
          circumstances:
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          <li className="mb-2">
            With service providers who assist us with payment processing,
            shipping, and other functions.
          </li>
          <li className="mb-2">
            With business partners who offer products or services that may be
            of interest to you (if you have opted in).
          </li>
          <li className="mb-2">
            When required by law or to protect our rights.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          4. Data Security
        </h2>
        <p className="text-gray-700 mb-4">
          We take reasonable measures to protect your information from
          unauthorized access, use, or disclosure. These measures include:
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          <li className="mb-2">
            Using secure servers and encryption.
          </li>
          <li className="mb-2">
            Implementing access controls.
          </li>
          <li className="mb-2">
            Regularly monitoring our systems for vulnerabilities.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          5. Your Choices
        </h2>
        <p className="text-gray-700 mb-4">
          You have certain choices regarding your information, including:
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-700">
          <li className="mb-2">
            You can access and update your account information.
          </li>
          <li className="mb-2">
            You can opt out of receiving promotional emails.
          </li>
          <li className="mb-2">
            You can disable cookies in your browser settings.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          6. Children's Privacy
        </h2>
        <p className="text-gray-700 mb-4">
          Our website is not intended for children under 13, and we do not
          knowingly collect information from children under 13.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          7. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. We will post
          any changes on our website.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          8. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy, please contact
          us at emamashop@gmail.com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;