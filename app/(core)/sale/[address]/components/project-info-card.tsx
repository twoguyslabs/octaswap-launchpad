import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GlobeIcon,
  TwitterIcon,
  TelegramIcon,
  DiscordIcon,
} from 'hugeicons-react';
import { formatStatus } from '@/app/(core)/utils';
import { getStatusColor } from '@/app/(core)/utils';
import { Tables } from '@/app/(core)/types/sales';
import useTokenInfo from '@/hooks/useTokenInfo';

interface ProjectInfoCardProps {
  sale: Tables<'octaswap_launchpad_sales'>; // Replace 'any' with a proper type
  salePool: SalePool;
  status: SaleStatus | undefined; // Replace 'any' with a proper type
}

export function ProjectInfoCard({
  sale,
  salePool,
  status,
}: ProjectInfoCardProps) {
  const { tokenSymbol } = useTokenInfo(salePool.tokenAddress);

  return (
    <Card>
      <CardHeader className='flex items-center gap-y-1 pb-4 sm:pb-7 sm:flex-row sm:gap-y-0 sm:gap-x-4'>
        <Image
          src={sale?.project_logo}
          alt={`${sale?.sale_title} logo`}
          width={100}
          height={100}
          className='rounded-full'
        />
        <div className='flex flex-col items-center gap-y-3 sm:items-start'>
          <CardTitle className='text-3xl'>{sale?.sale_title}</CardTitle>
          <div className='flex items-center gap-2'>
            <Badge className={getStatusColor(status)}>
              {formatStatus(status)}
            </Badge>
            <Badge variant={sale?.is_vesting ? 'default' : 'destructive'}>
              {sale?.is_vesting ? 'Vesting' : 'No Vesting'}
            </Badge>
            {/* <div className='text-lg font-medium text-muted-foreground mt-1'>
              {tokenSymbol}
            </div> */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='mb-5 text-center sm:text-left leading-relaxed'>
          {sale?.sale_description}
        </p>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          <Button variant='outline' asChild>
            <a
              href={sale?.website_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <GlobeIcon />
              Website
            </a>
          </Button>
          <Button variant='outline' asChild>
            <a
              href={sale?.twitter_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <TwitterIcon />
              Twitter
            </a>
          </Button>
          <Button variant='outline' asChild>
            <a
              href={sale?.telegram_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <TelegramIcon />
              Telegram
            </a>
          </Button>
          <Button variant='outline' asChild>
            <a
              href={sale?.discord_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <DiscordIcon />
              Discord
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
