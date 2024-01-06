import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { Barcode } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/OrderItem";

export const dynamic = "force-dynamic";

async function OrderPage() {
  const user = getServerSession(authOptions);

  if (!user) {
    return <h1>Access Denied!</h1>;
  }

  const orders = await prismaClient.order.findMany({
    where: { userId: (user as any).id },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className=" p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <Barcode size={16} />
        Meus pedidos
      </Badge>
      <div className="flex flex-col">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
