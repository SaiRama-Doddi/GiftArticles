'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';
import { categories } from '@/lib/products-data';

const categoryImages: Record<string, string> = {
  'Personalised Gifts':
    'https://res.cloudinary.com/dq7hun84m/image/upload/v1770394842/Photo_Frame_Alarm_Clock_2_sg12li.jpg',
  Magnets:
    'https://res.cloudinary.com/dq7hun84m/image/upload/v1768959149/Sab_moh_maya_hai_1_w5ejvt.jpg',
  Wearable:
    'https://res.cloudinary.com/dq7hun84m/image/upload/v1770394749/Tshirt2_qomdgm.jpg',
};

export function ShopByPurpose() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Purpose
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our curated collections for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onMouseEnter={() => setHoveredId(category.name)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Image */}
              <div className="relative h-80 overflow-hidden bg-muted">
                <img
                  src={categoryImages[category.name] || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-4 text-center px-4">
                  {category.name}
                </h3>

                {/* Hover Actions */}
                {hoveredId === category.name && (
                  <div className="flex gap-4 animate-in fade-in zoom-in duration-300">
                    <Link
                      href={`/products?category=${encodeURIComponent(
                        category.name
                      )}`}
                      className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg hover:bg-accent hover:text-white transition-colors font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Explore
                    </Link>
                  </div>
                )}
              </div>

              {/* Subcategory Preview */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur rounded-lg p-3 max-w-xs">
                <p className="text-xs font-semibold text-foreground mb-2">
                  Subcategories:
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-xs bg-accent text-white px-2 py-1 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{category.subcategories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
