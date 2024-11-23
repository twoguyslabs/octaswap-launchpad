'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TABS_VALUES } from '@/constants/mix';
import useSalesAndSale from '../hooks/use-sales-and-sale';
import { Tables } from '../types/sales';
import { formatStatus, getSaleStatus, getStatusColor } from '../utils';
import useSaleStatus from '../hooks/use-sale-status';
import useSalePool from '../hooks/use-sale-pool';
import { SALE_ABI } from '@/contracts/abis';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useSaleProgress } from '../hooks/use-sale-progress';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { delay } from '@/lib/utils';

function SaleActions({ sale }: { sale: Tables<'octaswap_launchpad_sales'> }) {
  const [isPending, setIsPending] = useState(false);

  const { data: isOpen } = useReadContract({
    abi: SALE_ABI,
    address: sale.sale_address as `0x${string}`,
    functionName: 'isOpen',
  });

  const { data: isFinalized } = useReadContract({
    abi: SALE_ABI,
    address: sale.sale_address as `0x${string}`,
    functionName: 'finalized',
  });

  const { writeContractAsync: finalizeSale } = useWriteContract();

  const handleFinalizeSale = async () => {
    setIsPending(true);

    try {
      await finalizeSale({
        abi: SALE_ABI,
        address: sale.sale_address as `0x${string}`,
        functionName: 'finalize',
      });

      await delay(15000);

      toast({
        title: 'Success',
        description: 'Sale finalized successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to finalize sale',
        variant: 'destructive',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link
            href={`/sale/${sale.sale_address}`}
            className='flex items-center gap-x-2'
          >
            <Eye size={17} />
            View Sale
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className='text-green-600'
          onClick={handleFinalizeSale}
          disabled={isPending || isOpen || isFinalized}
        >
          <Trash2 size={17} />
          Finalize Sale
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CustomTableRow({
  sale,
  activeTab,
}: {
  sale: Tables<'octaswap_launchpad_sales'>;
  activeTab: SaleStatus;
}) {
  const saleStatus = useSaleStatus(sale.sale_address);
  const salePool = useSalePool(sale.sale_address);

  const { data: raised } = useReadContract({
    abi: SALE_ABI,
    address: sale.sale_address as `0x${string}`,
    functionName: 'octaRaised',
  });

  const { progress, progressPercentage } = useSaleProgress(
    raised,
    salePool.hardcap
  );

  const status = getSaleStatus(saleStatus);

  const startDate = new Date(
    Number(salePool.startTimestamp) * 1000
  ).toLocaleDateString();

  const endDate = new Date(
    Number(salePool.endTimestamp) * 1000
  ).toLocaleDateString();

  if (activeTab !== 'All' && status !== activeTab) return null;

  return (
    <TableRow key={sale.sale_address}>
      <TableCell>{sale.sale_title}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(status)}>{formatStatus(status)}</Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          <Progress value={progress} className='w-[60px]' />
          <span className='text-sm text-muted-foreground'>
            {progressPercentage}%
          </span>
        </div>
      </TableCell>
      <TableCell>{startDate}</TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>
        <SaleActions sale={sale} />
      </TableCell>
    </TableRow>
  );
}

function SalesTable({
  sales,
  activeTab,
}: {
  sales: Tables<'octaswap_launchpad_sales'>[] | undefined;
  activeTab: SaleStatus;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sale Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales?.map((sale) => (
          <CustomTableRow
            key={sale.sale_address}
            sale={sale}
            activeTab={activeTab}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default function ProjectOwnerDashboard() {
  const [activeTab, setActiveTab] = useState<SaleStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { address } = useAccount();
  const { sales } = useSalesAndSale();

  const mySales = sales?.filter(
    (sale) => sale.owner.toLowerCase() === address?.toLowerCase()
  );

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Project Owner Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Token Sales</CardTitle>
          <CardDescription>
            Manage and monitor all your token sales from this dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <Input
              placeholder='Search sales...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs
            defaultValue='All'
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as SaleStatus)}
          >
            <TabsList>
              {TABS_VALUES.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {TABS_VALUES.map((tab) => (
              <TabsContent key={tab} value={tab}>
                <SalesTable sales={mySales} activeTab={activeTab} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button>Create New Sale</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
