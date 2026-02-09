'use client';

import React from "react"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, Share2, ShoppingCart, Eye, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { products } from '@/lib/products-data';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';

export default function ProductDetailPage() {
   const { addItem } = useCart();
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
 const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.sizes ? product.sizes[0] : null
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product not found
          </h1>
          <Link href="/products">
            <Button>Go back to products</Button>
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images || [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        {' / '}
        <Link href="/products" className="hover:text-primary">
          Products
        </Link>
        {' / '}
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left: Product Images */}
          <div>
            {/* Main Image with Zoom */}
            <div
              className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden mb-4 group cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />

              {/* Eye Icon for Zoom */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-5 h-5 text-black" />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                {product.category}
              </span>
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-accent">
                        ★
                      </span>
                    ))}
                  </div>
                 {/*  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span> */}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹
                  {(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 text-lg">
              {product.description}
            </p>

            {/* Size Selector - Only for Wearables */}
            {product.sizes && (
              <div className="mb-6">
                <label className="text-foreground font-medium block mb-3">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-border hover:border-primary text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-foreground font-medium">Quantity:</label>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                size="lg"
                 onClick={() => {
                        addItem(product, 1);
                        setAddedId(product.id);
                        setTimeout(() => setAddedId(null), 2000);
                      }}
                className="flex-1 bg-accent hover:bg-red-600 text-white gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
          {/*     <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white gap-2 bg-transparent"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-primary' : ''
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white gap-2 bg-transparent"
              >
                <Share2 className="w-5 h-5" />
              </Button> */}
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-semibold text-foreground">KHUSHI-{product.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-semibold text-primary">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold text-foreground">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subcategory</p>
                <p className="font-semibold text-foreground">
                  {product.subcategory}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                About This Product
              </h3>
              <p className="text-muted-foreground mb-4">{product.details}</p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="material">
                  <AccordionTrigger>Materials & Craftsmanship</AccordionTrigger>
                  <AccordionContent>
                    This product is made with premium quality materials ensuring
                    durability and longevity. Every item is crafted with attention
                    to detail.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care">
                  <AccordionTrigger>Care Instructions</AccordionTrigger>
                  <AccordionContent>
                    Handle with care. Clean with soft cloth. Avoid direct
                    sunlight and extreme temperatures for best results.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
                  <AccordionContent>
                    Free shipping on orders above ₹500. Delivery within 5-7
                    business days. Track your order anytime.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.keyFeatures?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="custom">
                  <AccordionTrigger>Can I customize this product?</AccordionTrigger>
                  <AccordionContent>
                    Yes! Most of our products are fully customizable. Contact our
                    team for customization options.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="return">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We offer 30 days returns on all products. Items must be unused
                    and in original packaging.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="warranty">
                  <AccordionTrigger>Is there a warranty?</AccordionTrigger>
                  <AccordionContent>
                    All products come with 1-year quality guarantee against
                    manufacturing defects.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Explore More
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="group"
              >
                <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64 bg-muted overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
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
      </div>

      <Footer />
    </main>
  );
}
