'use client';

import Header from '@/components/header';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useProduct } from '@/hooks/useProduct';
import {
  ArrowLeft,
  ArrowRight, Expand,
  Facebook,
  Gem,
  Heart,
  Instagram,
  Leaf,
  Palette,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Twitter
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// =================================================================================
// Header & Category Filters Components
// =================================================================================


const CategoryFilters = () => {
  const categories = ['Table', 'Dressers', 'Sofa', 'Chair', 'Bed', 'Lamps', 'Apparel'];
  return (
    <div className="flex items-center gap-3 py-4 overflow-x-auto">
      <Button variant="secondary" className="rounded-full">
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
      {categories.map(cat => (
        <Button key={cat} href={`/category/${cat.toLocaleLowerCase()}`} variant="secondary" className="rounded-full flex-shrink-0">
          {cat}
        </Button>
      ))}
    </div>
  );
};

// =================================================================================
// Main Grid Card Components
// =================================================================================
const NewDealsCard = () => {

  const { data: newDeals, isLoading } = useProduct.newDeals()

  return (
    <Card className="col-span-12 md:col-span-5 lg:col-span-4 rounded-3xl p-6 md:p-8 flex flex-col bg-gray-100 dark:bg-gray-800/50">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">New Deals</h2>

      {/* Image container */}
      <div className="relative w-full h-[350px] rounded-3xl overflow-hidden">
        <Image
          src={newDeals?.images.at(0)?.url || '/images/pavlo.jpg'}
          alt="Long Chair"
          fill
          className="object-cover"
        />

        {/* Price + Name */}
        <div className="absolute top-2 left-2 rounded-3xl bg-white/70 text-black/40 backdrop-blur-sm px-4 py-2">
          <p className="font-bold text-2xl">{Number(newDeals?.price)}</p>
          <p className="text-sm">{newDeals?.name}</p>
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 rounded-full bg-white/70 backdrop-blur-sm p-3 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          <span className="font-bold">4.9</span>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-2 right-2  flex items-center gap-3 rounded-full bg-white/70 backdrop-blur-sm p-2">
          <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Slider controls */}
      <div className="mt-4 flex items-center justify-between rounded-full bg-white/20 backdrop-blur-sm p-2">
        <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm">Slide left and right</span>
        <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </Card>

  );
}

const GreatValueCard = () => {
  const { data: greatValue, isLoading, isError } = useProduct.greatValueDeals()
  if (greatValue === undefined) return <div>Error loading great value deals</div>
  return (
    <Card className="col-span-12 md:col-span-7 lg:col-span-5 rounded-3xl p-6 relative flex flex-col justify-between">
      <div className='w-1/2'>
        <h2 className="text-3xl md:text-4xl font-bold">Great Value Deals</h2>
        <h3 className="text-xl font-bold mt-2">{greatValue?.name}</h3>
        <p className="text-muted-foreground text-sm mt-1">{greatValue?.description}</p>
      </div>
      <div className="absolute right-0 bottom-0 w-1/2 h-full ">
        <Image src={greatValue?.images.at(0)?.url || '/images/krisjanis.jpg'} alt="Exclusive Product" layout="fill" objectFit="contain" className="object-right-bottom rounded-3xl" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button className="rounded-full">
          Open <Expand className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full"><Heart className="h-5 w-5 text-red-500" /></Button>
      </div>
    </Card>
    // <Card className="col-span-12 md:col-span-7 lg:col-span-5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
    //   <div>
    //     <h2 className="text-3xl md:text-4xl font-bold">Great Value Deals</h2>
    //     <p className="text-muted-foreground mt-2">Find Items On Sale With 50 - 75%</p>
    //   </div>
    //   <div className="absolute inset-0  ">
    //     <Image src={'/images/pavlo.jpg'} alt="Great Value Deal Armchair" layout="fill" objectFit="contain" />
    //   </div>
    //   <div className="absolute bottom-8 left-8 rounded-full bg-white/20 backdrop-blur-sm p-3 flex items-center gap-2">
    //     <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
    //     <span className="font-bold">4.9</span>
    //   </div>
    // </Card>
  );

}
const ExclusiveProductCard = () => {
  const { data: exclusiveDeal } = useProduct.exclusiveDeals()
  return (
    <Card className="col-span-12 md:col-span-7 lg:col-span-5 rounded-3xl p-6 relative flex flex-col justify-between">
      <div className='w-1/2'>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">EXCLUSIVE</span>
        <h3 className="text-xl font-bold mt-2">{exclusiveDeal?.name}</h3>
        <p className="text-muted-foreground text-sm mt-1">{exclusiveDeal?.description}</p>
      </div>
      <div className="absolute right-0 bottom-0 w-1/2 h-full ">
        <Image src={exclusiveDeal?.images.at(0)?.url || '/images/krisjanis.jpg'} alt="Exclusive Product" layout="fill" objectFit="contain" className="object-right-bottom rounded-3xl" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button className="rounded-full">
          Open <Expand className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full"><Heart className="h-5 w-5 text-red-500" /></Button>
      </div>
    </Card>
  );

}

// =================================================================================
// Sidebar Widget Components
// =================================================================================
const Sidebar = () => (
  <div className="col-span-12 lg:col-span-3 space-y-6">
    <Card className="rounded-3xl p-6">
      <h4 className="font-bold">OUR TEAM</h4>
      <p className="text-muted-foreground text-sm mt-1">Our Team designs luxurious minimalist <span className="text-primary font-semibold">furniture.</span></p>
      <div className="flex items-center space-x-2 mt-4">
        <div className="flex -space-x-3">
          <Avatar className="border-2 border-background"><AvatarImage src="https://i.pravatar.cc/150?img=1" /></Avatar>
          <Avatar className="border-2 border-background"><AvatarImage src="https://i.pravatar.cc/150?img=2" /></Avatar>
          <Avatar className="border-2 border-background"><AvatarImage src="https://i.pravatar.cc/150?img=3" /></Avatar>
        </div>
      </div>
    </Card>

    <Card className="rounded-3xl p-6">
      <h4 className="font-bold">GET A BONUS</h4>
      <p className="text-muted-foreground text-sm mt-1">Discover our latest exclusive deals.</p>
      <div className="flex items-center mt-4">
        <Input placeholder="Email" className="rounded-r-none" />
        <Button className="rounded-l-none">Subscribe</Button>
      </div>
    </Card>

    <Card className="rounded-3xl p-6">
      <h4 className="font-bold">OUR TEAM</h4>
      <p className="text-muted-foreground text-sm mt-1">Join us, stay tuned for more news and share <span className="text-primary font-semibold">your thoughts.</span></p>
    </Card>
  </div>
);

// =================================================================================
// Section 5: Featured Categories (Arrow Function Component)
// Inspired by the hero section's asymmetrical and visual-first design.
// =================================================================================
const FeaturedCategoriesSection = () => {
  // A reusable card component for this section
  const CategoryCard = ({
    title,
    description,
    imageUrl,
    href,
    className,
    isLarge = false,
  }: {
    title: string;
    description: string;
    imageUrl: string;
    href: string;
    className?: string;
    isLarge?: boolean;
  }) => (
    <Card className={`group relative flex h-full min-h-[300px] w-full items-end overflow-hidden rounded-3xl ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="relative z-10 p-6 md:p-8 text-white">
        <h3 className={`${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold`}>
          {title}
        </h3>
        <p className="mt-2 max-w-xs text-white/90">{description}</p>
        <Button asChild href={href} variant="secondary" className="mt-4 rounded-full bg-white/90 text-black hover:bg-white">

          Explore
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

        </Button>
      </div>
    </Card>
  );

  return (
    <section className="py-16">
      <MaxWidthWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Find exactly what you need by exploring our curated furniture categories.
          </p>
        </div>

        {/* Asymmetrical Grid inspired by the hero section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[620px]">
          <CategoryCard
            title="Living Room Comfort"
            description="Sofas, chairs, and coffee tables designed for relaxation."
            imageUrl="/living-room.jpg" // Assumes you have this image in /public
            href="/categories/living-room"
            className="lg:col-span-2"
            isLarge={true}
          />
          <div className="flex flex-col gap-6">
            <CategoryCard
              title="Dining Essentials"
              description="Elegant tables and chairs for your meals."
              imageUrl="/dining-room.jpg" // Assumes you have this image in /public
              href="/categories/dining"
            />
            <CategoryCard
              title="Peaceful Bedrooms"
              description="Create your perfect sanctuary."
              imageUrl="/bedroom.jpg" // Assumes you have this image in /public
              href="/categories/bedroom"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
// =================================================================================
// Section 6: Our Commitment Section (Arrow Function Component)
// This section builds brand trust by highlighting core values.
// =================================================================================
// Make sure to import icons

const OurCommitmentSection = () => {
  // Data for the commitment cards, making it easy to manage
  const commitments = [
    {
      icon: Palette,
      title: 'Timeless Design',
      description: 'We partner with world-class designers to create pieces that are both modern and timeless, ensuring they fit perfectly into your life for years to come.',
      imageUrl: '/design-inspiration.jpg', // Assumes image in /public
      href: '/about/design',
    },
    {
      icon: Gem,
      title: 'Uncompromising Quality',
      description: 'From the solid wood frame to the hand-stitched fabric, every component is chosen for its durability and beauty. We build furniture to last.',
      imageUrl: '/craftsmanship.jpg', // Assumes image in /public
      href: '/about/quality',
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'We are committed to protecting our planet by using responsibly harvested woods and recycled materials wherever possible, without sacrificing quality.',
      imageUrl: '/sustainability.jpg', // Assumes image in /public
      href: '/about/sustainability',
    },
  ];

  // A reusable card component for this section
  const CommitmentCard = ({ icon: Icon, title, description, imageUrl, href }: typeof commitments[0]) => (
    <Link href={href} className="group block">
      <Card className="flex h-full flex-col overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center gap-3">
            <Icon className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="flex-1 text-muted-foreground">{description}</p>
          <div className="mt-4 flex items-center font-semibold text-primary">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <section className="bg-background dark:bg-gray-950 py-16">
      <MaxWidthWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Built on a Foundation of Trust</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            We're not just selling furniture. We're offering a commitment to exceptional design, quality, and responsible craftsmanship.
          </p>
        </div>

        {/* Responsive Grid for the commitment cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map((commitment) => (
            <CommitmentCard key={commitment.title} {...commitment} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
// =================================================================================
// Section 7: Customer Testimonials Section (Arrow Function Component)
// This section provides social proof and builds confidence.
// =================================================================================

const TestimonialsSection = () => {
  // Data for the testimonials. Easy to update, add, or remove.
  const testimonials = [
    {
      quote: "The centerpiece of our living room. The quality is exceptional, and it's even more comfortable than it looks. We couldn't be happier with our purchase.",
      name: 'Sarah L.',
      location: 'New York, NY',
      rating: 5,
      imageUrl: '/testimonial-living-room.jpg', // Assumes image in /public
    },
    {
      quote: "I was looking for a statement piece, and this chair is it. The design is a work of art, and the craftsmanship is evident in every detail. It completely transformed my reading corner.",
      name: 'Michael B.',
      location: 'Chicago, IL',
      rating: 5,
      imageUrl: '/testimonial-reading-corner.jpg', // Assumes image in /public
    },
    {
      quote: "Our new dining set is not only beautiful but also incredibly sturdy. It's become the heart of our home for family meals and game nights. The sustainable wood was a huge plus for us.",
      name: 'Emily & David R.',
      location: 'Austin, TX',
      rating: 5,
      imageUrl: '/testimonial-dining-room.jpg', // Assumes image in /public
    },
  ];

  // A reusable card component for this section
  const TestimonialCard = ({ quote, name, location, rating, imageUrl, className }: typeof testimonials[0] & { className?: string }) => (
    <Card className={`group flex flex-col justify-between overflow-hidden rounded-3xl shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <blockquote className="mt-4 text-lg italic text-foreground">"{quote}"</blockquote>
      </div>
      <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={`Testimonial from ${name}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <footer className="mt-4 text-right">
          <p className="font-bold">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </footer>
      </div>
    </Card>
  );

  return (
    <section className="bg-gray-50 dark:bg-black py-16">
      <MaxWidthWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Loved by Homes Everywhere</h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            See what our customers are saying about their new favorite furniture pieces.
          </p>
        </div>

        {/* Staggered/Masonry Grid for testimonials */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <TestimonialCard {...testimonials[0]} />
          </div>
          <div className="flex flex-col gap-6 lg:translate-y-12">
            <TestimonialCard {...testimonials[1]} />
          </div>
          <div className="flex flex-col gap-6">
            <TestimonialCard {...testimonials[2]} />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
// =================================================================================
// Section 8: Final Call-to-Action (CTA) Section
// This provides a final, powerful prompt to convert interest into action.
// =================================================================================

const FinalCTASection = () => {
  return (
    <section className="py-16 bg-background dark:bg-gray-950">
      <MaxWidthWrapper>
        <Card className="group relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-3xl text-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/cta-background.jpg" // A beautiful, wide shot of a fully furnished room
              alt="Beautifully designed living room"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {/* Darkening Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center p-8 text-white">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Design Your Perfect Space
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              You've seen our commitment to quality and design. Now it's time to bring it home.
              Explore our full collection and find the pieces that tell your story.
            </p>
            <Button href="/products" asChild size="lg" className="mt-8 rounded-full">

              Explore the Full Collection
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

            </Button>
          </div>
        </Card>
      </MaxWidthWrapper>
    </section>
  );
};
// =================================================================================
// Section 9: The Footer
// The standard, utility-focused footer for global navigation and information.
// =================================================================================

// Import social icons

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black">
      <MaxWidthWrapper className="py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold">Nestify</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Creating timeless furniture for the modern home.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href="/categories/sofas" className="text-muted-foreground hover:text-primary">Sofas</Link>
              <Link href="/categories/chairs" className="text-muted-foreground hover:text-primary">Chairs</Link>
              <Link href="/categories/tables" className="text-muted-foreground hover:text-primary">Tables</Link>
              <Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">About</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-primary">Our Story</Link>
              <Link href="/about/sustainability" className="text-muted-foreground hover:text-primary">Sustainability</Link>
              <Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link>
              <Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} Nestify. All Rights Reserved.</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
// =================================================================================
// Main Page Component
// =================================================================================
export default function ModernLandingPage() {
  return (
    // The outer div now has a different background to distinguish sections
    <div className="bg-background dark:bg-gray-950 min-h-screen">

      {/* FIRST SECTION (Hero) */}
      <div className="bg-gray-100 dark:bg-black p-4 md:p-6">
        <MaxWidthWrapper className="bg-background rounded-3xl p-4 md:p-6 group">
          <Header />
          <CategoryFilters />

          {/* Main Content Grid */}
          <div className="mt-4 grid grid-cols-12 gap-6">
            <NewDealsCard />
            <div className="col-span-12 md:col-span-7 lg:col-span-5 flex flex-col gap-6">
              <GreatValueCard />
              <ExclusiveProductCard />
            </div>
            <Sidebar />
          </div>
        </MaxWidthWrapper>
      </div>

      {/* SECOND SECTION (Featured Categories) */}
      <FeaturedCategoriesSection />
      {/*<OurCommitmentSection />
      <TestimonialsSection />*/}
      <FinalCTASection />
      <Footer />
    </div>
  );
}
