'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Eye, ShoppingCart, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { products, categories } from '@/lib/products-data';
import { Footer } from '@/components/footer';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const subcategoryFilter = searchParams.get('subcategory');

  const [sortBy, setSortBy] = useState('featured');
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryFilter ? [subcategoryFilter] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) =>
        selectedSubcategories.includes(p.subcategory)
      );
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategories, selectedSubcategories, priceRange, sortBy]);

  const toggleFilter = (filter: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setSelectedSubcategories([]);
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub)
        ? prev.filter((s) => s !== sub)
        : [...prev, sub]
    );
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Products</h1>
        <p className="text-muted-foreground mb-8">
          Showing {filteredProducts.length} products
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-md p-6 sticky top-24">
              {/* Sort Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="border-t border-border pt-4">
                <button
                  onClick={() => toggleFilter('category')}
                  className="flex items-center justify-between w-full mb-3 text-foreground font-semibold hover:text-primary transition-colors"
                >
                  Category
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilters.includes('category') ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFilters.includes('category') && (
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={() => toggleCategory(category.name)}
                            className="rounded"
                          />
                          <span className="text-sm text-foreground">
                            {category.name}
                          </span>
                        </label>

                        {/* Subcategories */}
                        {selectedCategories.includes(category.name) && (
                          <div className="ml-6 mt-2 space-y-2 border-l border-border pl-3">
                            {category.subcategories.map((sub) => (
                              <label
                                key={sub}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Checkbox
                                  checked={selectedSubcategories.includes(sub)}
                                  onCheckedChange={() => toggleSubcategory(sub)}
                                 className="h-4 w-4 rounded"
                                />
                                <span className="text-xs text-muted-foreground">
                                  {sub}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="border-t border-border pt-4 mt-4">
                <button
                  onClick={() => toggleFilter('price')}
                  className="flex items-center justify-between w-full mb-3 text-foreground font-semibold hover:text-primary transition-colors"
                >
                  Price
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedFilters.includes('price') ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFilters.includes('price') && (
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
                              /* Add to cart */
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
                        
                        {product.originalPrice && (
                          <span  className="text-lg font-bold text-foreground" >
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span  className="text-sm text-muted-foreground line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
