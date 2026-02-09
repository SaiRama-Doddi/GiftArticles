import { HeroSection } from '@/components/hero-section'
import { ShopByPurpose } from '@/components/shop-by-purpose'
import { FeaturedProducts } from '@/components/featured-products'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        <HeroSection />
      </div>

      {/* Shop by Purpose */}
      <ShopByPurpose />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Footer */}
      <Footer />
    </main>
  )
}
