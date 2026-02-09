import { Heart, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent via-red-500 to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About KHUSHIBOX
          </h1>
          <p className="text-xl opacity-90 text-balance">
            Premium personalized gifts created with love, care, and timeless quality
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Mission */}
            <div className="bg-card rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At KHUSHIBOX, our mission is to help you create lasting memories
                through personalized gifts that tell your unique story. We believe
                every gift should be special, meaningful, and made with genuine
                care. We're committed to providing premium quality products that
                celebrate the relationships that matter most.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a world where personalized gifts are the standard for
                expressing love and appreciation. Our goal is to become the
                preferred destination for thoughtful, premium personalized presents
                that create unforgettable moments. We aim to make gift-giving a
                personal and meaningful experience for everyone.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-muted/30 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  We use premium materials and maintain strict quality standards for
                  every product we create.
                </p>
              </div>

              {/* Innovation */}
              <div className="text-center">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly explore new ways to personalize and create unique
                  gift experiences.
                </p>
              </div>

              {/* Care */}
              <div className="text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Care</h3>
                <p className="text-muted-foreground">
                  Every product is crafted with genuine care and attention to detail
                  for your loved ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              KHUSHIBOX was born from a simple belief: every relationship deserves
              to be celebrated in a special way. We started this journey because we
              understood that the best gifts are those that are personal, thoughtful,
              and made with care.
            </p>
            <p>
              What began as a small idea grew into a passion project. We realized
              that people wanted more than just products—they wanted to express their
              love and appreciation in meaningful ways. That's when KHUSHIBOX was
              created: a platform dedicated to personalized, premium gifts.
            </p>
            <p>
              Today, we're proud to serve thousands of customers who trust us to
              help them celebrate life's special moments. From personalized photo
              frames to custom wearables, each product is designed to make memories
              last forever.
            </p>
            <p>
              Our tagline, "Made Personal • Made Timeless," represents our
              commitment to creating gifts that are uniquely yours and will be
              treasured for generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Why Choose KHUSHIBOX
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Quality',
                description:
                  '100% authentic products with quality certification and premium craftsmanship.',
              },
              {
                title: 'Customization',
                description:
                  'Fully customizable gifts to match your unique needs and preferences.',
              },
              {
                title: 'Fast Delivery',
                description:
                  'Quick and reliable shipping across India with tracking support.',
              },
              {
                title: 'Customer Support',
                description:
                  '24/7 dedicated support team ready to help with any questions.',
              },
              {
                title: 'Secure Payments',
                description:
                  'Safe and secure payment options with buyer protection.',
              },
              {
                title: 'Money Back Guarantee',
                description:
                  '30-day money-back guarantee if you\'re not completely satisfied.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Create Memories?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our collection of premium personalized gifts and celebrate the
            people you love.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-accent hover:bg-red-600 text-white"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
