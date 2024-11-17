'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, Flame, TrendingUp, Clock } from 'lucide-react';

interface Sale {
  id: number;
  name: string;
  status: 'live' | 'upcoming' | 'ended';
  raised: string;
  cap: string;
  progress: number;
  hot?: boolean;
  trending?: boolean;
  rate: string;
  liquidityPercent: number;
  lockupTime: string;
  timeLeft: string;
  symbol: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('live');

  const sales: Sale[] = [
    {
      id: 1,
      name: 'OctaSwap Token',
      status: 'live',
      raised: '1000',
      cap: '5000',
      progress: 20,
      hot: true,
      rate: '1 BNB = 10,000 OCTA',
      liquidityPercent: 51,
      lockupTime: '365 days',
      timeLeft: '2d 5h 30m',
      symbol: 'OctaSwap',
    },
    {
      id: 2,
      name: 'DeFi Yield Aggregator',
      status: 'live',
      raised: '7500',
      cap: '10000',
      progress: 75,
      trending: true,
      rate: '1 ETH = 50,000 DYA',
      liquidityPercent: 60,
      lockupTime: '180 days',
      timeLeft: '12h 45m',
      symbol: 'DeFi',
    },
    {
      id: 3,
      name: 'GameFi Platform',
      status: 'live',
      raised: '4800',
      cap: '6000',
      progress: 80,
      hot: true,
      rate: '1 AVAX = 5,000 GFP',
      liquidityPercent: 55,
      lockupTime: '270 days',
      timeLeft: '6h 20m',
      symbol: 'GameFi',
    },
    {
      id: 4,
      name: 'NFT Marketplace',
      status: 'upcoming',
      raised: '0',
      cap: '20000',
      progress: 0,
      rate: '1 SOL = 1,000 NFTM',
      liquidityPercent: 70,
      lockupTime: '90 days',
      timeLeft: 'Starts in 3d',
      symbol: 'NFTM',
    },
    {
      id: 5,
      name: 'Decentralized Exchange',
      status: 'upcoming',
      raised: '0',
      cap: '15000',
      progress: 0,
      rate: '1 MATIC = 5,000 DEX',
      liquidityPercent: 65,
      lockupTime: '180 days',
      timeLeft: 'Starts in 5d',
      symbol: 'DEX',
    },
    {
      id: 6,
      name: 'AI-Powered Prediction Market',
      status: 'upcoming',
      raised: '0',
      cap: '8000',
      progress: 0,
      trending: true,
      rate: '1 DOT = 2,000 AIPM',
      liquidityPercent: 58,
      lockupTime: '120 days',
      timeLeft: 'Starts in 1d',
      symbol: 'AIPM',
    },
    {
      id: 7,
      name: 'Cross-Chain Bridge',
      status: 'ended',
      raised: '15000',
      cap: '15000',
      progress: 100,
      rate: '1 MATIC = 2,000 CCB',
      liquidityPercent: 65,
      lockupTime: '365 days',
      timeLeft: 'Ended 2d ago',
      symbol: 'CCB',
    },
    {
      id: 8,
      name: 'Decentralized Social Media',
      status: 'ended',
      raised: '12000',
      cap: '20000',
      progress: 60,
      rate: '1 ADA = 10,000 DSM',
      liquidityPercent: 55,
      lockupTime: '240 days',
      timeLeft: 'Ended 5d ago',
      symbol: 'DSM',
    },
    {
      id: 9,
      name: 'Green Energy Blockchain',
      status: 'ended',
      raised: '30000',
      cap: '30000',
      progress: 100,
      hot: true,
      rate: '1 ALGO = 500 GEB',
      liquidityPercent: 75,
      lockupTime: '450 days',
      timeLeft: 'Ended 1d ago',
      symbol: 'GEB',
    },
  ];

  return (
    <main className='container mx-auto px-7 py-8'>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='space-y-8'
      >
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <TabsList>
            <TabsTrigger value='live'>Live</TabsTrigger>
            <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
            <TabsTrigger value='ended'>Ended</TabsTrigger>
          </TabsList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>
                Sort by <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Highest Raised</DropdownMenuItem>
              <DropdownMenuItem>Ending Soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <TabsContent value='live'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sales
              .filter((sale) => sale.status === 'live')
              .map((sale) => (
                <SaleCard key={sale.id} sale={sale} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value='upcoming'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sales
              .filter((sale) => sale.status === 'upcoming')
              .map((sale) => (
                <SaleCard key={sale.id} sale={sale} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value='ended'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sales
              .filter((sale) => sale.status === 'ended')
              .map((sale) => (
                <SaleCard key={sale.id} sale={sale} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function SaleCard({ sale }: { sale: Sale }) {
  return (
    <Card className='p-6'>
      <div className='flex justify-between items-start mb-4'>
        <div className='flex-1 mr-4'>
          <div className='flex flex-col'>
            <CardTitle className='text-2xl leading-tight mb-2'>
              {sale.name}
            </CardTitle>
            <div className='flex items-center gap-2'>
              <span
                className={
                  sale.status === 'live'
                    ? 'text-emerald-500'
                    : sale.status === 'upcoming'
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                }
              >
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
              {sale.trending && (
                <Badge
                  variant='secondary'
                  className='rounded-full px-2 py-0 text-xs'
                >
                  <TrendingUp className='h-3 w-3 mr-1' /> Trending
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className='flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center'>
          <span className='text-sm font-semibold'>{sale.symbol.charAt(0)}</span>
        </div>
      </div>

      <CardContent className='p-0 space-y-6'>
        <div className='grid grid-cols-2 gap-x-12 gap-y-4'>
          <div>
            <div className='text-sm text-muted-foreground mb-1'>Rate</div>
            <div>{sale.rate}</div>
          </div>
          <div>
            <div className='text-sm text-muted-foreground mb-1'>
              Liquidity %
            </div>
            <div>{sale.liquidityPercent}%</div>
          </div>
          <div>
            <div className='text-sm text-muted-foreground mb-1'>
              Lockup Time
            </div>
            <div>{sale.lockupTime}</div>
          </div>
          <div>
            <div className='text-sm text-muted-foreground mb-1'>Status</div>
            <div className='flex items-center gap-1'>
              <Clock className='h-4 w-4' />
              {sale.timeLeft}
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground'>Progress</span>
            <span className='text-right'>
              {sale.raised} / {sale.cap} {sale.symbol}
            </span>
          </div>
          <Progress value={sale.progress} className='h-2' />
          <div className='flex justify-between items-center text-sm text-muted-foreground'>
            <span>{sale.progress}% Filled</span>
            <span>
              {(Number(sale.cap) - Number(sale.raised)).toLocaleString()}{' '}
              {sale.symbol} Remaining
            </span>
          </div>
        </div>

        <Button className='w-full rounded-xl'>
          {sale.status === 'live'
            ? 'Participate'
            : sale.status === 'upcoming'
            ? 'View Details'
            : 'Sale Ended'}
        </Button>
      </CardContent>
    </Card>
  );
}
