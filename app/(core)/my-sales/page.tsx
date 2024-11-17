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
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for sales
const salesData = [
  {
    id: 1,
    title: 'OctaSwap Token Sale',
    status: 'Live',
    raised: 1000,
    hardCap: 5000,
    startDate: '2024-11-20',
    endDate: '2024-11-30',
  },
  {
    id: 2,
    title: 'DeFi Revolution Token',
    status: 'Upcoming',
    raised: 0,
    hardCap: 3000,
    startDate: '2024-12-01',
    endDate: '2024-12-15',
  },
  {
    id: 3,
    title: 'NFT Marketplace Token',
    status: 'Ended',
    raised: 2500,
    hardCap: 2500,
    startDate: '2024-10-01',
    endDate: '2024-10-15',
  },
  {
    id: 4,
    title: 'GameFi Token Launch',
    status: 'Cancelled',
    raised: 500,
    hardCap: 4000,
    startDate: '2024-09-15',
    endDate: '2024-09-30',
  },
];

export default function ProjectOwnerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = salesData.filter((sale) =>
    sale.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'ended':
        return 'bg-gray-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

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
          <Tabs defaultValue='all'>
            <TabsList>
              <TabsTrigger value='all'>All Sales</TabsTrigger>
              <TabsTrigger value='live'>Live</TabsTrigger>
              <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
              <TabsTrigger value='ended'>Ended</TabsTrigger>
            </TabsList>
            <TabsContent value='all'>
              <SalesTable
                sales={filteredSales}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            <TabsContent value='live'>
              <SalesTable
                sales={filteredSales.filter(
                  (sale) => sale.status.toLowerCase() === 'live'
                )}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            <TabsContent value='upcoming'>
              <SalesTable
                sales={filteredSales.filter(
                  (sale) => sale.status.toLowerCase() === 'upcoming'
                )}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
            <TabsContent value='ended'>
              <SalesTable
                sales={filteredSales.filter(
                  (sale) => sale.status.toLowerCase() === 'ended'
                )}
                getStatusColor={getStatusColor}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>Create New Sale</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function SalesTable({
  sales,
  getStatusColor,
}: {
  sales: {
    id: number;
    title: string;
    status: string;
    raised: number;
    hardCap: number;
    startDate: string;
    endDate: string;
  }[];
  getStatusColor: (status: string) => string;
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
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell>{sale.title}</TableCell>
            <TableCell>
              <Badge className={`${getStatusColor(sale.status)} text-white`}>
                {sale.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <Progress
                  value={(sale.raised / sale.hardCap) * 100}
                  className='w-[60px]'
                />
                <span className='text-sm text-muted-foreground'>
                  {Math.round((sale.raised / sale.hardCap) * 100)}%
                </span>
              </div>
            </TableCell>
            <TableCell>{sale.startDate}</TableCell>
            <TableCell>{sale.endDate}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Eye className='mr-2 h-4 w-4' />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit Sale
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-red-600'>
                    <Trash2 className='mr-2 h-4 w-4' />
                    Cancel Sale
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
