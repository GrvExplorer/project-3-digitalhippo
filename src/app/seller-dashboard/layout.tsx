import { NavItem } from "@/components/custom ui/nav-item";
import Providers from "@/components/custom ui/providers";
import { SearchInput } from "@/components/custom ui/search";
import UserButton from "@/components/custom ui/user-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/trpc/server";
import { currentUser } from "@/utils/auth.util";
import { PanelLeft, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaJediOrder, FaProductHunt, FaSellcast } from "react-icons/fa";
import { GiCustodianHelmet } from "react-icons/gi";

export default async function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const user = await currentUser();
  if (!user) notFound();
  if (user.isSeller === false) notFound();

  // void trpc.seller.getKits.prefetch({
  //   sellerId: user.sellerId,
  //   limit: 10,
  //   offset: 0,
  // })

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb />
            <SearchInput />
            {/* TODO: Create Seller Button */}
          </header>
          <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
        >
          <Image src="/favicon.ico" alt="Hippo" width={32} height={32} />
          <span className="sr-only">Hippo</span>
        </Link>

        <NavItem href="/seller-dashboard" label="Dashboard">
          <FaSellcast className="h-5 w-5" />
        </NavItem>

        <NavItem href="/seller-dashboard/add-kit" label="Add Product">
          <FaJediOrder className="h-5 w-5" />
        </NavItem>

        <NavItem href="/seller-dashboard/analytics" label="Analytics">
          <FaProductHunt className="h-5 w-5" />
        </NavItem>

        <NavItem href="/seller-dashboard/reviews" label="Reviews">
          <GiCustodianHelmet className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/seller-dashboard/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
          >
            <Image src="/favicon.ico" alt="Hippo" width={32} height={32} />
            <span className="sr-only">Hippo</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <FaSellcast className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/seller-dashboard/add-kit"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <FaJediOrder className="h-5 w-5" />
            Add Product
          </Link>
          <Link
            href="/seller-dashboard/analytics"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <FaProductHunt className="h-5 w-5" />
            Analytics
          </Link>
          <Link
            href="/seller-dashboard/reviews"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <GiCustodianHelmet className="h-5 w-5" />
            Reviews
          </Link>
          <Link
            href="/seller-dashboard/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Sellers</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}