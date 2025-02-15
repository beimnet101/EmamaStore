"use client"; // This must be at the top
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import getProducts from "@/actions/getServerProduct"; // Import the new getProducts action
import { useUser } from '@clerk/nextjs';
import { RedirectToSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { json } from "stream/consumers";

const Summary = () => {
  console.log("Rendering Summary component...");

  const searchParams = useSearchParams();
  const cart = useCart();
  const items = cart.items;
  const router =useRouter();
  const removeAll = useCart((state) => state.removeAll);
  const { isSignedIn } = useUser();
  const [selectedPayment, setSelectedPayment] = useState("stripe");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); 

  // Check payment status based on URL parameters
  useEffect(() => {
    if (searchParams.get("success")) {
       
        toast.dismiss(); 
        toast.success("Payment Completed.", { duration: 10000 });
        removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  // Calculate total price of items in the cart
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity || 1);
  }, 0);

  // Checkout logic
  const onCheckout = async () => {
    if (loading) return;
     setLoading(true);
    try {
      console.log("Starting checkout...");

      // Collect product IDs from the cart
      const productIds = items.map((item) => item.id);

      console.log("Fetching product details for:", productIds);
      
      // Fetch products in bulk using the updated API route
      const products = await getProducts(productIds);

      // Initialize an array to accumulate error messages
      let stockIssues: { name: string; quantity: string }[] = [];

      // Perform stock validation
      for (const item of items) {
        const product = products.find((prod) => prod.id === item.id);

        if (!product) {
          stockIssues.push({
            name: `Product with ID ${item.id}`,
            quantity: "not found",
          });
          continue;
        }

        if (Number(item.quantity) > Number(product.quantity)) {
          // Add the product to the stock issue list
          stockIssues.push({
            name: product.name,
            quantity: product.quantity.toString(),
          });
        }
      }

      // If there are stock issues, show them in one toast message
      if (stockIssues.length > 0) {
        // Handle the message formatting based on the number of issues
        let issueMessage = "Sorry, we have only ";

        // If there's exactly one issue
        if (stockIssues.length === 1) {
          issueMessage += `${stockIssues[0].quantity} ${stockIssues[0].name} available in stock.`;
        } 
        // If there are exactly two issues
        else if (stockIssues.length === 2) {
          issueMessage += `${stockIssues[0].quantity} ${stockIssues[0].name} and ${stockIssues[1].quantity} ${stockIssues[1].name} available in stock.`;
        } 
        // If there are more than two issues
        else {
          // Format the message for more than two items
          issueMessage += stockIssues.slice(0, -1).map((item) => `${item.quantity} ${item.name}`).join(", ") + 
          ` and ${stockIssues[stockIssues.length - 1].quantity} ${stockIssues[stockIssues.length - 1].name} available in stock.`;
        }

        toast.error(issueMessage); // Show the formatted message
        return;
      }

      console.log("Stock validation passed. Proceeding to checkout.");
      if (!isSignedIn) {
        // Store the current checkout page URL before redirecting
        router.push(`/sign-in`);
        return;
      }
      else if(selectedPayment=== "stripe"){

         const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          QuantityofOrderanItEm: items.map((item) => item.quantity),
         
        }
      );

      console.log("Checkout request successful:", response.data);
      window.location.href = response.data.url;
    } 
    
  else if(selectedPayment==="chapa"){
    if (!fullName || !lastName || !phoneNumber || !address) {
      toast.error("Please fill in all fields.");
      return;
    }
      
            const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/checkoutchapa`,
            {
              productIds: items.map((item) => item.id),
              QuantityofOrderanItEm: items.map((item) => item.quantity),
              fullName,
              lastName,
              phoneNumber,
              address,
            }
          );
          console.error('Response:', response);
         
if (response.data.url) {
  window.location.href = response.data.url;
} else {
  toast.error("Failed to initialize Chapa checkout.");
}
    }

    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8" >
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

          
      <div className="mt-4">
    <h3 className="text-md font-semibold text-gray-700">Choose Payment Method</h3>
    <div className="mt-2 grid grid-cols-1 gap-4">

        {/* Stripe Option */}
        <button
            onClick={() => setSelectedPayment("stripe")}
            className={`flex items-center justify-start border rounded-lg pl-4 p-2 w-full transition-all duration-200 ease-in-out transform hover:shadow-lg ${ 
                selectedPayment === "stripe" 
                ? "bg-[#f9fafb]  border-black" 
                : "bg-[#f9fafb] shadow-sm border-gray-200"
            }`}
        >
            <Image
                src="/stripepay.jpg"
                alt="Stripe"
                width={24}
                height={24}
                className="mr-3"
            />
            <span className="text-sm font-medium text-gray-800">Stripe</span>
            {selectedPayment === "stripe" && <span className="ml-auto text-sm text-green-600">Default</span>}
        </button>

        {/* Chapa Option */}
        <button
            onClick={() => setSelectedPayment("chapa")}
            className={`flex items-center justify-start border rounded-lg pl-4 p-2 w-full transition-all duration-200 ease-in-out transform hover:shadow-lg ${ 
                selectedPayment === "chapa" 
                ? "bg-[#f9fafb]  border-black" 
                : "bg-[#f9fafb] border-gray-300"
            }`}
        >
            <Image
                src="/chapa-logo.jpg"
                alt="Chapa"
                width={24}
                height={24}
                className="mr-3"
            />
            <span className="text-sm font-medium text-gray-800">Chapa</span>
            {selectedPayment === "chapa" && <span className="ml-auto text-sm text-green-600">Default</span>}
        </button>

    </div>
</div>
 {/* Chapa Form */}
 {selectedPayment === "chapa" && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700">Billing Information</h3>
          <div className="mt-2 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
        onChange={(e) => {
          const value = e.target.value;
          // Allow only numbers
          if (/^\d*$/.test(value) && value.length <= 10) {
            setPhoneNumber(value);
          }
        }}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
      {/* Validation Message */}
      {phoneNumber && !/^(09|07)\d{8}$/.test(phoneNumber) && (
        <p className="text-red-500 text-sm">
          Phone number must start with 09 or 07 and be 10 digits
        </p>
      )}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}


<Button
  disabled={items.length === 0 || loading}
  onClick={onCheckout}
  className="w-full mt-6"
>
  {loading ? "Checking out..." : "Checkout"}
</Button>

    </div>
  );
};

export default Summary;