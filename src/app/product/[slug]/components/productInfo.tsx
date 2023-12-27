"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productWithTotalPrice } from "@/helpers/product";
import { cartContext } from "@/providers/cart";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: productWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(cartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };
  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity });
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>
      <div className="flex items-center gap-1">
        <h1 className="gap-2 text-xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercent > 0 && (
          <Badge className=" px-2 py-[2px]">
            <ArrowDownIcon size={14} /> {product.discountPercent}%
          </Badge>
        )}
      </div>
      {product.discountPercent > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}
      <div className="mt-4 flex items-center gap-4">
        <Button
          onClick={handleDecreaseQuantityClick}
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          onClick={handleIncreaseQuantityClick}
          size="icon"
          variant="outline"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify opacity-75">{product.description}</p>
      </div>

      <Button onClick={handleAddToCartClick} className="mt-7 uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold ">Sedex</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo o Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
