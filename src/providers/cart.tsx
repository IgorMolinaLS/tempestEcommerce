"use client";

import { productWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends productWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
}

export const cartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  cartBasePrice: 0,
  addProductToCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (product.id === cartProduct.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );

      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  return (
    <cartContext.Provider
      value={{
        products,
        addProductToCart,
        cartTotalPrice: 0,
        cartTotalDiscount: 0,
        cartBasePrice: 0,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
