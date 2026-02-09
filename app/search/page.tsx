'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { products } from '@/lib/products-data';
import { Footer } from '@/components/footer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.subcategory.toLowerCase().includes(lowerQuery) ||
        product.details?.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Search Results
          </h1>
          <p className="text-muted-foreground">
            {query ? (
              <>
                Found{' '}
                <span className="font-semibold text-foreground">
                  {searchResults.length}
                </span>{' '}
                result{searchResults.length !== 1 ? 's' : ''} for{' '}
                <span className="font-semibold text-foreground">"{query}"</span>
              </>
            ) : (
              'Enter a search query to find products'
            )}
          </p>
        </div>

        {searchResults.length === 0 && query ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-6">
              No products found matching your search.
            </p>
            <Link
              href="/products"
              className="inline-block bg-accent text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
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
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      %
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
                          /* Add to cart logic */
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
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
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
        )}
      </div>

      <Footer />
    </main>
  );
}
