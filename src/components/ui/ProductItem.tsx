import { productWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";
import Link from "next/link";

interface ProductItemProps {
  product: productWithTotalPrice;
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[90%]"
            style={{
              objectFit: "contain",
            }}
          />
          {product.discountPercent > 0 && (
            <Badge className="absolute left-2 top-2 px-2 py-[2px]">
              <ArrowDownIcon size={12} /> {product.discountPercent}%
            </Badge>
          )}
        </div>

        <div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {product.name}
          </p>
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap ">
            {product.discountPercent > 0 ? (
              <>
                <p className="font-semibold">
                  R$ {product.totalPrice.toFixed(2)}
                </p>
                <p className="text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
