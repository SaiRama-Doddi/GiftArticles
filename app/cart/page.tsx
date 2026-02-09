import { CartContent } from '@/components/cart-content';
import { Footer } from '@/components/footer';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <CartContent />
      <Footer />
    </main>
  );
}
