import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { formatNumber, truncateAddress } from '@/lib/utils';
import {
  calculateLiquidityPercentage,
  formatTimestamp,
} from '@/app/(core)/utils';
import { useSaleProgress } from '@/app/(core)/hooks/use-sale-progress';
import { useReadContract } from 'wagmi';
import { formatBigIntEther } from '@/app/(core)/utils';
import { SALE_ABI } from '@/contracts/abis';
import useTokenInfo from '@/hooks/useTokenInfo';
import useSalePool from '@/app/(core)/hooks/use-sale-pool';

export function SaleDetailsTab({
  saleAddress,
  vestingPercent,
}: {
  saleAddress: string | undefined;
  vestingPercent: number;
}) {
  const salePool = useSalePool(saleAddress);

  const { tokenSymbol } = useTokenInfo(salePool.tokenAddress);

  const { data: lpHolder } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'liquidityPoolOwner',
  });

  const { data: raised } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'octaRaised',
  });

  const { progress, progressPercentage } = useSaleProgress(
    raised,
    salePool.hardcap
  );

  const formattedRaised = formatBigIntEther(raised);
  const formattedSoftcap = formatBigIntEther(salePool.softcap);
  const formattedHardcap = formatBigIntEther(salePool.hardcap);

  const liquidityPercentage = calculateLiquidityPercentage(
    salePool.liquidityFunds
  );

  const startDate = formatTimestamp(salePool.startTimestamp);
  const endDate = formatTimestamp(salePool.endTimestamp);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Details & Progress</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <Progress value={progress} className='h-3' />
          <div className='flex justify-between items-center text-sm'>
            <span>{progressPercentage} Filled</span>
            <span>
              {formattedRaised} / {formattedHardcap} OCTA
            </span>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='space-y-5 lg:space-y-6'>
            <div>
              <div className='text-sm text-muted-foreground'>Rate</div>
              <div className='font-medium'>
                {formatNumber(Number(salePool.rate))} {tokenSymbol}
              </div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>
                Token Vesting %
              </div>
              <div className='font-medium'>{vestingPercent}%</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Soft Cap</div>
              <div className='font-medium'>{formattedSoftcap} OCTA</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Start Date</div>
              <div className='font-medium'>{startDate}</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground flex items-center gap-x-1'>
                <span>Sale Address</span>
                <Link href={`https://scan.octa.space/address/${saleAddress}`}>
                  <ExternalLink size={15} />
                </Link>
              </div>
              <div className='font-medium'>{truncateAddress(saleAddress)}</div>
            </div>
          </div>
          <div className='space-y-5 lg:space-y-6'>
            <div>
              <div className='text-sm text-muted-foreground'>Listing On</div>
              <div className='font-medium'>OctaSwap</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Liquidity %</div>
              <div className='font-medium'>{liquidityPercentage}%</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Hard Cap</div>
              <div className='font-medium'>{formattedHardcap} OCTA</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>End Date</div>
              <div className='font-medium'>{endDate}</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground flex items-center gap-x-1'>
                <span>LP Holder</span>
                <Link href={`https://scan.octa.space/address/${lpHolder}`}>
                  <ExternalLink size={15} />
                </Link>
              </div>
              <div className='font-medium'>{truncateAddress(lpHolder)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
