'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SaleCard from '../components/sale-card';
import useSalesAndSale from '../hooks/use-sales-and-sale';
import { TABS_VALUES } from '@/constants/mix';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<SaleStatus>('All');
  const { sales } = useSalesAndSale();

  return (
    <main className='container mx-auto px-7 py-8'>
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sales?.map((sale) => (
                <SaleCard
                  key={sale.sale_address}
                  sale={sale}
                  activeTab={activeTab}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
