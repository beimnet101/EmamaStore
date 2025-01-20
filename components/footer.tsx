const Footer = () => {
    return (
        <footer className="bg-gray-200 text-black footer-font"> {/* Applied Apple font styling */}
            <div className="container mx-auto py-10 space-y-8">
                <div className="text-center text-xs leading-5">
                    <p>&copy; 2025 Emashop, Inc. All rights reserved.</p>
                    <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal | Site Map</p>
                </div>

                <div className="text-center text-xs leading-5 space-y-2">
                    <p>In Loving Memory of Tigist Deselagn ❤️</p>
                    
                    <p>1. **Privacy and Data Collection**: We collect information to improve your shopping experience, including your name, email, and order details. For more details, please refer to our Privacy Policy.</p>

                    <p>2. **Returns and Refunds**: You may return most items within 30 days of delivery for a full refund. Items must be returned in new, unused condition. Some restrictions may apply.</p>

                    <p>3. **Shipping Information**: We offer various shipping options, including standard and expedited shipping, depending on your location and the availability of items.</p>

                    <p>4. **Product Availability**: All products are subject to availability and may be limited in quantity. We reserve the right to cancel or modify orders as necessary.</p>

                    <p>5. **Emashop Card**: Emashop Card is available for qualifying customers in the United States. Add your Emashop Card to Wallet on supported devices for easy payments.</p>

                    <p>6. **Terms and Conditions**: By using our services, you agree to our Terms of Use. Features, applications, and services may vary by region. Policies are subject to change without prior notice.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
