import { HeroSection } from '@/components/hero-section'
import { ShopByPurpose } from '@/components/shop-by-purpose'
import { FeaturedProducts } from '@/components/featured-products'
import { Footer } from '@/components/footer'
import { PromiseSection } from '@/components/shopbypurpose'
import WhatsNewSection from '@/components/whatsnew'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      
      {/* FULL WIDTH HERO */}
      <HeroSection />

      {/* Other sections can stay contained */}
      <ShopByPurpose />
      <FeaturedProducts />
      <PromiseSection />
      <Footer />

    </main>
  )
}