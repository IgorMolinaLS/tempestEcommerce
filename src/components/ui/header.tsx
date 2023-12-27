"use client";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="my-4 flex items-center justify-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          {status === "unauthenticated" && (
            <Button
              onClick={handleLoginClick}
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <LogInIcon size={18} />
              Fazer login
            </Button>
          )}

          <div className="mt-2 flex flex-col gap-2">
            <Link href={"/"}>
              <Button variant="outline" className="w-full justify-start gap-3">
                <HomeIcon size={18} />
                Inicio
              </Button>
            </Link>
            <SheetClose asChild>
              <Button variant="outline" className="w-full justify-start gap-3">
                <PercentIcon size={18} />
                Ofertas
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/catalogue"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                >
                  <ListOrderedIcon size={18} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
            {status === "authenticated" && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <LogOutIcon size={18} />
                Sair
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Link href={"/"}>
        <h1 className="text-lg font-semibold">
          <span className="text-primary">Tempest</span> Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
