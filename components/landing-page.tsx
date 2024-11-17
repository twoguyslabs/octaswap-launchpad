'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Bot,
  CheckCircle,
  Droplets,
  Lock,
  Menu,
  Shield,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import logo from '@/assets/logos/ocs-logo.svg';

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

const ParticleAnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById(
      'particle-canvas'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const animateParticles = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.5)';

      particles.forEach((particle) => {
        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx!.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width)
          particle.dx = -particle.dx;
        if (particle.y < 0 || particle.y > canvas.height)
          particle.dy = -particle.dy;
      });

      requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas id='particle-canvas' className='absolute inset-0 z-0' />;
};

interface Sale {
  id: number;
  title: string;
  status: 'live' | 'upcoming' | 'ended';
  raised: number;
  hardCap: number;
  logo: string;
}

const salesData: Sale[] = [
  {
    id: 1,
    title: 'OctaSwap Token',
    status: 'live',
    raised: 1000,
    hardCap: 5000,
    logo,
  },
  {
    id: 2,
    title: 'DeFi Revolution',
    status: 'upcoming',
    raised: 0,
    hardCap: 3000,
    logo,
  },
  {
    id: 3,
    title: 'NFT Marketplace',
    status: 'ended',
    raised: 2500,
    hardCap: 2500,
    logo,
  },
  {
    id: 4,
    title: 'GameFi Platform',
    status: 'live',
    raised: 750,
    hardCap: 2000,
    logo,
  },
  {
    id: 5,
    title: 'AI Trading Bot',
    status: 'upcoming',
    raised: 0,
    hardCap: 1500,
    logo,
  },
  {
    id: 6,
    title: 'Decentralized Exchange',
    status: 'live',
    raised: 3000,
    hardCap: 5000,
    logo,
  },
];

interface SaleCardProps {
  sale: Sale;
}

const SaleCard: React.FC<SaleCardProps> = ({ sale }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetProgress = (sale.raised / sale.hardCap) * 100;
    const animationDuration = 1000;
    const stepTime = 20;
    const steps = animationDuration / stepTime;
    const stepValue = targetProgress / steps;

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += stepValue;
      if (currentProgress >= targetProgress) {
        clearInterval(progressInterval);
        setProgress(targetProgress);
      } else {
        setProgress(currentProgress);
      }
    }, stepTime);

    return () => clearInterval(progressInterval);
  }, [sale.raised, sale.hardCap]);

  const getStatusColor = (status: Sale['status']) => {
    switch (status) {
      case 'live':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'ended':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className='w-[250px] flex-shrink-0'>
      <CardHeader className='p-4'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 min-w-0 flex-1'>
            <Image
              src={sale.logo}
              alt={`${sale.title} logo`}
              width={24}
              height={24}
              className='rounded-full flex-shrink-0'
            />
            <CardTitle className='text-sm truncate'>{sale.title}</CardTitle>
          </div>
          <Badge
            className={`${getStatusColor(
              sale.status
            )} text-white text-xs whitespace-nowrap flex-shrink-0`}
          >
            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='space-y-2'>
          <div>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-xs font-medium'>Progress</span>
              <span className='text-xs text-gray-500'>
                {sale.raised} / {sale.hardCap} OCTA
              </span>
            </div>
            <Progress value={progress} className='h-1' />
          </div>
          <Button
            className='w-full text-xs py-1 h-8'
            variant={sale.status === 'upcoming' ? 'secondary' : 'default'}
          >
            {sale.status === 'live'
              ? 'Participate'
              : sale.status === 'upcoming'
              ? 'Remind Me'
              : 'View Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  navLinks: NavLink[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/create', label: 'Create Sale' },
  { href: 'https://app.octaswap.io/swap', label: 'Swap' },
  { href: 'https://app.octaswap.io/staking', label: 'Staking' },
];

const Header: React.FC<HeaderProps> = ({
  navLinks,
  isMenuOpen,
  setIsMenuOpen,
}) => (
  <header className='px-4 lg:px-6 h-16 flex items-center justify-between border-b'>
    <Link className='flex items-center justify-center' href='#'>
      <Image
        src={logo}
        alt='OctaSwap Logo'
        width={0}
        height={0}
        className='sm:mr-3 w-[35px] h-[35px]'
        priority
      />
      <span className='text-xl sm:text-2xl font-bold hidden sm:inline-block'>
        Launchpad
      </span>
    </Link>
    <nav className='ml-auto hidden md:flex gap-4 sm:gap-6'>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          className='font-medium hover:underline underline-offset-4'
          href={link.href}
          target={
            link.label.toLowerCase().includes('swap') ||
            link.label.toLowerCase().includes('staking')
              ? '_blank'
              : '_self'
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='md:hidden'
          aria-label='Open Menu'
          size='icon'
        >
          <Menu style={{ width: 20, height: 20 }} />
        </Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby=''
        side='right'
        className='w-[300px] sm:w-[400px]'
      >
        <VisuallyHidden.Root>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden.Root>
        <nav className='flex flex-col gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-lg font-medium hover:underline underline-offset-4'
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  </header>
);

const HeroSection: React.FC = () => (
  <section className='relative w-full bg-primary overflow-hidden py-14'>
    <ParticleAnimation />
    <div className='container px-4 md:px-6 relative z-10'>
      <div className='flex flex-col items-center text-center'>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white'>
            Launch Your Token on OctaSwap
          </h1>
          <p className='mx-auto max-w-[700px] text-gray-200 text-sm sm:text-base md:text-xl'>
            The most secure and user-friendly launchpad for cryptocurrency
            projects. Start your journey to success today.
          </p>
        </div>
        <div className='space-x-4 mt-7'>
          <Button asChild size='sm' className='sm:text-base sm:px-6 sm:py-3'>
            <Link href='/create'>Create Your Sale</Link>
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='sm:text-base sm:px-6 sm:py-3'
          >
            <Link href='/dashboard'>Explore Sales</Link>
          </Button>
        </div>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4 mt-10'>
          <div className='flex flex-col items-center'>
            <div className='text-2xl font-bold text-white'>$250M+</div>
            <div className='text-sm text-gray-200'>Liquidity Raised</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-2xl font-bold text-white'>1000+</div>
            <div className='text-sm text-gray-200'>Total Projects</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-2xl font-bold text-white'>500K+</div>
            <div className='text-sm text-gray-200'>Active Users</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-2xl font-bold text-white'>100%</div>
            <div className='text-sm text-gray-200'>Secure Launches</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedSalesSection: React.FC = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [duplicatedSales, setDuplicatedSales] = useState<Sale[]>([]);

  useEffect(() => {
    // Duplicate the sales data to create a seamless loop
    setDuplicatedSales([...salesData, ...salesData, ...salesData]);
  }, []);

  useEffect(() => {
    const scrollElement1 = scrollRef1.current;
    const scrollElement2 = scrollRef2.current;

    if (scrollElement1 && scrollElement2) {
      const totalWidth = scrollElement1.scrollWidth / 3;
      let scrollPosition1 = 0;
      let scrollPosition2 = 0;

      const animateScroll = () => {
        // First row moves right to left
        scrollPosition1 += 0.5;
        if (scrollPosition1 >= totalWidth) {
          scrollPosition1 = 0;
        }
        scrollElement1.scrollLeft = scrollPosition1;

        // Second row moves left to right
        scrollPosition2 += 0.5;
        if (scrollPosition2 >= totalWidth) {
          scrollPosition2 = 0;
        }
        scrollElement2.scrollLeft = totalWidth - scrollPosition2;
      };

      const intervalId = setInterval(animateScroll, 16);

      return () => clearInterval(intervalId);
    }
  }, [duplicatedSales]);

  return (
    <section id='sales' className='w-full overflow-hidden px-5 pt-16'>
      <div className='container px-4 md:px-6 space-y-14'>
        <h2 className='text-2xl sm:text-3xl font-bold tracking-tighter text-center'>
          Featured Sales
        </h2>
        <div className='relative space-y-10'>
          {/* First row - right to left */}
          <div className='relative overflow-hidden'>
            <div ref={scrollRef1} className='flex gap-6 overflow-hidden'>
              {duplicatedSales.map((sale, index) => (
                <SaleCard key={`row1-${sale.id}-${index}`} sale={sale} />
              ))}
            </div>
          </div>

          {/* Second row - left to right */}
          <div className='relative overflow-hidden'>
            <div ref={scrollRef2} className='flex gap-6 overflow-hidden'>
              {duplicatedSales.map((sale, index) => (
                <SaleCard key={`row2-${sale.id}-${index}`} sale={sale} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC = () => (
  <section id='features' className='w-full bg-background px-5 pt-16'>
    <div className='container px-4 md:px-6 space-y-14'>
      <h2 className='text-2xl sm:text-3xl font-bold tracking-tighter text-center'>
        Why Choose OctaSwap Launchpad?
      </h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
        <Card>
          <CardHeader className='py-3'>
            <Shield className='w-10 h-10 text-primary mb-4' />
            <CardTitle>Secure & Trustworthy</CardTitle>
          </CardHeader>
          <CardContent>
            Our platform employs state-of-the-art security measures to protect
            your assets and data.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='py-3'>
            <Zap className='w-10 h-10 text-primary mb-4' />
            <CardTitle>Fast & Efficient</CardTitle>
          </CardHeader>
          <CardContent>
            Launch your token sale in minutes with our streamlined process and
            intuitive interface.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='py-3'>
            <CheckCircle className='w-10 h-10 text-primary mb-4' />
            <CardTitle>Transparent & Fair</CardTitle>
          </CardHeader>
          <CardContent>
            We ensure all projects are vetted and information is clearly
            presented to investors.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='py-3'>
            <Bot className='w-10 h-10 text-primary mb-4' />
            <CardTitle>Auto Listing</CardTitle>
          </CardHeader>
          <CardContent>
            Automatically listed on the OctaSwap DEX after the sale is
            successful and completed.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='py-3'>
            <Droplets className='w-10 h-10 text-primary mb-4' />
            <CardTitle>Liquidity Threshold</CardTitle>
          </CardHeader>
          <CardContent>
            All projects must follow a liquidity threshold greater than 60% of
            the total raised funds.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='py-3'>
            <Lock className='w-10 h-10 text-primary mb-4' />
            <CardTitle>Liquidity Lock</CardTitle>
          </CardHeader>
          <CardContent>
            Liquidity pool is sent and controlled by the launchpad to ensure
            liquidity is locked for the project.
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className='mt-14 border-t flex flex-col sm:flex-row sm:justify-between p-5 items-center'>
    <p className='text-xs text-gray-500 mt-5 sm:mt-0'>
      © 2024 OctaSwap Launchpad. All rights reserved.
    </p>
    <div className='flex gap-x-4 mt-3 sm:mt-0'>
      <Link className='text-xs hover:underline underline-offset-4' href='#'>
        Terms of Service
      </Link>
      <Link className='text-xs hover:underline underline-offset-4' href='#'>
        Privacy
      </Link>
    </div>
  </footer>
);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header
        navLinks={navLinks}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className='flex-1'>
        <HeroSection />
        <FeaturedSalesSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
