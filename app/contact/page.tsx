'use client';

import React from "react"

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent via-red-500 to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: Phone,
              title: 'Phone',
              details: '+91 9999 999 999',
              description: 'Mon-Sat, 10 AM - 6 PM IST',
            },
            {
              icon: Mail,
              title: 'Email',
              details: 'hello@khushibox.com',
              description: 'Response within 24 hours',
            },
            {
              icon: MapPin,
              title: 'Address',
              details: 'New Delhi, India',
              description: 'Visit our studio by appointment',
            },
          ].map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-lg shadow-md p-6 text-center"
              >
                <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {info.title}
                </h3>
                <p className="font-semibold text-foreground mb-2">
                  {info.details}
                </p>
                <p className="text-sm text-muted-foreground">
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-800 font-semibold">
                  ✓ Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9999 999 999"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    required
                    className="w-full min-h-40"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-red-600 text-white"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Info & FAQ */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6">
              {/* Hours */}
              <div className="bg-card rounded-lg shadow-md p-6">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">
                      Business Hours
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>Monday - Friday: 10 AM - 8 PM</li>
                      <li>Saturday: 10 AM - 6 PM</li>
                      <li>Sunday: Closed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Inquiry Types */}
              <div className="bg-card rounded-lg shadow-md p-6">
                <h3 className="font-bold text-foreground mb-4">
                  What can we help you with?
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Product inquiries and customization</li>
                  <li>✓ Order status and shipping</li>
                  <li>✓ Returns and exchanges</li>
                  <li>✓ Bulk orders and partnerships</li>
                  <li>✓ Feedback and suggestions</li>
                  <li>✓ Special requests</li>
                </ul>
              </div>

              {/* Quick Links */}
              <div className="bg-card rounded-lg shadow-md p-6">
                <h3 className="font-bold text-foreground mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="/products" className="block text-sm text-accent hover:text-primary">
                    → Explore Products
                  </a>
                  <a href="/about" className="block text-sm text-accent hover:text-primary">
                    → About Us
                  </a>
                  <a href="#" className="block text-sm text-accent hover:text-primary">
                    → FAQ
                  </a>
                  <a href="#" className="block text-sm text-accent hover:text-primary">
                    → Shipping Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
