"use client"
import Image from "next/image";
import { Toast } from "react-hot-toast";
import { X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemsProps {
    data: Product;
}

const CartItem: React.FC<CartItemsProps> = ({ data }) => {
    const cart=useCart();
    const onRemome=()=>{
     cart.removeItem(data.id);
    }
    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image 
                    fill 
                    src={data.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemome} icon={<X size={25} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start w-full">
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold text-black flex-grow">
                                {data.name}
                            </p>
                            <Currency value={data.price} />
                        </div>
                        <div className="flex text-sm text-gray-500 ml-4 sm:ml-3">
                            <p>{data.color.name}</p>
                            <p className="ml-3 text-gray-500 border-l border-gray-200 pl-4">{data.size.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
