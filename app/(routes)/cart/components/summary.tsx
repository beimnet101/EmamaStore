"use client"; // This must be at the top
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import getProducts from "@/actions/getServerProduct"; // Import the new getProducts action

const Summary = () => {
  console.log("Rendering Summary component...");

  const searchParams = useSearchParams();
  const cart = useCart();
  const items = cart.items;
  const removeAll = useCart((state) => state.removeAll);

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          QuantityofOrderanItEm: items.map((item) => item.quantity),
        }
      );

      console.log("Checkout request successful:", response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-500">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
