'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { categories } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';

export function Navbar() {
  const router = useRouter();
  const { totalItems, isHydrated } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cartCount = totalItems; // Declare cartCount variable

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-accent via-accent to-red-500 text-white py-2 text-center text-sm font-medium">
        Welcome to Luxury Divine Store - Premium Quality Products
      </div>


      {/* Main Navbar */}
      <nav
  className="sticky top-0 z-40 w-full border-b border-border bg-[#faecc7]/95 backdrop-blur"
  suppressHydrationWarning
>

        <div className="mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
         <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
    <Image
      src="/logo.png"
      alt="KHUSHIBOX Logo"
      fill
      className="rounded-full object-cover"
      priority
    />
  </div>
</Link>


            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex" suppressHydrationWarning>
              <NavigationMenu suppressHydrationWarning>
                <NavigationMenuList className="gap-1" suppressHydrationWarning>
                  {categories.map((category) => (
                    <NavigationMenuItem key={category.name}>
                      <NavigationMenuTrigger className="text-base font-medium text-foreground hover:text-primary">
                        {category.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-4">
                          <ul className="space-y-3">
                            {category.subcategories.map((sub) => (
                              <li key={sub}>
                                <Link
                                  href={`/products?category=${encodeURIComponent(
                                    category.name
                                  )}&subcategory=${encodeURIComponent(sub)}`}
                                  className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))}


        <div className="flex gap-6">
  <a href="/contact" className="text-base font-medium text-foreground hover:text-red-600">
    Contact
  </a>

  <a href="/about" className="text-base font-medium text-foreground hover:text-red-600">
    About Us
  </a>
</div>

                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Section: Search, Cart, Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-48 text-foreground placeholder:text-muted-foreground"
                />
              </form>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 text-foreground hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {isHydrated && totalItems > 0 && (
                  <span
                    className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                    suppressHydrationWarning
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="pb-4 space-y-2 lg:hidden">
              <form onSubmit={handleSearch} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 mb-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-foreground"
                />
              </form>
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="font-medium text-foreground px-3 py-2">
                    {category.name}
                  </div>
                  <ul className="space-y-2 pl-4">
                  {category.subcategories.map((sub) => (
  <li key={sub}>
    <Link
      href={`/products?category=${encodeURIComponent(
        category.name
      )}&subcategory=${encodeURIComponent(sub)}`}
      onClick={() => setIsOpen(false)}
      className="text-sm text-muted-foreground hover:text-primary py-1"
    >
      {sub}
    </Link>
  </li>
))}





                  </ul>
                </div>
              ))}


                     <div className="flex flex-col gap-6">
  <a href="/contact" className="text-base font-medium text-foreground hover:text-red-600">
    Contact
  </a>

  <a href="/about" className="text-base font-medium text-foreground hover:text-red-600">
    About Us
  </a>
</div>

            </div>

            
          )}
        </div>
      </nav>
    </>
  );
}
