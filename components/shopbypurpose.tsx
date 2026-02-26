"use client";

import { Gift, PackageCheck, RefreshCcw, Headphones } from "lucide-react";

export function PromiseSection() {
const promises = [
  {
    icon: Gift,
    title: "Ready to Gift",
    description:
      "Every order arrives beautifully packaged, unforgettable gifting moments.",
  },
  {
    icon: PackageCheck,
    title: "Made with Passion",
    description:
      "Handcrafted with love and precision, ensuring unmatched quality in every piece.",
  },
  {
    icon: RefreshCcw,
    title: "Stress-Free Returns",
    description:
      "Shop confidently with our simple and elegant designs.",
  },
  {
    icon: Headphones,
    title: "We’re Here for You",
    description:
      "Need help? Our support team is just a message away, ready to assist you anytime.",
  },
];

  return (
    <section className=" py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
           Khushi's Promise
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((item, index) => {
            const Icon = item.icon;

            return (
           <div
  key={index}
  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4"
>
  {/* Icon */}
  <div className="bg-accent/10 p-3 rounded-full flex items-center justify-center shrink-0">
    <Icon className="w-6 h-6 text-accent" />
  </div>

  {/* Text Column */}
  <div className="flex flex-col">
    <h3 className="font-semibold text-md text-gray-800">
      {item.title}
    </h3>

    <p className="text-sm text-gray-600 leading-relaxed mt-1">
      {item.description}
    </p>
  </div>
</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}