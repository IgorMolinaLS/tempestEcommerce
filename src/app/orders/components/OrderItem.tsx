import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import OrderProduct from "./OrderProductItem";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subTotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productTotalPrice = computeProductTotalPrice(product.product);

      return acc + Number(productTotalPrice.totalPrice) * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = subTotal - total;

  return (
    <Card className="my-1 px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm opacity-60">
                Feito em {format(order.createdAt, "dd/MM/yy")}
              </p>
              {order.orderProducts.length > 1 ? (
                <p>Pedido com {order.orderProducts.length} produtos</p>
              ) : (
                <p>Pedido com 1 produto</p>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col font-bold">
                  <p>Status</p>
                  {order.status === "WAITING_FOR_PAYMENT" ? (
                    <p className="text-[#8162FF]">Pendente</p>
                  ) : (
                    <p className="text-[#8162FF]">Pago</p>
                  )}
                </div>
                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, "dd/MM/yy")}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>
              {order.orderProducts.map((product) => (
                <OrderProduct key={product.id} orderProduct={product} />
              ))}

              <div className="flex flex-col gap-1 text-xs ">
                <Separator />
              </div>

              <div className="flex w-full justify-between py-3">
                <p>Subtotal</p>
                <p>R${subTotal.toFixed(2)}</p>
              </div>
              <Separator />

              <div className="flex w-full justify-between py-3">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>
              <Separator />

              <div className="flex w-full justify-between py-3">
                <p>Descontos</p>
                <p>R${totalDiscount.toFixed(2)}</p>
              </div>
              <Separator />

              <div className="flex w-full justify-between py-3 text-sm font-bold">
                <p>Total</p>
                <p>R${total.toFixed(2)}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
