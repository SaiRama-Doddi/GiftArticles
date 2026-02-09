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
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg">
            Handpicked collections for every moment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Image */}
              <div className="relative h-64 bg-muted overflow-hidden group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}

                {/* Action Buttons */}
                {hoveredId === product.id && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 animate-in fade-in duration-300">
                    <Link
                      href={`/product/${product.id}`}
                      className="bg-white text-black p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => {
                        addItem(product, 1);
                        setAddedId(product.id);
                        setTimeout(() => setAddedId(null), 2000);
                      }}
                      className="bg-accent text-white p-3 rounded-full hover:bg-red-600 transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!)
                              ? 'fill-accent text-accent'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
               {/*      <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span> */}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
