

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-black footer-font"> {/* Applied Apple font styling */}
            <div className="container mx-auto py-10 space-y-8">
                <div className="text-center text-xs leading-5">
                    <p>&copy; 2025 Emashop, Inc. All rights reserved.</p>
                    <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal | Site Map</p>
                </div>

                <div className="text-center text-xs leading-5 space-y-2">
                    <p>1. Offer available to new subscribers who purchase an eligible device. $9.99/month after trial. Only one offer per Emashop Account and only one offer per family if you’re part of a Family Sharing group. This offer is not available if you or your family have previously subscribed to Emashop Plus. Offer good for 3 months after eligible device activation. Plan automatically renews until cancelled. Restrictions and other terms apply.</p>
                    
                    <p>2. Trade‑in values will vary based on the condition, year, and configuration of your eligible trade‑in device. Not all devices are eligible for credit. You must be at least the age of majority to be eligible to trade in for credit or for an Emashop Gift Card. Trade‑in value may be applied toward qualifying new device purchase, or added to an Emashop Gift Card. Actual value awarded is based on receipt of a qualifying device matching the description provided when estimate was made. Sales tax may be assessed on full value of a new device purchase. In‑store trade‑in requires presentation of a valid photo ID. Offer may not be available in all stores, and may vary between in‑store and online trade‑in. Emashop or its trade‑in partners reserve the right to refuse, cancel, or limit quantity of any trade‑in transaction for any reason. More details are available from Emashop’s trade-in partner for trade‑in and recycling of eligible devices.</p>
                    
                    <p>To access and use all Emashop Card features and products available only to Emashop Card users, you must add Emashop Card to Wallet on a supported device. Emashop Card is subject to credit approval, available only for qualifying applicants in the United States, and issued by Emashop Bank USA, Salt Lake City Branch.</p>
                   <p>Features are subject to change. Some features, applications, and services may not be available in all regions or all languages.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
