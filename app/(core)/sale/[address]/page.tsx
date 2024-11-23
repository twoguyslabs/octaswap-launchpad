'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useSalesAndSale from '../../hooks/use-sales-and-sale';
import { getSaleStatus } from '../../utils';
import useSaleStatus from '../../hooks/use-sale-status';
import useStringParam from '@/hooks/useStringParam';
import { ProjectInfoCard } from './components/project-info-card';
import { SaleDetailsTab } from './components/sale-details-tab';
import { TokenInfoTab } from './components/token-info-tab';
import ParticipationForm from './components/participation-form';
import useSalePool from '../../hooks/use-sale-pool';

export default function SaleDetails() {
  const saleAddress = useStringParam('address');

  const { sale } = useSalesAndSale(saleAddress);
  const salePool = useSalePool(saleAddress);

  const saleStatus = useSaleStatus(saleAddress);

  const status = getSaleStatus(saleStatus as SaleStatusIndex);

  return (
    sale && (
      <div className='container mx-auto px-4 py-8'>
        <div className='grid gap-6 md:grid-cols-3'>
          <div className='md:col-span-2 space-y-6'>
            <ProjectInfoCard sale={sale} salePool={salePool} status={status} />
            <Tabs defaultValue='sale-details'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='sale-details'>Sale Details</TabsTrigger>
                <TabsTrigger value='token-info'>Token Info</TabsTrigger>
              </TabsList>
              <TabsContent value='sale-details'>
                <SaleDetailsTab saleAddress={saleAddress} />
              </TabsContent>
              <TabsContent value='token-info'>
                <TokenInfoTab saleAddress={saleAddress} />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <ParticipationForm saleAddress={saleAddress} />
          </div>
        </div>
      </div>
    )
  );
}
