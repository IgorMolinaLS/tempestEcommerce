import Categories from "@/components/ui/categories";
import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercent: {
        gt: 0,
      },
    },
  });
  return (
    <div>
      <Image
        alt="Até 55% de desconto! Só este mês"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        src="/banner-55off.png"
      />
      <div className="mt-8 px-5 ">
        <Categories />
      </div>
      <div className="mt-8 ">
        <p className="p mb-3 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>
      <Image
        alt="Até 55% de desconto em mouses"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        src="/banner-mouses.png"
      />
    </div>
  );
}
