'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';

export function FeaturedProducts() {
  const { addItem } = useCart();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
const featuredProducts = Array.from(
  new Map(products.map((item) => [item.category + item.subcategory, item])).values()
).slice(0, 8);

 return (
  <section className="py-16 px-4 sm:px-6 lg:px-8 ">
    <div className="max-w-7xl mx-auto">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
          Explore Best Sellers
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Handpicked collections for every moment
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden transition-all duration-300"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            
            {/* Product Image (Increased Height) */}
            <div className="relative h-64 sm:h-80 lg:h-96 bg-muted overflow-hidden group">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Discount Badge */}
              {product.price && product.originalPrice && (
                <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                  -{Math.abs(
                    Math.round(
                      ((product.price - product.originalPrice) /
                        product.price) *
                        100
                    )
                  )}
                  %
                </div>
              )}

              {/* Hover Actions */}
              {hoveredId === product.id && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300">
                  <Link
                    href={`/product/${product.id}`}
                    className="bg-white text-black p-2 rounded-full hover:bg-accent hover:text-white transition"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => {
                      addItem(product, 1);
                      setAddedId(product.id);
                      setTimeout(() => setAddedId(null), 2000);
                    }}
                    className="bg-accent text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Product Info (Smaller Text) */}
            <div className="p-3 sm:p-4">
              
              {/* Category */}
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">
                {product.category}
              </p>

              {/* Name */}
              <h3 className="text-sm sm:text-base font-medium text-foreground line-clamp-2 mb-1">
                {product.name}
              </h3>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating!)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-2">
                {product.originalPrice && (
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link href="/products">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
}
