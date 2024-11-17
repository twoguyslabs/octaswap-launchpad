'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Flame,
  Clock,
  ExternalLink,
  Info,
  AlertCircle,
  Twitter,
  Github,
  Linkedin,
} from 'lucide-react';

export default function SaleDetails() {
  const [contribution, setContribution] = useState('');

  const sale = {
    name: 'OctaSwap Token',
    symbol: 'OCTA',
    logo: '/placeholder.svg?height=100&width=100',
    status: 'live',
    hot: true,
    raised: '1000',
    cap: '5000',
    progress: 20,
    rate: '1 OCTA = 10,000 OCTA',
    liquidityPercent: 51,
    lockupTime: '365 days',
    timeLeft: '2d 5h 30m',
    description:
      'OctaSwap is a next-generation decentralized exchange optimized for low slippage on correlated assets and offering capital efficient liquidity provision to liquidity providers.',
    website: 'https://octaswap.io',
    whitepaper: 'https://octaswap.io/whitepaper.pdf',
    tokenomics: {
      address: '0x1234...5678', // Example address
      totalSupply: '100,000,000 OCTA',
      name: 'OctaSwap Token',
      symbol: 'OCTA',
      decimals: 18,
      network: 'Binance Smart Chain',
    },
    saleDetails: {
      softCap: '2500 OCTA',
      hardCap: '5000 OCTA',
      presaleStart: '2024-11-20 14:00 UTC',
      presaleEnd: '2024-11-23 14:00 UTC',
      listingOn: 'PancakeSwap',
      listingTime: '2024-11-24 14:00 UTC',
    },
    socials: {
      twitter: 'https://twitter.com/octaswap',
      github: 'https://github.com/octaswap',
      linkedin: 'https://linkedin.com/company/octaswap',
    },
    buyerInfo: {
      totalAllocation: '5 OCTA',
      purchased: '2 OCTA',
      remaining: '3 OCTA',
    },
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2 space-y-6'>
          <Card>
            <CardHeader className='flex flex-row items-center gap-4'>
              <Image
                src={sale.logo}
                alt={`${sale.name} logo`}
                width={100}
                height={100}
                className='rounded-full'
              />
              <div>
                <CardTitle className='text-3xl'>{sale.name}</CardTitle>
                <div className='flex items-center gap-2 mt-2'>
                  <span className='text-emerald-500 font-medium'>
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </span>
                  {sale.hot && (
                    <Badge
                      variant='destructive'
                      className='rounded-full px-2 py-0 text-xs'
                    >
                      <Flame className='h-3 w-3 mr-1' /> Hot
                    </Badge>
                  )}
                </div>
                <div className='text-lg font-medium text-muted-foreground mt-1'>
                  {sale.symbol}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='mb-4'>{sale.description}</p>
              <div className='flex flex-wrap gap-4'>
                <Button variant='outline' asChild>
                  <a
                    href={sale.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <ExternalLink className='h-4 w-4 mr-2' />
                    Website
                  </a>
                </Button>
                <Button variant='outline' asChild>
                  <a
                    href={sale.whitepaper}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Info className='h-4 w-4 mr-2' />
                    Whitepaper
                  </a>
                </Button>
                <Button variant='outline' asChild>
                  <a
                    href={sale.socials.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Twitter className='h-4 w-4 mr-2' />
                    Twitter
                  </a>
                </Button>
                <Button variant='outline' asChild>
                  <a
                    href={sale.socials.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='h-4 w-4 mr-2' />
                    GitHub
                  </a>
                </Button>
                <Button variant='outline' asChild>
                  <a
                    href={sale.socials.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Linkedin className='h-4 w-4 mr-2' />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue='sale-details'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='sale-details'>Sale Details</TabsTrigger>
              <TabsTrigger value='tokenomics'>Tokenomics</TabsTrigger>
            </TabsList>
            <TabsContent value='sale-details'>
              <Card>
                <CardHeader>
                  <CardTitle>Sale Details & Progress</CardTitle>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-4'>
                    <Progress value={sale.progress} className='h-2' />
                    <div className='flex justify-between items-center text-sm'>
                      <span>{sale.progress}% Filled</span>
                      <span>
                        {sale.raised} / {sale.cap} {sale.symbol}
                      </span>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <div className='text-sm text-muted-foreground'>Rate</div>
                      <div className='font-medium'>{sale.rate}</div>
                    </div>
                    <div>
                      <div className='text-sm text-muted-foreground'>
                        Liquidity %
                      </div>
                      <div className='font-medium'>
                        {sale.liquidityPercent}%
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-muted-foreground'>
                        Lockup Time
                      </div>
                      <div className='font-medium'>{sale.lockupTime}</div>
                    </div>
                    <div>
                      <div className='text-sm text-muted-foreground'>
                        Time Left
                      </div>
                      <div className='font-medium flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        {sale.timeLeft}
                      </div>
                    </div>
                    {Object.entries(sale.saleDetails).map(([key, value]) => (
                      <div key={key}>
                        <div className='text-sm text-muted-foreground'>
                          {key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                        </div>
                        <div className='font-medium'>{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='tokenomics'>
              <Card>
                <CardHeader>
                  <CardTitle>Token Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    {Object.entries(sale.tokenomics).map(([key, value]) => (
                      <div key={key} className='flex flex-col'>
                        <dt className='text-sm font-medium text-muted-foreground'>
                          {key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                        </dt>
                        <dd className='mt-1 text-sm font-semibold'>
                          {key === 'address'
                            ? typeof value === 'string'
                              ? `${value.slice(0, 6)}...${value.slice(-4)}`
                              : value
                            : value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Participate in Sale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='mb-4 p-4 bg-muted rounded-lg'>
                <h3 className='font-semibold mb-2'>Your Allocation</h3>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div>Total Allocation:</div>
                  <div className='font-medium text-right'>
                    {sale.buyerInfo.totalAllocation}
                  </div>
                  <div>Purchased:</div>
                  <div className='font-medium text-right'>
                    {sale.buyerInfo.purchased}
                  </div>
                  <div>Remaining:</div>
                  <div className='font-medium text-right'>
                    {sale.buyerInfo.remaining}
                  </div>
                </div>
              </div>
              <form className='space-y-4'>
                <div>
                  <Label htmlFor='contribution'>Contribution Amount</Label>
                  <div className='relative mt-1'>
                    <Input
                      id='contribution'
                      placeholder='0.0'
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                      OCTA
                    </div>
                  </div>
                </div>
                <div>
                  <Label>You will receive</Label>
                  <div className='text-2xl font-bold mt-1'>
                    {contribution
                      ? (parseFloat(contribution) * 10000).toFixed(2)
                      : '0'}{' '}
                    OCTA
                  </div>
                </div>
                <Button className='w-full'>Participate in Sale</Button>
              </form>
              <div className='mt-4 p-4 bg-yellow-50 rounded-lg'>
                <div className='flex'>
                  <AlertCircle className='h-5 w-5 text-yellow-400 mr-2' />
                  <div className='text-sm text-yellow-700'>
                    <strong>Note:</strong> Ensure you have sufficient OCTA in
                    your wallet to cover the contribution amount plus gas fees.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
