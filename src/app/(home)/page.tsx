import Categories from "@/components/ui/categories";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5">
      <Image
        alt="Até 55% de desconto! Só este mês"
        height={0}
        width={0}
        className="h-auto w-full"
        sizes="100vw"
        src="/banner-55off.png"
      />
      <div className="mt-8">
        <Categories />
      </div>
    </div>
  );
}
