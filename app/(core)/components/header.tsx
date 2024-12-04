'use client';

import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { Suspense } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const launchpadLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/create', label: 'Create' },
  { href: '/owner', label: 'Owner' },
];

const appLinks = [
  { href: 'https://app.octaswap.io/swap', label: 'Swap' },
  { href: 'https://app.octaswap.io/liquidity', label: 'Liquidity' },
  { href: 'https://app.octaswap.io/staking', label: 'Staking' },
];

function NavLink({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <NavigationMenuItem className='w-full'>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          active={isActive}
          className={cn(
            navigationMenuTriggerStyle(),
            'text-md w-full justify-start'
          )}
        >
          {text}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

function SearchInput({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('search', e.target.value);
    } else {
      params.delete('search');
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className={`relative ${className}`}>
      <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input
        type='search'
        placeholder='Search sales...'
        className='pl-8'
        value={searchParams.get('search') || ''}
        onChange={handleSearch}
      />
    </div>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu style={{ height: 25, width: 25 }} />
          <span className='sr-only'>Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' aria-describedby=''>
        <div className='flex gap-x-2 items-center'>
          <Logo className='w-[28px] h-[28px] align-middle' />
          <SheetHeader>
            <SheetTitle className='text-start m-0'>Launchpad</SheetTitle>
          </SheetHeader>
        </div>
        <div className='space-y-4 pt-6'>
          <NavigationMenu
            orientation='vertical'
            className='max-w-none justify-start'
          >
            <NavigationMenuList className='flex-col items-start space-x-0 gap-3 w-full'>
              {launchpadLinks.map((link) => (
                <NavLink key={link.href} href={link.href} text={link.label} />
              ))}
              {appLinks.map((link) => (
                <NavLink key={link.href} href={link.href} text={link.label} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* <Suspense>
            <SearchInput />
          </Suspense> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Header() {
  return (
    <header className='border-b border-border sticky top-0 z-10 bg-background'>
      <div className='container p-4 flex items-center justify-between'>
        <div className='flex items-center gap-x-4'>
          <div className='flex items-center gap-x-3'>
            <MobileMenu />
            <Logo className='w-[35px] h-[35px] align-middle' />
          </div>
          <div className='hidden md:flex'>
            <NavigationMenu orientation='horizontal'>
              <NavigationMenuList className='space-x-0 gap-3'>
                {launchpadLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} text={link.label} />
                ))}
                {appLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} text={link.label} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* <Suspense>
            <SearchInput className='hidden md:block' />
          </Suspense> */}
        </div>
        <div className='flex items-center gap-x-2'>
          <ModeToggle />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
