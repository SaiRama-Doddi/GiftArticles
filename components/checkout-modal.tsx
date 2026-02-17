'use client';

import React from "react"

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/lib/cart-context';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendToWhatsApp = async () => {
    if (!formData.username || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format cart items for WhatsApp message
      const cartSummary = cartItems
        .map(
          (item) =>
            `${item.product.name} (x${item.quantity}) - ₹${((item.product.originalPrice ?? item.product.price) * item.quantity).toLocaleString()}`
        )
        .join('\n');

      const estimatedTax = Math.round(totalPrice * 0.18);
      const shippingCost = totalPrice > 500 ? 0 : 100;
      const finalTotal = totalPrice + estimatedTax + shippingCost;

      const message = `*KHUSHIBOX ORDER*\n\n*Customer Details:*\nName: ${formData.username}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\n*Order Details:*\n${cartSummary}\n\n*Summary:*\nSubtotal: ₹${totalPrice.toLocaleString()}\nTax (18%): ₹${estimatedTax.toLocaleString()}\nShipping: ${shippingCost === 0 ? 'Free' : `₹${shippingCost}`}\n\n*Total: ₹${finalTotal.toLocaleString()}*`;

      const encodedMessage = encodeURIComponent(message);
      // Replace with your actual WhatsApp business number (with country code, no + or spaces)
      const whatsappBusinessNumber = '917702522332'; // India country code: 91
      const whatsappUrl = `https://wa.me/${whatsappBusinessNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      // Reset form and close modal
      setFormData({ username: '', email: '', phone: '', address: '' });
      onClose();
    } catch (error) {
      console.error('Error sending to WhatsApp:', error);
      alert('Error sending order to WhatsApp. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-background">
          <h2 className="text-2xl font-bold text-foreground">Checkout</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Delivery Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your full delivery address"
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          {/* Order Summary Preview */}
          <div className="bg-accent/10 p-4 rounded-lg mt-6">
            <h3 className="font-semibold text-foreground mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm text-muted-foreground mb-3">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total:</span>
                <span className="text-accent">
                  ₹{(totalPrice + Math.round(totalPrice * 0.18) + (totalPrice > 500 ? 0 : 100)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border space-y-3 sticky bottom-0 bg-background">
          <Button
            onClick={sendToWhatsApp}
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-accent hover:bg-red-600 text-white"
          >
            {isSubmitting ? 'Sending...' : 'Send Order via WhatsApp'}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            size="lg"
            className="w-full bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
