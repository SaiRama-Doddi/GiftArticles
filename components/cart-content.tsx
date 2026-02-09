'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { CheckoutModal } from '@/components/checkout-modal';

export function CartContent() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, isHydrated } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted and hydrated
  if (!isMounted || !isHydrated) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Start shopping and add some amazing products to your cart!
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-accent hover:bg-red-600 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const estimatedTax = Math.round(totalPrice * 0.18);
  const shippingCost = totalPrice > 500 ? 0 : 100;
  const finalTotal = totalPrice + estimatedTax + shippingCost;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-5 gap-4 p-6 bg-muted text-foreground font-semibold text-sm">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div></div>
            </div>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="border-b border-border last:border-b-0 p-6"
                suppressHydrationWarning
              >
                <div className="flex flex-col md:grid md:grid-cols-5 gap-4 items-start md:items-center">
                  {/* Product Info */}
                  <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.product.image || '/placeholder.svg'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.product.category}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:text-center">
                    <span className="md:hidden text-sm text-muted-foreground">
                      Price:{' '}
                    </span>
                    <p className="font-semibold text-foreground">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="md:text-center">
                    <span className="md:hidden text-sm text-muted-foreground">
                      Qty:{' '}
                    </span>
                    <div className="flex items-center border border-border rounded w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-2 py-1 hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 border-l border-r border-border">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:text-center">
                    <span className="md:hidden text-sm text-muted-foreground">
                      Total:{' '}
                    </span>
                    <p className="font-semibold text-foreground">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <div className="text-center">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="p-6 border-t border-border text-right">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to clear your cart?'
                    )
                  ) {
                    clearCart();
                  }
                }}
                className="text-sm text-destructive hover:text-destructive/80 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (18%)</span>
                <span>₹{estimatedTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-accent font-semibold">Free</span>
                  ) : (
                    `₹${shippingCost}`
                  )}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-accent">
                  Free shipping on orders above ₹500
                </p>
              )}
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-accent">
                  ₹{finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={() => setIsCheckoutOpen(true)}
              size="lg"
              className="w-full bg-accent hover:bg-red-600 text-white mb-3"
            >
              Proceed to Checkout
            </Button>

            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Continue Shopping
              </Button>
            </Link>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">✓ Secure checkout</span>
               
              </p>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={items}
        totalPrice={totalPrice}
      />
    </div>
  );
}
