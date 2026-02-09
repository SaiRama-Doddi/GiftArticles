import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-accent via-accent to-red-500 text-background">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
               <div className="relative w-18 h-18 sm:w-16 sm:h-16 md:w-20 md:h-20">
    <Image
      src="/logo.png"
      alt="KHUSHIBOX Logo"
      fill
      className="rounded-full object-cover"
      priority
    />
  </div>
              <p className="text-sm opacity-80 mb-4">
                Premium personalized gifts made with love and care. Every gift tells a story.
              </p>
              <p className="text-xs opacity-70">Made Personal • Made Timeless</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-accent transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-accent transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <p className="text-sm mb-4">Email: hello@khushibox.com</p>
              <p className="text-sm mb-4">Phone: +91 9999 999 999</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hello@khushibox.com"
                  className="hover:text-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
              <p>&copy; 2024 KHUSHIBOX. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
