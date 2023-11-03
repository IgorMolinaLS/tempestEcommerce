import { Product } from "@prisma/client";

export interface productWithTotalPrice extends Product {
  totalPrice: number;
}

export const computeProductTotalPrice = (product: Product) => {
  if (product.discountPercent === 0) {
    return { ...product, totalPrice: Number(product.basePrice) };
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercent / 100);
  return { ...product, totalPrice: Number(product.basePrice) - totalDiscount };
};
