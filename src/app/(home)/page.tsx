import Categories from "@/components/ui/categories";
import ProductList from "@/components/ui/product-list";
import PromoBanner from "@/components/ui/promo-banner";
import SectionTitle from "@/components/ui/sectionTitle";
import { prismaClient } from "@/lib/prisma";

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
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        alt="Até 55% de desconto! Só este mês"
        src="/banner-55off.png"
      />

      <div className="px-5 ">
        <Categories />
      </div>
      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        alt="Até 55% de desconto em mouses"
        src="/banner-mouses.png"
      />
      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        alt="Até 55% de desconto em mouses"
        src="/banner-fones.png"
      />
      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
