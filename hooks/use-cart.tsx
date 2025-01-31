import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

// Extend the Product type to include quantity
export interface CartProduct extends Product {
  quantity: string;
}

interface CartStore {
  items: CartProduct[];
  addItem: (data: Product, quantity?: string) => void;
  updateItem: (id: string, quantity: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, quantity = "1") => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart", { duration: 5000 });
        }

        set({
          items: [
            ...currentItems,
            {
              ...data,
              quantity,
            },
          ],
        });

        // Dismiss all previous toasts and show a single one
        toast.dismiss();
        toast.success(`Item added to cart. Price: $${data.price}, Quantity: ${quantity}`, { duration: 5000 });
      },
      updateItem: (id: string, quantity: string) => {
        const currentItems = get().items;
        const itemIndex = currentItems.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          toast.dismiss();
          return toast.error("Item not found in cart", { duration: 5000 });
        }

        const updatedItems = [...currentItems];
        updatedItems[itemIndex].quantity = quantity;

        set({ items: updatedItems });

        toast.dismiss();
        toast.success(`Quantity updated to ${quantity}`, { duration: 5000 });
      },
      removeItem: (id: string) => {
        const updatedItems = get().items.filter((item) => item.id !== id);
        set({ items: updatedItems });

        toast.dismiss();
        toast.success("Item removed from cart", { duration: 5000 });
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart", { duration: 5000 });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
