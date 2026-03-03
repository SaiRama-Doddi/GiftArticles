"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products-data";
import { Product } from "@/lib/products-data";

export default function WhatsNewSection() {
  // Group products by category
  const groupedProducts = products.reduce((acc: any, product: Product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">
          What’s New
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(groupedProducts).map((category) => {
            const categoryProducts = groupedProducts[category];

            // Take first product image for card display
            const featured = categoryProducts[0];

            return (
              <Link
                key={category}
                href={`/category/${category}`}
                className="relative group rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Background Image */}
                <div className="relative h-[400px] w-full">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">
                      {category}
                    </h3>

                    <p className="text-white mt-3 text-lg max-w-xs">
                      Explore premium {category.toLowerCase()} collection
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}