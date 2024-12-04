'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SaleCard from './sale-card';
import useSalesAndSale from '../../hooks/use-sales-and-sale';
import { TABS_VALUES } from '@/constants/mix';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import LaunchpadDisclaimer from './launchpad-disclaimer';

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState<SaleStatus>('All');
  const { sales } = useSalesAndSale();
  // const searchParams = useSearchParams();
  // const searchQuery = searchParams.get('search')?.toLowerCase();

  // const filteredSales = sales?.filter((sale) => {
  //   if (!searchQuery) return true;
  //   return (
  //     sale.sale_title?.toLowerCase().includes(searchQuery) ||
  //     sale.sale_address?.toLowerCase().includes(searchQuery) ||
  //     sale.owner?.toLowerCase().includes(searchQuery)
  //   );
  // });

  return (
    <main className='container mx-auto px-7 py-8'>
      <LaunchpadDisclaimer />
      <Tabs
        defaultValue='All'
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as SaleStatus)}
        className='space-y-8'
      >
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <TabsList>
            {TABS_VALUES.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* TODO: Add sort by */}
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>
        {TABS_VALUES.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div
              className={cn(
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
                sales?.length === 0 && 'flex items-center justify-center'
              )}
            >
              {sales?.length !== 0
                ? sales?.map((sale) => (
                    <SaleCard
                      key={sale.sale_address}
                      sale={sale}
                      activeTab={activeTab}
                    />
                  ))
                : 'No sales found'}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
