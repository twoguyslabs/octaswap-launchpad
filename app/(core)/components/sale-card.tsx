import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tables } from '../types/sales';
import { useReadContract } from 'wagmi';
import { SALE_ABI } from '@/contracts/abis';
import Image from 'next/image';
import { erc20Abi, formatEther } from 'viem';
import { useSaleProgress } from '../hooks/use-sale-progress';
import Link from 'next/link';
import { formatStatus, getSaleStatus, getStatusColor } from '../utils';
import useSalePool from '../hooks/use-sale-pool';
import useSaleStatus from '../hooks/use-sale-status';
import { Badge } from '@/components/ui/badge';

type SaleCardProps = {
  sale: Tables<'octaswap_launchpad_sales'>;
  activeTab: SaleStatus;
};

const SaleHeader = ({
  title,
  status,
  logoUrl,
}: {
  title: string;
  status: SaleStatus | undefined;
  logoUrl: string;
}) => {
  return (
    <div className='flex justify-between items-start mb-6'>
      <div className='flex-1 mr-4'>
        <div className='flex flex-col'>
          <CardTitle className='text-2xl leading-tight mb-2'>{title}</CardTitle>
          <div>
            <Badge className={getStatusColor(status)}>
              {formatStatus(status)}
            </Badge>
          </div>
        </div>
      </div>
      <Image
        src={logoUrl}
        alt={title}
        width={50}
        height={50}
        placeholder='blur'
        blurDataURL={logoUrl}
      />
    </div>
  );
};

const SaleDetails = ({
  salePool,
  tokenSymbol,
}: {
  salePool: SalePool;
  tokenSymbol: string;
}) => {
  const liquidityPercentage = Number(salePool.liquidityFunds) / 100;

  const startDate = new Date(
    Number(salePool.startTimestamp) * 1000
  ).toLocaleDateString();
  const endDate = new Date(
    Number(salePool.endTimestamp) * 1000
  ).toLocaleDateString();

  return (
    <div className='flex justify-between'>
      <div className='space-y-5'>
        <div>
          <div className='text-sm text-muted-foreground mb-1'>Rate</div>
          <div>
            1 OCTA = {salePool.rate} {tokenSymbol}
          </div>
        </div>
        <div>
          <div className='text-sm text-muted-foreground mb-1'>Sale Open</div>
          <div>{startDate}</div>
        </div>
      </div>
      <div className='space-y-5'>
        <div>
          <div className='text-sm text-muted-foreground mb-1'>Liquidity %</div>
          <div>{liquidityPercentage}%</div>
        </div>
        <div>
          <div className='text-sm text-muted-foreground mb-1'>Sale Closed</div>
          <div>{endDate}</div>
        </div>
      </div>
    </div>
  );
};

export default function SaleCard({ sale, activeTab }: SaleCardProps) {
  const salePool = useSalePool(sale.sale_address);
  const saleStatus = useSaleStatus(sale.sale_address);

  const { data: raised } = useReadContract({
    abi: SALE_ABI,
    address: sale.sale_address as `0x${string}`,
    functionName: 'octaRaised',
  });

  const { data: tokenSymbol } = useReadContract({
    abi: erc20Abi,
    address: salePool.tokenAddress as `0x${string}`,
    functionName: 'symbol',
  });

  const { progress, progressPercentage } = useSaleProgress(
    raised,
    salePool.hardcap
  );

  const formattedRaised = Number(formatEther(raised || BigInt(0)));
  const formattedHardcap = Number(formatEther(salePool.hardcap || BigInt(0)));

  const formattedRemaining = formattedHardcap - formattedRaised;

  const status = getSaleStatus(saleStatus as SaleStatusIndex);

  if (activeTab !== 'All' && status !== activeTab) return null;

  return (
    <Card className='p-6 shadow-xl'>
      <SaleHeader
        title={sale.sale_title!}
        status={status}
        logoUrl={sale.project_logo as string}
      />
      <CardContent className='p-0 space-y-6'>
        <SaleDetails salePool={salePool} tokenSymbol={tokenSymbol || ''} />
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground'>Progress</span>
            <span className='text-right'>
              {formattedRaised} / {formattedHardcap} OCTA
            </span>
          </div>
          <Progress value={progress} className='h-3' />
          <div className='flex justify-between items-center text-sm text-muted-foreground'>
            <span>{progressPercentage} Filled</span>
            <span>{formattedRemaining} OCTA Remaining</span>
          </div>
        </div>

        <Button className='w-full rounded-xl' asChild>
          <Link href={`/sale/${sale.sale_address}`}>View Sale</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
