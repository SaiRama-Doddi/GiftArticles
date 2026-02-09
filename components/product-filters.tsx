'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { categories } from '@/lib/products-data';

interface ProductFiltersProps {
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
  onPriceChange: (min: number, max: number) => void;
  selectedCategory: string;
  selectedSubcategory: string;
}

export function ProductFilters({
  onCategoryChange,
  onSubcategoryChange,
  onPriceChange,
  selectedCategory,
  selectedSubcategory,
}: ProductFiltersProps) {
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const currentCategory = categories.find((c) => c.name === selectedCategory);

  return (
    <>
      {/* Desktop Filters - Sidebar */}
      <div className="hidden md:block md:w-48 lg:w-64 space-y-6">
        {/* Categories */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Categories</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('')}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === ''
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {currentCategory && (
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-4">Subcategories</h3>
            <div className="space-y-2">
              {currentCategory.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => onSubcategoryChange(sub)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedSubcategory === sub
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="bg-card p-4 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange.min}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                setPriceRange({ ...priceRange, min: newMin });
                onPriceChange(newMin, priceRange.max);
              }}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange.max}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                setPriceRange({ ...priceRange, max: newMax });
                onPriceChange(priceRange.min, newMax);
              }}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters - Accordion */}
      <div className="md:hidden space-y-2 mb-6">
        {/* Categories Filter */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedMobile(expandedMobile === 'category' ? null : 'category')}
            className="w-full px-4 py-3 flex items-center justify-between text-foreground font-medium hover:bg-muted transition-colors"
          >
            <span>Categories</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedMobile === 'category' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedMobile === 'category' && (
            <div className="px-4 py-3 bg-muted space-y-2 border-t border-border">
              <button
                onClick={() => {
                  onCategoryChange('');
                  setExpandedMobile(null);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === ''
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-background'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    onCategoryChange(category.name);
                    setExpandedMobile(null);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-background'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subcategories Filter */}
        {currentCategory && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedMobile(expandedMobile === 'subcategory' ? null : 'subcategory')}
              className="w-full px-4 py-3 flex items-center justify-between text-foreground font-medium hover:bg-muted transition-colors"
            >
              <span>Subcategories</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedMobile === 'subcategory' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedMobile === 'subcategory' && (
              <div className="px-4 py-3 bg-muted space-y-2 border-t border-border">
                {currentCategory.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      onSubcategoryChange(sub);
                      setExpandedMobile(null);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedSubcategory === sub
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground hover:bg-background'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Price Filter */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedMobile(expandedMobile === 'price' ? null : 'price')}
            className="w-full px-4 py-3 flex items-center justify-between text-foreground font-medium hover:bg-muted transition-colors"
          >
            <span>Price Range</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                expandedMobile === 'price' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedMobile === 'price' && (
            <div className="px-4 py-4 bg-muted space-y-3 border-t border-border">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange.min}
                onChange={(e) => {
                  const newMin = Number(e.target.value);
                  setPriceRange({ ...priceRange, min: newMin });
                  onPriceChange(newMin, priceRange.max);
                }}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange.max}
                onChange={(e) => {
                  const newMax = Number(e.target.value);
                  setPriceRange({ ...priceRange, max: newMax });
                  onPriceChange(priceRange.min, newMax);
                }}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground font-medium">
                ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
