"use client";

import React, { useRef } from 'react';

const Footer = () => {
  const privacyRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const salesRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#f0f0f0] text-black font-sans text-xs">
      <div className="container mx-auto py-6 sm:py-10 space-y-4 sm:space-y-6">
        <div className="text-center text-xs leading-5">
          <p>&copy; 2025 Emashop, Inc. All rights reserved.</p>
          <p>
            <button onClick={() => scrollToSection(privacyRef)}>Privacy Policy</button> |
            <button onClick={() => scrollToSection(termsRef)}>Terms of Use</button> |
            <button onClick={() => scrollToSection(salesRef)}>Sales and Refunds</button> |
            <button onClick={() => scrollToSection(legalRef)}>Legal</button>
          </p>
          <p className="mt-2 sm:mt-4">In Loving Memory of Tigist Deselagn ❤️</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div ref={privacyRef} className="bg-[#f0f0f0] p-4 sm:p-6">
            <h4 className="font-semibold mb-2">Privacy & Data</h4>
            <p>1. Privacy and Data Collection: We collect information to improve your shopping experience, including your name, email, and order details. For more details, please refer to our <a href="/privacy" className="underline">Privacy Policy</a>.</p>
            <p>2. Returns and Refunds: You may return most items within 30 days of delivery for a full refund. Items must be returned in new, unused condition. Some restrictions may apply.</p>
            <p>3. Shipping Information: We offer various shipping options, including standard and expedited shipping, depending on your location and the availability of items.</p>
            <p>4. Product Availability: All products are subject to availability and may be limited in quantity. We reserve the right to cancel or modify orders as necessary.</p>
            <p>5. Emashop Card: Emashop Card is available for qualifying customers in the Ethiopia and United States. Add your Emashop Card to Wallet on supported devices for easy payments.</p>
            <p>6. Terms and Conditions: By using our services, you agree to our Terms of Use. Features, applications, and services may vary by region. Policies are subject to change without prior notice.</p>
          </div>

          <div ref={termsRef} className="bg-[#f0f0f0] p-4 sm:p-6">
            <h4 className="font-semibold mb-2">Terms of Use</h4>
            <p>1. Account responsibility: You are responsible for your account and its security.</p>
            <p>2. Acceptable use: Prohibited activities include illegal behavior, spamming, and interfering with our services.</p>
            <p>3. Intellectual property: Our content is protected by copyright and trademarks.</p>
            <p>4. Disclaimers: We provide services "as is" and disclaim warranties.</p>
            <p>5. Limitation of liability: Our liability is limited to the extent permitted by law.</p>
            <p>6. Governing law: These Terms are governed by [Your Jurisdiction] law.</p>
            <p>7. Changes to Terms: We may update these Terms; continued use implies acceptance.</p>
          </div>

          <div ref={salesRef} className="bg-[#f0f0f0] p-4 sm:p-6">
            <h4 className="font-semibold mb-2">Sales & Refunds</h4>
            <p>1. Returns: Accepted within 30 days of delivery for most items.</p>
            <p>2. Condition: Items must be new, unused, and in original packaging.</p>
            <p>3. Exceptions: Some items (e.g., personalized goods) are non-returnable.</p>
            <p>4. Process: Contact customer support to initiate a return.</p>
            <p>5. Refunds: Issued to the original payment method after inspection.</p>
            <p>6. Shipping costs: Non-refundable, except for defective or incorrect items.</p>
            <p>7. Exchanges: May be possible depending on availability.</p>
          </div>

          <div ref={legalRef} className="bg-[#f0f0f0] p-4 sm:p-6">
            <h4 className="font-semibold mb-2">Legal Information</h4>
            <p>1. Company name: Emashop, Inc.</p>
            <p>2. Address: Addis Ababa, Ethiopia.</p>
            <p>3. Contact: emamashop@gmail.com.</p>
            <p>4. Disclaimers: Information provided is for general knowledge only.</p>
            <p>5. Liability: We are not liable for indirect damages.</p>
            <p>6. Copyright: All content is copyright of Emashop, Inc.</p>
          </div>

          <div className="p-4 sm:p-6">
            <p>Shipping: standard and expedited options, costs and times vary. Tracking provided.</p>
            <p>Availability: subject to availability. Orders may be modified or canceled.</p>
            <p>Emashop Card: for US and Ethiopia. Apply online, add to wallet.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;