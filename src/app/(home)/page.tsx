import Categories from "@/components/ui/categories";
import ProductList from "@/components/ui/product-list";
import PromoBanner from "@/components/ui/promo-banner";
import SectionTitle from "@/components/ui/sectionTitle";
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

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <div>
      <PromoBanner
        alt="Até 55% de desconto! Só este mês"
        src="/banner-55off.png"
      />

      <div className="mt-8 px-5 ">
        <Categories />
      </div>

      <div className="mt-8 ">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        alt="Até 55% de desconto em mouses"
        src="/banner-mouses.png"
      />

      <div className="mt-8 ">
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
